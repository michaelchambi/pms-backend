const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const Offices = db.pms_rooms;
const Op = db.Sequelize.Op;

exports.addRoom = (req, res) => {
    const name = req.body.name;
    const room = capitalize(name.toLowerCase());
    Offices.create({
            name: room,
            status: 1
        })
        .then((result) => {

            res.status(200).send({
                message: 'Office Room Successful added'
            });
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const room = capitalize(name.toLowerCase());
    Offices.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                name: room
            });

            res.status(200).send({
                message: 'Room Successful Edited'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Offices.findByPk(id).then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send({
                    message: "No Office found"
                });
            }
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err
                });
        })
};

exports.findAll = (req, res) => {
    Offices.findAll({
            where: {
                status: {
                    [Op.ne]: 100,
                },
            },
            order: [
                ['name', 'ASC'],
            ],
        }).then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving profiles."
            });
        });
}

exports.activate = (req, res) => {
    const id = req.body.id;

    Offices.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });

            res.status(200).send({
                message: 'Room Successful Activated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}

exports.deactivate = (req, res) => {
    const id = req.body.id;

    Offices.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 2
            });

            res.status(200).send({
                message: 'Room Successful Deactivated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}

exports.delete = (req, res) => {
    const id = req.body.id;

    Offices.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 100
            });

            res.status(200).send({
                message: 'Room Successful Deleted'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}