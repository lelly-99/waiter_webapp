const query = (db) => {
  const getDays = async () => {
    return await db.manyOrNone("SELECT day_of_the_week FROM weekdays");
  };

  const insertUser = async (waiter_name) => {
    return await db.none("INSERT INTO waiters (waiter_name) VALUES ($1)", [
      waiter_name,
    ]);
  };

  const getWaiterSchedule = async () => {
    return await db.manyOrNone(
      "SELECT waiters.waiter_name, weekdays.day_of_the_week FROM waiters JOIN schedule ON waiters.waiter_id = schedule.waiter_name_id JOIN weekdays ON schedule.weekdays_id = weekdays.id WHERE waiters.waiter_name <> 'waiter.css' -- Exclude waiter.css ORDER BY weekdays.id;"
    );
  };

  const insertSchedule = async (waiter_name, selectedDays) => {
    const waiterIdResults = await db.manyOrNone(
      "SELECT waiter_id FROM waiters WHERE waiter_name = $1",
      [waiter_name]
    );
    const waiterIds = [];
    for (let i = 0; i < waiterIdResults.length; i++) {
      waiterIds.push(waiterIdResults[i].waiter_id);
    }

    for (let i = 0; i < selectedDays.length; i++) {
      const day = selectedDays[i];
      const weekdaysIdResult = await db.one(
        "SELECT id FROM weekdays WHERE day_of_the_week = $1",
        [day]
      );
      for (let j = 0; j < waiterIds.length; j++) {
        const waiterId = waiterIds[j];
        await db.none(
          "INSERT INTO schedule (weekdays_id, waiter_name_id) VALUES ($1, $2)",
          [weekdaysIdResult.id, waiterId]
        );
      }
    }
  };

  const deleteSchedule = async () => {
    await db.none("DELETE FROM schedule");
    await db.none("DELETE FROM waiters");
  };

  const getSelectedDaysForWaiter = async (waiterName) => {
    return await db.manyOrNone(
      "SELECT weekdays.day_of_the_week FROM schedule JOIN waiters ON schedule.waiter_name_id = waiters.waiter_id JOIN weekdays ON schedule.weekdays_id = weekdays.id WHERE waiters.waiter_name = $1",
      [waiterName]
    );
  };

  const deleteWiterSelectedDays = async (waiter_name) => {
    const waiterIdResults = await db.manyOrNone(
      "SELECT waiter_id FROM waiters WHERE waiter_name = $1",
      [waiter_name]
    );
    for (let i = 0; i < waiterIdResults.length; i++) {
      const waiterId = waiterIdResults[i].waiter_id;
      await db.none("DELETE FROM schedule WHERE waiter_name_id = $1", [
        waiterId,
      ]);
    }
  };

  return {
    getDays,
    insertUser,
    getWaiterSchedule,
    insertSchedule,
    deleteSchedule,
    getSelectedDaysForWaiter,
    deleteWiterSelectedDays,
  };
};
export default query;
