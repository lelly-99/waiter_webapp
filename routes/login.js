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
      const passwordMatch = await bcrypt.compare(
        password,
        user.waiter_password
      );
      if (name && passwordMatch) {
        res.redirect("/waiter/" + name);
      } else if(!passwordMatch){
        req.flash("error", "Incorrect credentials");
      }else if (!name || name === ''){
        req.flash("error", "Please enter your name");
      }else if(name || name !== "" && !password){
        req.flash("error", "Please enter your password");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  }

  return {
    get_login,
    post_login,
  };
}
