export default function waiter_availability() {
  const schedule = {};
  var error = ""

  function checkedDays(waiterSelectedDays, daysofweek) {
    if (waiterSelectedDays !== undefined) {
      for (let i = 0; i < daysofweek.length; i++) {
        const day = daysofweek[i];
        day.checked = false;

        for (let j = 0; j < waiterSelectedDays.length; j++) {
          const waiterDay = waiterSelectedDays[j].day_of_the_week;
          if (day.day_of_the_week === waiterDay) {
            day.checked = true;
            break;
          }
        }
      }
    }
    return daysofweek;
  }

  
  function colorCount(count) {
    if (count === 1) {
      return "orange";
    } else if (count === 2) {
      return "yellow";
    } else if (count === 3) {
      return "green";
    } else if (count >= 4) {
      return "red";
    }
  }
  
  function checkedDaysCount(data) {
    const dayCounts = {};
    const dayColors = {};
  
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const day = item.day_of_the_week;
      const waiterName = item.waiter_name;
  
      if (!dayCounts[day]) {
        dayCounts[day] = [waiterName];
      } else {
        dayCounts[day].push(waiterName);
      }
    }
  
    for (const day in dayCounts) {
      dayColors[day] = colorCount(dayCounts[day].length);
    }
  
    return dayColors;
  }
  


  function dataInSchedule(days, waiters) {
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      schedule[day.day_of_the_week] = [];
    }

    for (let i = 0; i < waiters.length; i++) {
      const waiter = waiters[i];
      if (schedule[waiter.day_of_the_week]) {
        schedule[waiter.day_of_the_week].push(waiter.waiter_name);
      }
    }
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      if (!schedule[day.day_of_the_week]) {
        schedule[day.day_of_the_week] = [];
      }
    }
    return schedule;
  }

  function validateSignUp(waiter, password, repeatPassword) {
    var name = waiter.charAt(0).toUpperCase() + waiter.slice(1).toLowerCase()
     if (!password && name){
      error = "Please enter password"
  }else if(!/^[a-zA-Z]+$/.test(name) && password){
      error = "Please enter a valid name"
    } else if (password <= 8 && /^[a-zA-Z]+$/.test(name)){
      error = "Password should contain characters 8 r more characters"
    } else if(!/^[a-zA-Z]+$/.test(name) && !password && !repeatPassword){
      error = "Please enter your cretentials to register"
    }
    return error;
  }

  return {
    dataInSchedule,
    checkedDays,
    checkedDaysCount,
    colorCount,
    validateSignUp
  };
}







