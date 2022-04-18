

let User = require("../models/user");

const updateUser =async (req, res) => {
///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\


const birthday = req.body.birthday;
const gender = req.body.gender;
const password = req.body.password;
const email = req.body.email;



  //UPDATING TIME OUT 
  User.findOneAndUpdate({
    $and: [

      { email: { $eq: email } }
   

    ]
  }, { $set: { password: password, birthday: birthday,gender:gender } }, { new: true }, (err, doc) => {
    if (err) {
      console.log("CAN'T UPDATE OFFICIAL SERVER ERROR!");
    } else {
      res.status(200).json({ message: "OFFICIAL UPDATED SUCCESSFULLY!" })
    }


  });


}

module.exports = updateUser;





