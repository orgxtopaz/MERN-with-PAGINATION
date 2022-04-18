
let User = require("../models/user.js");

const Register =async (req, res) => {
    
///////////--------------ATTENDANCE TIME IN-----------------\\\\\\\\\\\\\\\\\\\\\

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const gender = "";
    const birthday = "";


          ///CREATE DATA ON DATABASE
          const newUsers = new User({
  
            firstName,
            lastName,
            email,
            password,
            gender,
            birthday

           
  
          }); // Instantiate the User in user.model
  
  
          newUsers.save()
            .then((user) => res.status(200).json({ message: "Sign up Successfully!" })) // IF TRUE CHECK
            .catch((err) => res.status(400).json("Errors: " + err)); // CATCH THE ERROR

  }




module.exports = Register;

   

  