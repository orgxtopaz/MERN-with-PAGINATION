
let User = require("../models/user");

const verifyUser =async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
  
    //CHECKING IF USER EXIST ON DATABASE
    User.find({ $and: [{ email: { $eq: email } }, { password: { $eq: password } }] })
  
      /// VALIDATING IF USER EXIST
      .then(user => {
  
        if (user.length > 0) {
          const id = user[0].id
  
        
         
  
          res.json({ message: "You are authenticated" })
  
        } else {
          res.status(400).json({  message: "Must Log in first!" })
        }
  
      })
  

}


module.exports = verifyUser;

   

  