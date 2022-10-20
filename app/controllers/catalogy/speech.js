const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const Speech = db.cat_speech;


exports.findAll = (req, res) => {
    Speech.findAll({
        where: {
          status: {
            [Op.ne]: 100,
          },
        },
        order: [
          ["title", "ASC"]
        ],
      })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };

  exports.download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "../web-storage-files/project/category/files/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };