export default function routes(database_instance) {
  async function get_login(req, res) {
      try {
          res.render('index');
      } catch (err) {
          console.log('error', err);
      }
  }

  async function post_login(req, res) {
      try {
          const name = req.body.name;
          if (name === "admin") {
              res.redirect('/days');
          } else {
              await database_instance.insertUser(name);
              res.redirect('/waiter/' + name);
          }
      } catch (err) {
          console.log('error', err);
      }
  }

  async function get_waiter(req, res) {
    try {
        const days = await database_instance.getDays();
        const username = req.params.username;
        await database_instance.insertUser(username); 
        const waiter_username = username; 
        res.render('waiter', { days, waiter_username });
    } catch (err) {
        console.log('error', err);
    }
}

// async function post_waiter(req, res) {
//   try {
//     const checkedDays = req.body.check_days;
//     const username = req.params.username;
//     await database_instance.deleteScheduleForUser(username);
//     const check = await database_instance.insertSchedule(username, checkedDays);
//     if(check){
//       req.flash("success", 'You have successfully added your availability')
//     } else if(!checkedDays){
//         req.flash("error", 'Please select your availability')
//     }
//     res.redirect(`/waiter/${username}`);
//   } catch (err) {
//     console.log('error', err);
//   }
// }
async function post_waiter(req, res) {
    try {
      const checkedDays = req.body.check_days;
      const username = req.params.username;
      await database_instance.deleteScheduleForUser(username);
      const check = await database_instance.insertSchedule(username, checkedDays);
      if (check) {
        req.flash("success", 'You have successfully added your availability');
      } else if (!checkedDays) {
        req.flash("error", 'Please select your availability');
      }
      res.redirect(`/waiter/${username}`);
    } catch (err) {
      console.log('error', err);
      req.flash("error", 'An error occurred.');
      res.redirect(`/waiter/${username}`);
    }
  }
  

  async function get_days(req, res) {
      try {
          const schedule = await database_instance.getWaiterSchedule();
          res.render('days', { schedule});
      } catch (err) {
          console.log('Error', err);
      }
  }

  async function reset_schedule(req, res) {
      try {
          await database_instance.deleteSchedule();
          res.redirect('/days');
      } catch (err) {
          console.log('Error', err);
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
};
