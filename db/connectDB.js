const mongoose = require("mongoose");

const connectdb = () => {
  mongoose.connect(process.env.Local_URL)
    .then(() => {
      console.log("connecting successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectdb;
