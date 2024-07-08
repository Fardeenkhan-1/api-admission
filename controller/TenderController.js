const TenderModel = require("../model/tender");

class TenderController {
  static Tender_insert = async (req, res) => {
    try {
      const { name, description, start_time, end_time, buffer_time } = req.body;
      const result = new TenderModel(req.body);
      //   const result = new TenderModel ({
      //     name:name,
      //     description:description,
      //     start_time:start_time,
      //     end_time:end_time,
      //     buffer_time:buffer_time,
      //   }).

      if (!result) {
        return res
          .status(404)
          .json({ status: "fail", message: "tender data not found" });
      }
      const savatender = await result.save();
      res.json({
        status: "SUCCCESS",
        message: "TENDER REGISTRATION SUCCESFULL",
        savatender,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getTenders = async (req, res) => {
    try {
      const data = await TenderModel.find();
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  };

  static getTenderBYId = async (req, res) => {
    try {
      const tender = await TenderModel.findById(req.params.id);
      if (!tender) {
        return res.status(404).json({ message: "Tender not found" });
      }
      res.status(200).json(tender);
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "failed", message: error.message });
    }
  };

  static deleteTender = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await TenderModel.findById(id);
      if (!userExist) {
        return res.status(404).json({ msg: "user not exists" });
      }
      await TenderModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "user deleted successfully" });
    } catch (error) {
        
      console.log(error);
      res.status(400).json({ status: "failed", message: error.message });
    }
  };
}

module.exports = TenderController;
