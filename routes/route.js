
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
      await database_instance.insertUser(name);
      res.redirect('/waiter');
    } catch (err) {
      console.log('error', err);
    }
  }

  async function get_waiter(req, res) {
    try {
      const days = await database_instance.getDays();
      const username = req.params.username;
      res.render('waiter', { days, username});
    } catch (err) {
      console.log('error', err);
    }
  }

  // async function get_waiter_username(req, res) {
  //   try {
  //     const days = await database_instance.getDays();
  //     const username = req.params.username;
  //     res.render('waiter', { days, username});
  //   } catch (err) {
  //     console.log('error', err);
  //   }
  // }

  async function post_waiter(req, res) {
    try {

    } catch (err) {
      console.log('error', err);
    }
  }

  async function get_days(req, res) {
    try {
  
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
    get_waiter_username,
  };
};








