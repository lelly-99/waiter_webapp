// export default function routes(database_instance) {
//   async function get_login(req, res) {
//     try {
//       res.render('index');
//     } catch (err) {
//       console.log('error', err);
//     }
//   }
//   async function post_login(req, res) {
//     try {
//       const name = req.body.name;
//       if(name === "admin"){
//         res.redirect('/days');
//       }else{
//         await database_instance.insertUser(name);
//         res.render('waiter');
//       }
//     } catch (err) {
//       console.log('error', err);
//     }
//   }
//   async function get_waiter(req, res) {
//     try {
//       const days = await database_instance.getDays();
//       const username = req.params.username;
//       const waiter_username = await database_instance.insertUser(username)
//       res.render('waiter', { days, waiter_username});
//     } catch (err) {
//       console.log('error', err);
//     }
//   }
//   async function post_waiter(req, res) {
//     try {
//       const checked_days = req.body.check_days;
//       const username = req.params.username;
  
//       for (var i = 0; i < checked_days.length; i++) {
//         const day = checked_days[i];
//         const waiterCount = await database_instance.getWaiterCountForEachDay(day);
//         if (waiterCount < 3) {
//           await database_instance.insertSchedule(username, day);
//         }
//       }
//       res.redirect('/days');
//     } catch (err) {
//       console.log('error', err);
//     }
//   }
//   async function get_days(req, res) {
//     try {
//       const days = await database_instance.getDays();
//       const schedule = await database_instance.getWaiterSchedule()
//       res.render('days', { schedule, days });
//     } catch (err) {
//       console.log('Error', err);
//     }
//   }
//   async function reset_schedule(req, res) {
//     try {
//       await database_instance.deleteSchedule()
//       res.redirect('/days');
//     } catch (err) {  
//       console.log('Error', err);
//     }
//   }
//   return {
//     get_login,
//     post_login,
//     get_waiter,
//     post_waiter,
//     get_days,
//     reset_schedule,
//   };
// };



// Export the route handlers
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
        await database_instance.insertUser(username); // Ensure user exists in the database
        const waiter_username = username; // Use the provided username
        res.render('waiter', { days, waiter_username });
    } catch (err) {
        console.log('error', err);
    }
}

async function post_waiter(req, res) {
  try {
    const checkedDays = req.body.check_days;
    const username = req.params.username;

    // Delete any existing entries for this user
    await database_instance.deleteScheduleForUser(username);

    // Insert user selections into the schedule table
    await database_instance.insertSchedule(username, checkedDays);

    res.redirect(`/waiter/${username}`);
  } catch (err) {
    console.log('error', err);
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
