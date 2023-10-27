
const query = (db) => {
  const getDays = async () => {
    return await db.manyOrNone("SELECT day_of_the_week FROM weekdays");
  };

  async function insertUser(waiter_name, waiter_password) {
    return await db.none(
      "INSERT INTO waiters (waiter_name, waiter_password) VALUES ($1, $2)",
      [waiter_name, waiter_password]
    );
  }

  const getWaiterSchedule = async () => {
    return await db.manyOrNone(
      "SELECT DISTINCT waiters.waiter_name, weekdays.day_of_the_week FROM waiters JOIN schedule ON waiters.waiter_id = schedule.waiter_name_id JOIN weekdays ON schedule.weekdays_id = weekdays.id WHERE waiters.waiter_name <> 'waiter.css' -- Exclude waiter.css ORDER BY weekdays.id;"
    );
  };

const getWaiterIdByName = async (waiter_name) => {
  return await db.manyOrNone(
    "SELECT waiter_id FROM waiters WHERE waiter_name = $1",
    [waiter_name]
  );
};

const insertSchedule = async (waiter_name, selectedDays) => {
  const getWaiterId = await getWaiterIdByName(waiter_name);

  for (let i = 0; i < selectedDays.length; i++) {
    const day = selectedDays[i];
    const getWeekDayId = await db.one(
      "SELECT id FROM weekdays WHERE day_of_the_week = $1",
      [day]
    );

    for (let j = 0; j < getWaiterId.length; j++) {
      const waiterId = getWaiterId[j].waiter_id;
      await db.none(
        "INSERT INTO schedule (weekdays_id, waiter_name_id) VALUES ($1, $2)",
        [getWeekDayId.id, waiterId]
      );
    }
  }
};


  const deleteSchedule = async () => {
    await db.none("DELETE FROM schedule");
  };

  const getSelectedDaysForWaiter = async (waiterName) => {
    return await db.manyOrNone(
      "SELECT DISTINCT weekdays.day_of_the_week FROM schedule JOIN waiters ON schedule.waiter_name_id = waiters.waiter_id JOIN weekdays ON schedule.weekdays_id = weekdays.id WHERE waiters.waiter_name = $1",
      [waiterName]
    );
  };

  const deleteWiterSelectedDays = async (waiter_name) => {
    const waiterIdResults = await getWaiterIdByName(waiter_name);
    for (let i = 0; i < waiterIdResults.length; i++) {
      const waiterId = waiterIdResults[i].waiter_id;
      await db.none("DELETE FROM schedule WHERE waiter_name_id = $1", [
        waiterId,
      ]);
    }
  };

  const getUser = async (waiter_name) => {
    return await db.oneOrNone(
      "SELECT * FROM waiters WHERE waiter_name = $1 LIMIT 1",
      [waiter_name]
    );
  };
  
  return {
    getDays,
    insertUser,
    getWaiterSchedule,
    insertSchedule,
    deleteSchedule,
    getSelectedDaysForWaiter,
    deleteWiterSelectedDays,
    getUser,
  };
};
export default query;

