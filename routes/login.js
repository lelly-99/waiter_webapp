import bcrypt from "bcrypt";

export default function login(database_instance) {
  async function get_login(req, res) {
    try {
      res.render("login");
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function post_login(req, res) {
    try {
      const name = req.body.name;
      const password = req.body.password;
      const user = await database_instance.getUser(name);
      console.log(user)
      const passwordMatch = await bcrypt.compare(
        password,
        user.waiter_password
      );
      console.log(passwordMatch)
      if (passwordMatch) {
        res.redirect("/waiter/" + name);
      } 
    } catch (err) {
      console.error("Error during login:", err);
      req.flash("error", "An error occurred during login. Please try again.");
      res.redirect("/login");
    }
  }

  return {
    get_login,
    post_login,
  };
}
