export default function waiter_availability() {
  const dayCounts = {};
  const coloredCounts = {};

  function checkedDays(waiterSelectedDays, daysofweek) {
    if (waiterSelectedDays !== undefined) {
        for (let i = 0; i < daysofweek.length; i++) {
            const day = daysofweek[i];
            day.checked = false;

            for (let j = 0; j < waiterSelectedDays.length; j++) {
                const userDay = waiterSelectedDays[j].day_of_the_week;
                if (day.day_of_the_week === userDay) {
                    day.checked = true;
                    break;
                }
            }
        }
    }
}

function colorCount(count) {
  if (count === 1) {
    return 'orange';
  } else if (count === 2) {
    return 'yellow';
  } else if (count === 3) {
    return 'green';
  } else {
    return 'red'; 
  }
}

function checkedDaysCount(waiters) {

  for (let i = 0; i < waiters.length; i++) {
    const day = waiters[i].day_of_the_week;
    if (dayCounts[day]) {
      dayCounts[day] += 1;
    } else {
      dayCounts[day] = 1;
    }
  }

  const keys = Object.keys(dayCounts);
  for (let i = 0; i < keys.length; i++) {
    const day = keys[i];
    const count = dayCounts[day];
    coloredCounts[day] = colorCount(count);
  }

  return coloredCounts;
}
  return {
    checkedDays,
    checkedDaysCount,
    colorCount,
  }
}