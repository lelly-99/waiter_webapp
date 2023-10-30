export default function waiters(database_instance, waiter_instance) {
    async function get_waiter(req, res) {
      try {
        const days = await database_instance.getDays();
        const username = req.params.username;
        const loggedInUsername = req.session.user;
        const selectedDays = await database_instance.getSelectedDaysForWaiter(
          username
        );
        if (loggedInUsername !== username) {
          req.flash("error", "Access denied. Please log in to proceed.");
          res.redirect('/login');
        }
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

    async function logout(req, res) {
      try {
        req.session.destroy((err) => {
          if (err) {
            console.error("Error during logout:", err);
          }
          res.redirect('/login');
        });
      } catch (err) {
        console.log("error", err);
      }
    }
    
    return {
      get_waiter,
      post_waiter,
      logout
    };
  }