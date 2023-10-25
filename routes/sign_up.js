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
      const name = req.body.name;
      const password = req.body.password;
      const repeatPassword = req.body.password_repeat;
      const saltRounds = 10;
      const userExists = await database_instance.getUser(name);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const error = waiter_instance.validateSignUp(name, password, repeatPassword)
      if (error) {
        req.flash("error", error);
        res.redirect("/");
      }else if(password !== repeatPassword){
        req.flash("error", "Password does not match.");
        res.redirect("/");
      }else if (userExists) {
        req.flash("error", "User already exists. Please login.");
        res.redirect("/login");
      } else if(name && password === repeatPassword){
        await database_instance.insertUser(name, hashedPassword);
        req.flash("success", "Registration successful. Please login.");
        res.redirect("/login");
      } 
    } catch (err) {
      console.error("Error eccured during registration:", err);
    }
  }

  return {
    get_sign_up,
    post_sign_up,
  };
}



