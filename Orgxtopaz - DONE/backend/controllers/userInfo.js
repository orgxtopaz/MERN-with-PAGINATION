
let User = require("../models/user");

const userInfo =async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    //CHECKING IF USER EXIST ON DATABASE
    User.find({ $and: [{ email: { $eq: email } }, { password: { $eq: password } }] })
  
      /// VALIDATING IF USER EXIST
      .then(user => {
  
        if (user.length > 0) {
      

          res.json({  email:user[0].email,firstName:user[0].firstName, password:user[0].password,lastName:user[0].lastName,gender:user[0].gender,birthday:user[0].birthday  })
  
        } else {
          res.status(400).json({ auth: false, message: "User did not exist" })
        }
  
      })
  

}


module.exports = userInfo;

   

  