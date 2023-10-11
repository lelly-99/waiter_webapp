export default function waiter_availability() {


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

// function highlight(selectedDaysCount){
//   let className;
//   if (selectedDaysCount === 1) {
//     className = 'orange';
//   } else if (selectedDaysCount === 2) {
//     className = 'yellow';
//   } else if (selectedDaysCount === 3) {
//     className = 'green';
//   } else {
//     className = 'red';
//   }
//   return className;
// }

  return {
    checkedDays,
    // highlight
  }
}