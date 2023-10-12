export default function routes(database_instance, waiter_instance) {
  async function get_login(req, res) {
    try {
      res.render("index");
    } catch (err) {
      console.log("error", err);
    }
  }

  async function post_login(req, res) {
    try {
      const name = req.body.name;
      if (name === "admin") {
        res.redirect("/days");
      } else {
        await database_instance.insertUser(name);
        res.redirect("/waiter/" + name);
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  async function get_waiter(req, res) {
    try {
      const days = await database_instance.getDays();
      const username = req.params.username;
      await database_instance.insertUser(username);
      const selectedDays = await database_instance.getSelectedDaysForWaiter(
        username
      );
      waiter_instance.checkedDays(selectedDays, days);
      res.render("waiter", { days, waiter_username: username });
    } catch (err) {
      console.log("error", err);
    }
  }

  async function post_waiter(req, res) {
    try {
      const selectedDays = req.body.check_days;
      const username = req.params.username;
      if (selectedDays !== undefined) {
        if (selectedDays.length >= 3 && typeof selectedDays !== "string") {
          await database_instance.deleteWiterSelectedDays(username);
          await database_instance.insertSchedule(username, selectedDays);
          req.flash("success", "You have successfully added your availability");
        } else {
          req.flash("error", "Please select at least three days");
        }
      } else {
        req.flash("error", "Please select your availability");
      }
      res.redirect("/waiter/" + username);
    } catch (err) {
      console.error("Error:", err);
    }
  }
    async function get_days(req, res) {
      try {
        const days = await database_instance.getDays();
        const waiters = await database_instance.getWaiterSchedule();
        const scheduleData = waiter_instance.dataInSchedule(days, waiters)
        const coloredCounts = waiter_instance.checkedDaysCount(waiters);
        res.render("days", { scheduleData, coloredCounts });
      } catch (err) {
        console.log("Error", err);
      }
    }
    
  async function reset_schedule(req, res) {
    try {
      await database_instance.deleteSchedule();
      req.flash("clear", "Registrations have been successfully cleared");
      res.redirect("/days");
    } catch (err) {
      console.log("Error", err);
    }
  }

  return {
    get_login,
    post_login,
    get_waiter,
    post_waiter,
    get_days,
    reset_schedule,
  };
}
