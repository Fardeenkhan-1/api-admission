const mongoose = require("mongoose");
const Live_URL =
  "mongodb+srv://fardeenkhan1041:fardeen1234@ecommerce.efe7kuj.mongodb.net/Apitender?retryWrites=true&w=majority&appName=ecommerce";
// const local_url = "mongodb://127.0.0.1:27017/blog123";

const connectDB = () => {
  return (
    mongoose
      // .connect(Live_URL)
      .connect(Live_URL)
      .then(() => {
        console.log("succesfully");
      })
      .catch((error) => {
        console.log(error);
      })
  );
};
module.exports = connectDB;
