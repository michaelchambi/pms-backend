const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("capitalize-the-first-letter");
const court_floor = db.pms_department;
const Op = db.Sequelize.Op;

exports.addFloor = (req, res) => {
    const name = req.body.name;
    const floor = capitalize(name.toLowerCase());
    court_floor.create({
            name: floor,
            status: 1
        })
        .then((result) => {

            res.status(200).send({
                message: 'Court Floor Successful added'
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
    const floor = capitalize(name.toLowerCase());
    court_floor.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                name: floor
            });

            res.status(200).send({
                message: 'Court Floor Successful Edited'
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

    court_floor.findByPk(id).then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send({
                    message: "No Court Floor found"
                });
            }
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
};

exports.findAll = (req, res) => {
    court_floor.findAll({
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
                message: err.errors[0].message,
            });
        });
}

exports.activate = (req, res) => {
    const id = req.body.id;

    court_floor.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });

            res.status(200).send({
                message: 'Court Floor Successful Activated'
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

    court_floor.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 2
            });

            res.status(200).send({
                message: 'Court Floor Successful Deactivated'
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

    court_floor.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 100
            });

            res.status(200).send({
                message: 'Court Floor Successful Deleted'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}