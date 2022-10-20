const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const pass = require("../../config/password");
const mail = require('../../config/mail');
var bcrypt = require("bcryptjs");
const profile = require("../../models/users/pms_profile");
const User = db.users;
const user_profile = db.user_profiles;
const user_roles = db.user_roles;
const Op = db.Sequelize.Op;



exports.findAll = (req, res) => {
    User.findAll({
            where: {
                status: {
                    [Op.ne]: 100
                }
            },
            order: [
                ['firstname', 'ASC'],
            ]
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

    User.findByPk(id).then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send({
                    message: "No User found"
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

exports.UserProfile = (req, res) => {
    const id = req.params.id;

    user_profile.findOne({
            where: {
                userId: id
            }
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });

}

exports.AllUserProfile = (req, res) => {
    const id = req.params.id;

    user_profile.findAll({
            where: {
                status: {
                    [Op.ne]: 100
                }
            }
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });

}

exports.UserRoles = (req, res) => {
    const id = req.params.id;
    user_roles.findAll({
            where: {
                userId: id
            }
        })
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}

exports.EditUser = (req, res) => {
    const id = req.params.id;
    User.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phone: req.body.phone,
                    profileId: req.body.profileId,
                })
                .then((data) => {
                    user_profile.findOne({
                            where: {
                                userId: data.id
                            }
                        })
                        .then((profile) => {
                            profile.update({
                                courtId: req.body.courtId,
                                zoneId: req.body.zoneId,
                                profileId: req.body.profileId,
                                officeId: req.body.officeId,
                            })
                        })
                        .then(() => {
                            console.log('Destroy', req.body.roles);
                            // if (!req.body.roles) {
                            user_roles.destroy({
                                where: {
                                    userId: id,
                                }
                            });
                            // }

                        })
                        .then(() => {
                            console.log('Create', req.body.roles);
                            // if (!req.body.roles) {
                            for (const key in req.body.roles) {
                                const roleData = req.body.roles[key]
                                user_roles.create({
                                    roleId: roleData,
                                    userId: id
                                });
                                // }
                            }
                        })
                        .then(() => {
                            res.json({
                                'message': 'User edited successful'
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.DeactivateUser = (req, res) => {
    const id = req.body.id;
    User.findOne({
            where: {
                id: id
            }
        })
        .then((result => {
            result.update({
                status: 2
            });
        }))
        .then((data) => {
            res.status(200).send({
                message: 'user successful deactivated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}

exports.ActivateUser = (req, res) => {
    const id = req.body.id;

    User.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });
        })
        .then((data) => {
            res.status(200).send({
                message: 'user successful activated'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}

exports.DeleteUser = (req, res) => {
    const id = req.body.id;

    User.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                    status: 100
                })
                .then((data) => {
                    res.status(200).send({
                        message: 'User successfully deleted'
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}