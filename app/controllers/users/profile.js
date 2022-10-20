const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const Profile = db.pms_profile;
const Op = db.Sequelize.Op;


exports.addProfile = (req, res) => {
    const name = req.body.name;
    const profile = capitalize(name.toLowerCase());
    Profile.create({
            name: profile,
            status: 1
        })
        .then((result) => {
            res.status(200).send({
                message: 'Profile Successful added'
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
    const profile = capitalize(name.toLowerCase());
    Profile.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                name: profile
            });

            res.status(200).send({
                message: 'Profile Successful Edited'
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

    Profile.findByPk(id).then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send({
                    message: "No profile found"
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
    Profile.findAll({
            where: {
                status: {
                    [Op.ne]: 100,
                }

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

    Profile.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });

            res.status(200).send({
                message: 'Profile Successful Activated'
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

    Profile.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 2
            });

            res.status(200).send({
                message: 'Profile Successful Deactivated'
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

    Profile.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 100
            });

            res.status(200).send({
                message: 'Profile Successful Deleted'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}