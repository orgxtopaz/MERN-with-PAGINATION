

const Creativity = require('../models/Creativity.js');

const updateActivity =async (req, res) => {
///////////--------------ATTENDANCE TIME OUT-----------------\\\\\\\\\\\\\\\\\\\\\


const location = req.body.location;
const activityId = req.body.activityId;


  //UPDATING TIME OUT 
  Creativity.findOneAndUpdate({
    $and: [

      { _id: { $eq: activityId } }
   

    ]
  }, { $set: { location: location } }, { new: true }, (err, doc) => {
    if (err) {
      console.log("CAN'T UPDATE OFFICIAL SERVER ERROR!");
    } else {
      res.status(200).json({ message: "ACTIVITY UPDATED SUCCESSFULLY!" })
    }


  });


}

module.exports = updateActivity;





