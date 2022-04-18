
const Creativity = require('../models/Creativity.js');

const deleteActivity =async (req, res) => {

//DELETE SPECIFIC OFFICIAL
Creativity.findByIdAndDelete(req.params.id)
.then((user) => res.json("Record was deleted."))
.catch((err) => res.status(400).json("Error: " + err));


}

module.exports = deleteActivity;

   

