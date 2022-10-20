const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const fileUpload = require("express-fileupload");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const path = require("path");
const Op = db.Sequelize.Op;
const Books = db.cat_book;



exports.addBook = (req, res) => {
  const cat_book = {
    isbn: req.body.isbn,
    registryId_FK: req.body.registry_id,
    userId_FK: req.body.user_id,
    dcn: req.body.dcn,
    din: req.body.din,
    author: req.body.author,
    title: req.body.title,
    subtitle: req.body.subtitle,
    editionStatement: req.body.edition_statement,
    publicationPlace: req.body.publication_place,
    publisher: req.body.publisher,
    publicationDate: req.body.publication_date,
    numberOfPages: req.body.no_pages,
    otherPhysicalDetails: req.body.physical_details,
    accompanyingMaterial: req.body.accompanying_material,
    seriesStatement: req.body.series_statement,
    generalNote: req.body.general_note,
    bibliography: req.body.bibliography,
    description: req.body.description,
    languageNote: req.body.language_note,
    formSubdivision: req.body.form_subdivision,
    shelfMark: req.body.shelf_mark,
    softItem: req.body.soft_item,
    total: req.body.total_book,
    availability: req.body.total_book,
    bookCover: req.file.bookCover,
    fileUrl: req.file.itempath,
  };
  // const isbn = req.body.isbn;
  // const registryId_FK = req.body.registry_id;
  // const userId_FK = req.body.user_id;
  // const dcn = req.body.dcn;
  // const din = req.body.din;
  // const author = req.body.author;
  // const title = req.body.title;
  // const subtitle = req.body.subtitle;
  // const editionStatement = req.body.edition_statement;
  // const publicationPlace = req.body.publication_place;
  // const publisher = req.body.publisher;
  // const publicationDate = req.body.publication_date;
  // const numberOfPages = req.body.no_pages;
  // const otherPhysicalDetails = req.body.physical_details;
  // const accompanyingMaterial = req.body.accompanying_material;
  // const seriesStatement = req.body.series_statement;
  // const generalNote = req.body.general_note;
  // const bibliography = req.body.bibliography;
  // const description = req.body.description;
  // const languageNote = req.body.language_note;
  // const formSubdivision = req.body.form_subdivision;
  // const shelfMark = req.body.shelf_mark;
  // const softItem = req.body.soft_item;
  // const total = req.body.total_book;
  // const availability = req.body.total_book;
  // const bookCover = req.file.bookCover;
  // const fileUrl = req.file.itempath;



  const Imagedatetime = new Date();
  const image_path = process.env.book_image_path;
  const bookImageName = isbn.split(" ").join("");
  const extensionName = path.extname(bookCover.name.toLowerCase());
  const allowedExtension = [".png", ".jpg", ".jpeg"];
  const Filedatetime = new Date();
  const file_path = process.env.book_file_path;
  const bookFileName = isbn.split(" ").join("");
  const fileExtensionName = path.extname(fileUrl.name.toLowerCase());
  const FileAllowedExtension = [".pdf"];

  if ((!req.files.bookCover || Object.keys(req.files.bookCover).length === 0) || (!req.files.itempath || Object.keys(req.files.itempath).length === 0)) {
    return res.status(400).send({
      message: "No files were uploaded.",
    });
  } else if ((!allowedExtension.includes(extensionName)) || (!FileAllowedExtension.includes(fileExtensionName))) {
    return res.status(422).send({
      message: "Invalid Image | check your Image format",
    });
  } else {
    bookCover= Imagedatetime.getTime() + "_" + bookImageName + "_" + bookCover.name,
    fileUrl= Filedatetime.getTime() + "_" + bookFileName + "_" + fileUrl.name,
    Books.create(cat_book)
        // isbn: req.body.isbn,
        // registryId_FK: req.body.registry_id,
        // userId_FK: req.body.user_id,
        // dcn: req.body.dcn,
        // din: req.body.din,
        // author: req.body.author,
        // title: req.body.title,
        // subtitle: req.body.subtitle,
        // editionStatement: req.body.edition_statement,
        // publicationPlace: req.body.publication_place,
        // publisher: req.body.publisher,
        // publicationDate: req.body.publication_date,
        // numberOfPages: req.body.no_pages,
        // otherPhysicalDetails: req.body.physical_details,
        // accompanyingMaterial: req.body.accompanying_material,
        // seriesStatement: req.body.series_statement,
        // generalNote: req.body.general_note,
        // bibliography: req.body.bibliography,
        // description: req.body.description,
        // languageNote: req.body.language_note,
        // formSubdivision: req.body.form_subdivision,
        // shelfMark: req.body.shelf_mark,
        // softItem: req.body.soft_item,
        // total: req.body.total_book,
        // availability: req.body.total_book,
       
      
      .then((data) => {
        var imagename = Imagedatetime.getTime() + "_" + bookImageName + "_" + bookCover.name;
        var filename = Filedatetime.getTime() + "_" + bookFileName + "_" + fileUrl.name;
        bookCover.mv(path.join(image_path, imagename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
          res.json({
            message: data.title + " Successful Created",
          });
        });
        fileUrl.mv(path.join(file_path, filename), (err) => {
          if (err) {
            return res.status(500).send({
              message: "No such file or directory" + err,
            });
          }
          res.json({
            message: data.title + " Successful Created",
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

exports.editBook = (req, res) => {
  const isbn = req.body.isbn;
  const registryId_FK = req.body.registry_id;
  const userId_FK = req.body.user_id;
  const dcn = req.body.dcn;
  const din = req.body.din;
  const author = req.body.author;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const editionStatement = req.body.edition_statement;
  const publicationPlace = req.body.publication_place;
  const publisher = req.body.publisher;
  const publicationDate = req.body.publication_date;
  const numberOfPages = req.body.no_pages;
  const otherPhysicalDetails = req.body.physical_details;
  const accompanyingMaterial = req.body.accompanying_material;
  const seriesStatement = req.body.series_statement;
  const generalNote = req.body.general_note;
  const bibliography = req.body.bibliography;
  const description = req.body.description;
  const languageNote = req.body.language_note;
  const formSubdivision = req.body.form_subdivision;
  const shelfMark = req.body.shelf_mark;
  const softItem = req.body.soft_item;
  const total = req.body.total_book;
  const availability = req.body.total_book;
  const bookCover = req.file.bookCover;
  const fileUrl = req.file.itempath;
  const id = req.body.id;

  Books.findOne({
      where: {
        id: id,
      },
    })
    .then((data) => {
      bookCover= Imagedatetime.getTime() + "_" + bookImageName + "_" + bookCover.name,
      fileUrl= Filedatetime.getTime() + "_" + bookFileName + "_" + fileUrl.name,
      data.update({
          isbn: req.body.isbn,
          registryId_FK: req.body.registry_id,
          userId_FK: req.body.user_id,
          dcn: req.body.dcn,
          din: req.body.din,
          author: req.body.author,
          title: req.body.title,
          subtitle: req.body.subtitle,
          editionStatement: req.body.edition_statement,
          publicationPlace: req.body.publication_place,
          publisher: req.body.publisher,
          publicationDate: req.body.publication_date,
          numberOfPages: req.body.no_pages,
          otherPhysicalDetails: req.body.physical_details,
          accompanyingMaterial: req.body.accompanying_material,
          seriesStatement: req.body.series_statement,
          generalNote: req.body.general_note,
          bibliography: req.body.bibliography,
          description: req.body.description,
          languageNote: req.body.language_note,
          formSubdivision: req.body.form_subdivision,
          shelfMark: req.body.shelf_mark,
          softItem: req.body.soft_item,
          total: req.body.total_book,
          availability: req.body.total_book,
          status: req.body.status
        })
        .then((result) => {
          res.status(200).send({
            message: isbn + " Successful Updated",
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

exports.editBookIcon = (req, res) => {
  const id = req.body.id;
  const swahili = req.body.swahili;
  const chinese = req.body.chinese;
  const icon = req.files.icon;

  const datetime = new Date();
  const image_path = process.env.book_path;
  const iconName = swahili.split(" ").join("");
  const extensionName = path.extname(icon.name.toLowerCase());
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  Books.findOne({
      where: {id: id,},}).then((data) => {
      if ((!allowedExtension.includes(extensionName)) || (!FileAllowedExtension.includes(fileExtensionName))) {
        return res.status(422).send({
          message: "Invalid Image | check your Image format",
        });
      } else {
        bookCover= Imagedatetime.getTime() + "_" + bookImageName + "_" + bookCover.name,
            fileUrl= Filedatetime.getTime() + "_" + bookFileName + "_" + fileUrl.name,
        data.update(cat_book)
          .then((result) => {
            var imagename = Imagedatetime.getTime() + "_" + bookImageName + "_" + bookCover.name;
            var filename = Filedatetime.getTime() + "_" + bookFileName + "_" + fileUrl.name;
            bookCover.mv(path.join(image_path, imagename), (err) => {
              if (err) {
                return res.status(500).send({
                  message: "No such file or directory" + err,
                });
              }
              res.json({
                message: data.title + " Successful Created",
              });
            });
            fileUrl.mv(path.join(file_path, filename), (err) => {
              if (err) {
                return res.status(500).send({
                  message: "No such file or directory" + err,
                });
              }
              res.json({
                message: data.title + " Successful Created",
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
  Books.findOne({
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
  Books.findAll({
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

exports.activate = (req, res) => {
  const id = req.body.id;

  cat_book
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
            message: data.isbn + " Successful activated",
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

  cat_book
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
  cat_book
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
  cat_book
    .findAll({
      where: {
        status: 1,
      },
      order: [
        ["swahili", "ASC"]
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