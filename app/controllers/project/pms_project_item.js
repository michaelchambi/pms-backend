const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
const capitalize = require("capitalize-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const project_item = db.pms_project_item;

exports.addItem = (req, res) => {
  const projectname = req.body.project_name;
  const projectfile = req.files.project_file;
  const projectmanager = req.body.project_manager;
  const categoryId = req.body.project_category_id;

  const datetime = new Date();
  const projectfilepath = process.env.swahili_path;
  const fileName = swahili.split(" ").join("");
  const imageAllowedExtension = [".pdf"];

  if (!req.files.image || Object.keys(req.files.image).length === 0) {
    return res.status(400).send({
      message: "No Image were uploaded.",
    });
  } else {
    const imageExtensionName = path.extname(image.name.toLowerCase());

    if (!imageAllowedExtension.includes(imageExtensionName)) {
      return res.status(422).send({
        message: "Invalid Image | check your Image format",
      });
    }  else {
      project_item
        .create({
          projectName: projectname,
          projectFile: datetime.getTime() + "_" + fileName + "_" + projectfile.name,
          projectManager: projectmanager,
          projectCategoryId_FK:categoryId,
          status: 1,
        })
       
        .then(() => {
          var project_file = datetime.getTime() + "_" + fileName + "_" + projectfile.name;
          projectfile.mv(path.join(projectfilepath, project_file), (err) => {
            if (err) {
              return res.status(500).send({
                message: "No such file or directory for item File" + err,
              });
            }
          });
        })
        .then((data) => {
          res.json({
            message: "Project Successfully added",
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

exports.editItem = (req, res) => {
  const id = req.body.id;
  const swahili = req.body.swahili;
  const chinese = req.body.chinese;

  project_item
    .findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      data
        .update({
          swahili: swahili,
          chinese: chinese,
        })
        .then(() => {
          res.json({
            message: "Translation Successfully updated",
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

exports.editSwahili = (req, res) => {
  const id = req.body.id;
  const datetime = new Date();
  const swahili_path = process.env.swahili_path;
  const audioAllowedExtension = [".mp3"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(422).send({
      message: "No Swahili Audio were uploaded.",
    });
  } else {
    const swahili_audio = req.files.swahili_audio;
    const swahiliAudioExtension = path.extname(swahili_audio.name.toLowerCase());

    if (!audioAllowedExtension.includes(swahiliAudioExtension)) {
      return res.status(422).send({
        message: "Invalid File | check your file format",
      });
    } else {
      project_item
        .findOne({
          where: {
            id: id,
          },
        })
        .then((data) => {
          const sw_audio = data.swahili.split(" ").join("");
          const filename = datetime.getTime() + "_" + sw_audio + "_" + swahili_audio.name;
          data.update({
              swahili_audio: filename,
            })
            .then(() => {
              swahili_audio.mv(path.join(swahili_path, filename), (err) => {
                if (err) {
                  return res.status(500).send({
                    message: "No such file or directory for Swahili Audio" + err,
                  });
                }
              });
            })
            .then((data) => {
              res.json({
                message: "Translation Successfully updated",
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
    }
  }
};

exports.editChinese = (req, res) => {
  const id = req.body.id;
  const datetime = new Date();
  
  const audioAllowedExtension = [".mp3"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(422).send({
      message: "No Chinese Audio were uploaded.",
    });
  } else {
  
    const chineseAudioExtension = path.extname(chinese_audio.name.toLowerCase());

    if (!audioAllowedExtension.includes(chineseAudioExtension)) {
      return res.status(422).send({
        message: "Invalid Chinese Audio | check your Chinese Audio format",
      });
    } else {
      project_item
        .findOne({
          where: {
            id: id,
          },
        })
        .then((data) => {
          const ch_audio = data.chinese.split(" ").join("");
          const filename = datetime.getTime() + "_" + ch_audio + "_" + chinese_audio.name;
          data
            .update({
              chinese_audio: filename,
            })
            .then(() => {
              chinese_audio.mv(path.join(chinese_path, filename), (err) => {
                if (err) {
                  return res.status(500).send({
                    message: "No such file or directory for Chinese Audio" + err,
                  });
                }
              });
            })
            .then((data) => {
              res.json({
                message: "Translation Successfully updated",
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
    }
  }
};

exports.editImage = (req, res) => {
  const id = req.body.id;
  const datetime = new Date();
  const image_path = process.env.image_path;
  const imageAllowedExtension = [".png", ".jpg", ".jpeg"];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      message: "No Image were uploaded.",
    });
  } else {
    const image = req.files.image;
    const imageExtensionName = path.extname(image.name.toLowerCase());

    if (!imageAllowedExtension.includes(imageExtensionName)) {
      return res.status(422).send({
        message: "Invalid Image | check your Image format",
      });
    } else {
      project_item
        .findOne({
          where: {
            id: id,
          },
        })
        .then((data) => {
          const imageName = data.swahili.split(" ").join("");
          const filename = datetime.getTime() + "_" + imageName + "_" + image.name;
          data
            .update({
              image: filename,
            })
            .then(() => {
              image.mv(path.join(image_path, filename), (err) => {
                if (err) {
                  return res.status(500).send({
                    message: "No such file or directory for item Image" + err,
                  });
                }
              });
            })
            .then((data) => {
              res.json({
                message: "Translation Successfully updated",
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
    }
  }
};

exports.findOne = (req, res) => {
  const id = req.body.id;

  project_item
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
  const categoryId = req.body.categoryId;
  project_item
    .findAll({
      where: {
        status: {
          [Op.ne]: 100,
        },
        categoryId: categoryId,
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

exports.activate = (req, res) => {
  const id = req.body.id;

  project_item
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
        .then(() => {
          res.status(200).send({
            message: data.swahili + "/" + data.chinese + " Successful activated",
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

  project_item
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
        .then(() => {
          res.status(200).send({
            message: data.swahili + "/" + data.chinese + " Successful deactivated",
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
  project_item
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
  const categoryId = req.params.categoryId;
  project_item
    .findAll({
      where: {
        status: 1,
        categoryId: categoryId,
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
