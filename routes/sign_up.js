import bcrypt from "bcrypt";

export default function sign_up(database_instance, waiter_instance) {
  async function get_sign_up(req, res) {
    try {
      res.render("index");
    } catch (err) {
      console.error("Error", err);
    }
  }

  async function post_sign_up(req, res) {
    try {
      const waiter = req.body.name;
      const name = waiter.charAt(0).toUpperCase() + waiter.slice(1).toLowerCase();
      const password = req.body.password;
      const repeatPassword = req.body.password_repeat;
      const saltRounds = 10;
      const userExists = await database_instance.getUser(name);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const error = waiter_instance.validateSignUp(name, password, repeatPassword);
  
      if (error) {
        req.flash("error", error);
        return res.redirect("/");
      } else if (password !== repeatPassword) {
        req.flash("error", "Password does not match.");
        return res.redirect("/");
      } else if (userExists) {
        req.flash("error", "User already exists. Please login.");
        return res.redirect("/login");
      } else if (name && password === repeatPassword) {
        await database_instance.insertUser(name, hashedPassword);
        req.flash("success", "Registration successful. Please login.");
        return res.redirect("/login");
      } 
    } catch (err) {
      console.error("Error occurred during registration:", err);
      return res.redirect("/");
    }
  }
  

  return {
    get_sign_up,
    post_sign_up,
  };
}



