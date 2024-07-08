const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmhos5nnv",
  api_key: "635444285841289",
  api_secret: "PJX7WiOOCe1p5AntC-l0OTmnUFc",
});

class UserController {
  static getalluser = async (req, res) => {
    try {
      const data = await UserModel.find();
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  };

  static Userinsert = async (req, res) => {
    try {
      // console.log(req.files.image);
      const file = req.files.image;

      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile",
      });

      // console.log(uploadImage)
      const { name, email, password, confirmpassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      //console.log(user)
      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "THIS EMAIL IS ALREADY EXISTS" });
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            const userdata = await result.save();
            if (userdata) {
              let token = jwt.sign(
                { ID: userdata.id },
                "nikhilqwertyuisdfghjkzxcvbn"
              );
              //token genrate
              // console.log(token)
              res.cookie("token", token);

              res.status(201).json({
                status: "SUCCESS",
                message: "REGISTRATION SUCCESSFULL PLZ LOGIN",
              });
            } else {
              res
                .status(401)
                .json({ status: "failed", message: " NOT REGISTER " });
            }
          } else {
            res.status(401).json({
              status: "failed",
              message: " PASSWORD AND CONFIRM PASSWORD DOESNOT MATCH ",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "ALL FIELDS ARE REQUIRED" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static loginuser = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            // token gen.
            const token = jwt.sign(
              { ID: user._id },
              "fardeenkhan1041aaa123123"
            );
            // console.log(token);
            res.cookie("token", token);

            res.status(201).json({
              status: "success",
              message: "Login OK Report",
              token: token,
              user,
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "Email pr password are not same",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "you are not a regis user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "All field require" });
      }
    } catch (error) {
      console.log("error");
    }
  };
}

module.exports = UserController;
