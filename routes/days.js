export default function days(database_instance, waiter_instance) {
  async function get_days(req, res) {
    try {
      const days = await database_instance.getDays();
      const waiters = await database_instance.getWaiterSchedule();
      const scheduleData = waiter_instance.dataInSchedule(days, waiters);
      const coloredCounts = waiter_instance.checkedDaysCount(waiters);
      res.render("days", { scheduleData, coloredCounts, days });
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function reset_schedule(req, res) {
    try {
      await database_instance.deleteSchedule();
      req.flash("clear", "Schedule has been successfully cleared");
      res.redirect("/days");
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function get_reschedule_waiter(req, res) {
    try {
      const days = await database_instance.getDays();
      const username = req.params.username;
      const selectedDays = await database_instance.getSelectedDaysForWaiter(
        username
      );
      waiter_instance.checkedDays(selectedDays, days);
      res.render("waiter", { days, waiter_username: username });
    } catch (err) {
      console.log("error", err);
    }
  }

  async function post_reschedule_waiter(req, res) {
    try {
      const selectedDays = req.body.check_days;
      const username = req.body.username;
      const waiterInSchedule = await database_instance.getSelectedDaysForWaiter(
        username
      );
      if (waiterInSchedule.length === 0) {
        req.flash("error", "Waiter not on schedule");
      }else if (!username || username === '') {
        req.flash("error", "Please enter waiter name");
      } else if (!selectedDays) {
        req.flash("error", "Please select days");
      } else {
        await database_instance.deleteWiterSelectedDays(username);
        await database_instance.insertSchedule(username, selectedDays);
        req.flash("success", "Waiter schedule has been updated.");
      }
      res.redirect("/days");
    } catch (err) {
      console.error("Error:", err);
    }
  }
  
  return {
    get_days,
    reset_schedule,
    get_reschedule_waiter,
    post_reschedule_waiter,
  };
}
