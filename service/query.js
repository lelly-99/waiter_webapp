const query = (db) => {
  const getDays = async () => {
    return await db.manyOrNone("SELECT day_of_the_week FROM waiter_availability",);
  };
 
  const insertUser = async (username) => {
    return await db.none("INSERT INTO waiters (username) VALUES ($1)",
    [username]);
  };

  return {
    getDays,
    insertUser,
  }
};
export default query;