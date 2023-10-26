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
      const waiter = req.body.name;
      const name = waiter.charAt(0).toUpperCase() + waiter.slice(1).toLowerCase()
      const password = req.body.password;
      const user = await database_instance.getUser(name);
      const passwordMatch = await bcrypt.compare(password, user.waiter_password);
  
      if (!name || name === '') {
        req.flash("error", "Please enter your name");
        res.redirect("/login"); 
        return; 
      }
  
      if (!user) {
        req.flash("error", "User does not exist");
        res.redirect("/login"); 
        return; 
      }

      if (!password || password === '') {
        req.flash("error", "Please enter your password");
        res.redirect("/login");
        return; 
      }
  
      if (!passwordMatch) {
        req.flash("error", "Incorrect password");
        res.redirect("/login");
        return; 
      }
      res.redirect("/waiter/" + name);
    } catch (err) {
      console.error("Error during login:", err);
      res.redirect("/login"); 
    }
  }
  
  

  return {
    get_login,
    post_login,
  };
}
