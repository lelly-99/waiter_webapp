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
      "SELECT DISTINCT waiters.waiter_name, weekdays.day_of_the_week FROM schedule JOIN waiters ON schedule.waiter_name_id = waiters.waiter_id JOIN weekdays ON schedule.weekdays_id = weekdays.id"
    );
  };
  
  const insertSchedule = async (waiter_name, selectedDays) => {
    const waiterIdResults = await db.manyOrNone(
      "SELECT waiter_id FROM waiters WHERE waiter_name = $1",
      [waiter_name]
    );
    const waiterIds = waiterIdResults.map((result) => result.waiter_id);
    for (const day of selectedDays) {
      const weekdaysIdResult = await db.one(
        "SELECT id FROM weekdays WHERE day_of_the_week = $1",
        [day]
      );
      for (const waiterId of waiterIds) {
        await db.none(
          "INSERT INTO schedule (weekdays_id, waiter_name_id) VALUES ($1, $2)",
          [weekdaysIdResult.id, waiterId]
        );
      }
    }
  };
const deleteScheduleForUser = async (username) => {
  const waiterIds = await db.manyOrNone(
    "SELECT waiter_id FROM waiters WHERE waiter_name = $1",
    [username]
  );

  if (waiterIds.length > 0) {
    await db.none(
      "DELETE FROM schedule WHERE waiter_name_id IN ($1:csv)",
      [waiterIds.map((row) => row.waiter_id)]
    );
  }
};

  const deleteSchedule = async () => {
    await db.none('DELETE FROM schedule');
    await db.none('DELETE FROM waiters');
  };

  return {
    getDays,
    insertUser,
    getWaiterSchedule,
    insertSchedule,
    deleteSchedule,
    deleteScheduleForUser,
  };
};
export default query;

// SELECT COUNT(*) AS waiter_count
// FROM schedule
// WHERE weekdays_id = (SELECT id FROM weekdays WHERE day_of_the_week = 'Monday');

// INSERT INTO schedule (waiter_name_id, weekdays_id)
// SELECT w.waiter_id, d.id
// FROM waiters w
// JOIN weekdays d ON w.waiter_name = 'lefsifi' AND d.day_of_the_week = 'Friday';
