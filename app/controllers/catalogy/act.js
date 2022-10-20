const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
// const toLowerCase = require("../../../node_modules/toLowerCase-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const cat_act = db.cat_act;

exports.addAct = (req, res) => {

  
  //return console.log('result is:',req.body.shelfmark_id);
  const userId_FK = parseInt(req.body.user_id);
  const registryId_FK = parseInt(req.body.registry_id);
  const shortTitle = req.body.short_title.toUpperCase();
  const longTitle = req.body.long_title;
  const actYear = req.body.act_year;
  const actNo = req.body.act_no;
  const datePassed = req.body.date_pass;
  const dateAssent = req.body.date_assent;
  const commencementDate = req.body.commencement_date;
  const softItem = req.body.soft_item;
  const shelfmarkId_FK = parseInt(req.body.shelfmark_id);
  const total_act = parseInt(req.body.total_act);
  const fileUrl = req.files.fileUrl;

  const datetime = new Date();
  const system_path = process.env.act_file_path;
  const fileName = actNo.split(" ").join("");
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".pdf", ".jpg", ".jpeg"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send({
      message: "Invalid Image | check your Image format",
    });
  } else {
    cat_act
      .create({
        userId_FK: parseInt(userId_FK),
        registryId_FK: parseInt(registryId_FK),
        shortTitle: shortTitle.toLowerCase(),
        longTitle: longTitle.toLowerCase(),
        actYear: actYear.toLowerCase(),
        datePassed: datePassed,
        dateAssent: dateAssent,
        actNo: actNo,
        commencementDate: commencementDate,
        softItem: softItem.toLowerCase(),
        shelfmarkId_FK: parseInt(shelfmarkId_FK),
        total: parseInt(total_act),
        fileUrl: datetime.getTime() + "_" + fileName + "_" + fileUrl.name,
        status: 1,
      })
      .then((data) => {
        var filename = datetime.getTime() + "_" + fileName + "_" + fileUrl.name;
        fileUrl.mv(path.join(system_path, filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
          res.json({
            message: data.actNo + " Successful Created",
          });
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.errors
        });
      });
  }
};

exports.editAct = (req, res) => {
  const userId_FK = parseInt(req.body.user_id);
  const registryId_FK = parseInt(req.body.registry_id);
  const shortTitle = req.body.short_title.toUpperCase();
  const longTitle = req.body.long_title;
  const actYear = req.body.act_year;
  const actNo = req.body.act_no;
  const datePassed = req.body.date_pass;
  const dateAssent = req.body.date_assent;
  const commencementDate = req.body.commencement_date;
  const softItem = req.body.soft_item;
  const shelfmarkId_FK = parseInt(req.body.shelfmark_id);
  const total_act = parseInt(req.body.total_act);
  const fileUrl = req.files.fileUrl;

  const datetime = new Date();
  const system_path = process.env.act_file_path;
  const fileName = actNo.split(" ").join("");
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".pdf", ".jpg", ".jpeg"];
  const id = req.body.id;
  cat_act
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          userId_FK: parseInt(userId_FK),
        registryId_FK: parseInt(registryId_FK),
        shortTitle: shortTitle.toLowerCase(),
        longTitle: longTitle.toLowerCase(),
        actYear: actYear.toLowerCase(),
        datePassed: datePassed,
        dateAssent: dateAssent,
        actNo: actNo,
        commencementDate: commencementDate,
        softItem: softItem.toLowerCase(),
        shelfmarkId_FK: parseInt(shelfmarkId_FK),
        total: parseInt(total_act),
        fileUrl: datetime.getTime() + "_" + fileName + "_" + fileUrl.name,
        status: 1,
        })
        .then((result) => {
          res.status(200).send({
            message: swahili + " Successful Updated",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.editActFile = (req, res) => {
  const userId_FK = parseInt(req.body.user_id);
  const registryId_FK = parseInt(req.body.registry_id);
  const shortTitle = req.body.short_title.toUpperCase();
  const longTitle = req.body.long_title;
  const actYear = req.body.act_year;
  const actNo = req.body.act_no;
  const datePassed = req.body.date_pass;
  const dateAssent = req.body.date_assent;
  const commencementDate = req.body.commencement_date;
  const softItem = req.body.soft_item;
  const shelfmarkId_FK = parseInt(req.body.shelfmark_id);
  const total_act = parseInt(req.body.total_act);
  const fileUrl = req.files.fileUrl;

  const datetime = new Date();
  const system_path = process.env.act_file_path;
  const fileName = actNo.split(" ").join("");
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".pdf", ".jpg", ".jpeg"];
  const id = req.body.id;
//return console.log('result is:',req.body);
  cat_act
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      if (!allowedExtension.includes(extensionName)) {
        return res.status(422).send({
          message: "Invalid Image | check your Image format",
        });
      } else {
        data
          .update({
            userId_FK: parseInt(userId_FK),
        registryId_FK: parseInt(registryId_FK),
        shortTitle: shortTitle.toLowerCase(),
        longTitle: longTitle.toLowerCase(),
        actYear: actYear.toLowerCase(),
        datePassed: datePassed,
        dateAssent: dateAssent,
        actNo: actNo,
        commencementDate: commencementDate,
        softItem: softItem.toLowerCase(),
        shelfmarkId_FK: parseInt(shelfmarkId_FK),
        total: parseInt(total_act),
        fileUrl: datetime.getTime() + "_" + fileName + "_" + fileUrl.name,
        status: 1,
          })
          .then((result) => {
            var filename =
              datetime.getTime() + "_" + fileName + "_" + fileUrl.name;

            fileUrl.mv(path.join(system_path, filename), (err) => {
              if (err) {
                return res.status(500).send({
                  message: "No such file or directory" + err,
                });
              }
              res.json({
                message: result.swahili + " Successful updated",
              });
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.errors
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.body.id;
  cat_act
    .findOne({
      where: {
        id: id,
      },
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

exports.findAll = (req, res) => {
  cat_act
    .findAll({
      where: {
        status: {
          [Op.ne]: 100,
        },
      },
      order: [["shortTitle", "ASC"]],
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

exports.activate = (req, res) => {
  const id = req.body.id;

  cat_act
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          status: 1,
        })
        .then((result) => {
          res.status(200).send({
            message: data.actNo + " Successful activated",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.errors[0].message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.deactivate = (req, res) => {
  const id = req.body.id;

  cat_act
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          status: 0,
        })
        .then((result) => {
          res.status(200).send({
            message: data.actNo + " Successful deactivated",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.errors[0].message,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.mobile_findOne = (req, res) => {
  const id = req.params.id;
  cat_act
    .findOne({
      where: {
        id: id,
      },
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

exports.mobile_findAll = (req, res) => {
  cat_act
    .findAll({
      where: {
        status: 1,
      },
      order: [["swahili", "ASC"]],
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
  const directoryPath = "../storage-files/act/files/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};



