const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
const capitalize = require("capitalize-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const project_category = db.pms_project_category;



exports.addCategory = (req, res) => {
  const category_name = req.body.project_category_name;
  const fileUrl = req.files.category_icon;
  const datetime = new Date();
  const system_path = process.env.category_file_path;
  const cat_abrev='cat'
  const fileName = cat_abrev.split(" ").join("");
  const extensionName = path.extname(fileUrl.name);
  const allowedExtension = [".png", ".jpg", ".jpeg",".ico"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send({
      message: "Invalid Image | check your Image format",
    });
  } else {
    project_category
      .create({
        categoryName: capitalize(category_name.toLowerCase()),
        categoryIcon: datetime.getTime() + "_" + fileName+ extensionName,
        status: 1,
      })
      .then((data) => {
        var filename = datetime.getTime() + "_" + fileName+ extensionName;
        fileUrl.mv(path.join(system_path, filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
          res.json({
            message: data.categoryName + " Successful Created",
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







exports.editCategory = (req, res) => {
  const id = req.body.id;
  const category=req.body.project_category_name
  project_category
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
         categoryName: capitalize(category.toLowerCase()),
          
        })
        .then((result) => {
          res.status(200).send({
            message:result.categoryName + " Successful Updated",
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
  const icon = req.files.category_icon;
  const datetime = new Date();
  const system_path = process.env.category_file_path;
  const cat_abrev='cat'
  const iconName = cat_abrev.split(" ").join("");
  const extensionName = path.extname(icon.name.toLowerCase());
  const allowedExtension = [".png", ".jpg", ".jpeg"];
  //return console.log('the file is and id is',icon,id);
  project_category
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
            categoryIcon: datetime.getTime() + "_" + iconName + "_" + icon.name,
          })
          .then((result) => {
            icon.mv(path.join(system_path, result.categoryIcon), (err) => {
              if (err) {
                return res.status(500).send({
                  message: "No such file or directory" + err,
                });
              }
              res.json({
                message: result.categoryIcon+ " Successful updated",
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
  //return console.log('the id is ',id);
  project_category
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
  project_category
    .findAll({
      // where: {
      //   status:1
      // },
      order: [["categoryName", "ASC"]],
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

  project_category
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
            message: data.categoryName + " Successful activated",
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

  project_category
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
            message: data.categoryName + " Successful deactivated",
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
  project_category
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
  project_category
    .findAll({
      where: {
        status: 1,
      },
      order: [["categoryName", "ASC"]],
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
  const directoryPath = "../storage-files/project/category/files/";
 

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
