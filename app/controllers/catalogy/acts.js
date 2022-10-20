const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const cat_act = db.cat_act;

exports.addAct = (req, res) => {

    // userId_FK: req.body.user_id,
    // registryId_FK: req.body.registry_id,
    // shortTitle: req.body.short_title.toUpperCase(),
    // longTitle: req.body.long_title,
    // actYear: req.body.act_year,
    // actNo: req.body.act_no,
    // datePassed: req.body.date_pass,
    // dateAssent: req.body.date_assent,
    // commencementDate: req.body.commencement_date,
    // softItem: req.body.soft_item,
    // shelfmarkId_FK: parseInt(req.body.shelfmark_id),
    // total: req.body.total_act,
    // actCover: req.body.act_cover,
    // fileUrl: req.body.fileUrl,



  const userId_FK = req.body.user_id;
  const registryId_FK = req.body.registry_id;
  const shortTitle = req.body.short_title.toUpperCase();
  const longTitle = req.body.long_title;
  const actYear = req.body.act_year;
  const actNo = req.body.act_no;
  const datePassed = req.body.date_pass;
  const dateAssent = req.body.date_assent;
  const commencementDate = req.body.commencement_date;
  const softItem = req.body.soft_item;
  const shelfmarkId_FK = parseInt(req.body.shelfmark_id);
  const total = req.body.total_act;
  const fileUrl = req.files.fileUrl;

  const datetime = new Date();
  const system_path = process.env.category_path;
  const fileName = actNo.split(" ").join("");
  const extensionName = path.extname(fileUrl.name.toLowerCase());
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
        userId_FK: capitalize(userId_FK.toLowerCase()),
        registryId_FK: capitalize(registryId_FK.toLowerCase()),
        shortTitle: capitalize(shortTitle.toLowerCase()),
        longTitle: capitalize(longTitle.toLowerCase()),
        actYear: capitalize(actYear.toLowerCase()),
        datePassed: capitalize(datePassed.toLowerCase()),
        dateAssent: capitalize(dateAssent.toLowerCase()),
        commencementDate: capitalize(commencementDate.toLowerCase()),
        softItem: capitalize(softItem.toLowerCase()),
        shelfmarkId_FK: capitalize(shelfmarkId_FK.toLowerCase()),
        total: parseInt(total),
        fileUrl: datetime.getTime() + "_" + fileName + "_" + fileUrl.name,
        status: 1,
      })
      .then((data) => {
        var filename = datetime.getTime() + "_" + fileName + "_" + icon.name;

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
          message: err.errors[0].message,
        });
      });
  }
};

exports.editCategory = (req, res) => {
  const swahili = req.body.swahili;
  const chinese = req.body.chinese;
  const id = req.body.id;

  cfg_category
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          swahili: capitalize(swahili.toLowerCase()),
          chinese: capitalize(chinese.toLowerCase()),
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

exports.editCategoryIcon = (req, res) => {
  const id = req.body.id;
  const swahili = req.body.swahili;
  const chinese = req.body.chinese;
  const icon = req.files.icon;

  const datetime = new Date();
  const system_path = process.env.category_path;
  const fileName = swahili.split(" ").join("");
  const extensionName = path.extname(icon.name.toLowerCase());
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  cfg_category
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
            swahili: capitalize(swahili.toLowerCase()),
            chinese: capitalize(chinese.toLowerCase()),
            icon: datetime.getTime() + "_" + fileName + "_" + icon.name,
          })
          .then((result) => {
            var filename =
              datetime.getTime() + "_" + fileName + "_" + icon.name;

            icon.mv(path.join(system_path, filename), (err) => {
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
              message: err.errors[0].message,
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
  cfg_category
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
  cfg_category
    .findAll({
      where: {
        status: {
          [Op.ne]: 100,
        },
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

exports.activate = (req, res) => {
  const id = req.body.id;

  cfg_category
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
            message: data.swahili + " Successful activated",
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

  cfg_category
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          status: 2,
        })
        .then((result) => {
          res.status(200).send({
            message: data.swahili + " Successful deactivated",
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
  cfg_category
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
  cfg_category
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
