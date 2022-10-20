const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const path = require("path");
const Op = db.Sequelize.Op;
const pms_app = db.pms_app;

exports.addAppconfig = (req, res) => {
  const name = req.body.name;
  const institution = req.body.institution;
  const logo = req.files.logo;
  const website = req.body.website;

  const datetime = new Date();
  const logoName = institution.split(" ").join("");
  const system_path = process.env.logo_path;
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else {
    const extensionName = path.extname(logo.name.toLowerCase());

    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send({
        message: "Invalid Image | check your Image format",
      });
    } else {
      pms_app
        .create({
          name: name,
          institution: institution,
          logo: datetime.getTime() + "_" + logoName + "_" + logo.name,
          website: website,
          status: 2,
        })
        .then((data) => {
          var file_name = datetime.getTime() + "_" + logoName + "_" + logo.name;

          logo.mv(path.join(system_path, file_name), (err) => {
            if (err) {
              return res.status(500).send({
                message: "No such file or directory" + err,
              });
            }
            res.json({
              message: "Institution information successful uploaded",
            });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.errors[0].message,
          });
        });
    }
  }
};

exports.findAll = (req, res) => {
  pms_app
    .findAll({
      where: {
        status: {
          [Op.ne]: 100,
        },
      },
      order: [["id", "DESC"]],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.errors[0].message,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  pms_app
    .findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.errors[0].message,
      });
    });
};

exports.activeConfig = (req, res) => {
  pms_app
    .findOne({
      where: {
        status: 1,
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.errors[0].message,
      });
    });
};

exports.editAppconfig = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const institution = req.body.institution;
  const website = req.body.website;

  pms_app
    .findOne({
      where: {
        id: id,
      },
    })
    .then((result) => {
      result
        .update({
          name: name,
          institution: institution,
          website: website,
        })
        .then((data) => {
          res.status(200).send({
            message: "Institution information successful updated",
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
        message: err.errors[0].message,
      });
    });
};

exports.editAppconfig_logo = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const institution = req.body.institution;
  const website = req.body.website;

  const logo = req.files.logo;
  const datetime = new Date();
  const logoName = institution.split(" ").join("");
  const system_path = process.env.logo_path;
  const extensionName = path.extname(logo.name.toLowerCase());
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  pms_app
    .findOne({
      where: {
        id: id,
      },
    })
    .then((result) => {
      if (!allowedExtension.includes(extensionName)) {
        return res.status(422).send({
          message: "Invalid Image | check your Image format",
        });
      } else {
        result
          .update({
            name: name,
            institution: institution,
            logo: datetime.getTime() + "_" + logoName + "_" + logo.name,
            website: website,
          })
          .then((file) => {
            var file_name =
              datetime.getTime() + "_" + logoName + "_" + logo.name;
            logo.mv(path.join(system_path, file_name), (err) => {
              if (err) {
                return res.status(500).send({
                  message: "No such file or directory" + err,
                });
              }
              res.json({
                message: "Institution information successful updated",
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
        message: err.errors[0].message,
      });
    });
};

exports.activate = (req, res) => {
  const id = req.body.id;
  pms_app
    .findOne({
      where: {
        status: 1,
      },
    })
    .then((data) => {
      if (data) {
        data
          .update({
            status: 2,
          })
          .then((result) => {
            pms_app
              .findByPk(id)
              .then((check) => {
                check
                  .update({
                    status: 1,
                  })
                  .then((values) => {
                    res.status(200).send({
                      message: check.institution + " successful activated",
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
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      } else {
        pms_app
          .findByPk(id)
          .then((check) => {
            check
              .update({
                status: 1,
              })
              .then((values) => {
                res.status(200).send({
                  message: check.institution + " successful activated",
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
              message: err.errors[0].message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.errors[0].message,
      });
    });
};

exports.deactivate = (req, res) => {
  const id = req.body.id;
  pms_app
    .findByPk(id)
    .then((data) => {
      data
        .update({
          status: 2,
        })
        .then((values) => {
          res.status(200).send({
            message: data.institution + " successful deactivated",
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

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "../storage-files/logo/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
