const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://uronohan:Ivan147258@cluster0.zil8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB is connected: ${conn.connection.host}`);
};

module.exports = connectDB;
