const express = require("express");
const UserController = require("../controller/UserController");
const TenderController = require("../controller/TenderController");
const route = express.Router();

route.get("/getalluser", UserController.getalluser);
route.post("/Userinsert", UserController.Userinsert);
route.post("/loginuser", UserController.loginuser);

//
route.post("/Tender_insert", TenderController.Tender_insert);
route.get("/getTenders", TenderController.getTenders);
route.post("/getTenderBYId/:id", TenderController.getTenderBYId);
route.post("/deleteTender/:id", TenderController.deleteTender);

module.exports = route;
