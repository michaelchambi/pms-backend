const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const pass = require("../../config/password");
const mail = require('../../config/mail');
const uuid = require("uuid");
const User = db.users;
const user_profile = db.user_profiles;
const role = db.user_roles;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { json } = require("body-parser");

exports.signup = (req, res) => {
    // Save User to Database
    const tempPass = pass.passoword();
    User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            fullname: req.body.firstname.concat(' ', req.body.lastname),
            email: req.body.email,
            phone: req.body.phone,
            profileId: req.body.profileId,
            creator: req.body.creator,
            password: bcrypt.hashSync(tempPass, 8),
            status: 909,
            code: tempPass
        })
        .then((user) => {
            user_profile.create({
                    courtId: req.body.courtId,
                    zoneId: req.body.zoneId,
                    status: user.status,
                    profileId: req.body.profileId,
                    roomId: req.body.officeId,
                    userId: user.id

                })
                .then((result) => {
                    for (const key in req.body.roles) {
                        const data = req.body.roles[key]
                        role.create({
                            roleId: data,
                            userId: user.id
                        })

                    }

                    mail.transport.sendMail(mail.mail(user.email, user.fullname, GeneratePassword), (error, info) => {
                        if (error) {
                            return res.json({
                                'message': 'Fail to send email but successful registered',
                                'code': 1
                            });
                        }
                        return res.json({
                            'message': 'User successful registered',
                            'roles': req.body.roles,
                            'password': GeneratePassword,
                            'code': 1
                        })
                    });

                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
                'code': 0
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll({
            where: {
                status: {
                    [Op.ne]: 100
                }
            },
            order: [
                ['firstname', 'ASC'],
            ],
        })
        .then((data) => {
            const userId = data.id;
            user_profile.findOne({
                where: {
                    userId: userId,
                }
            })
        })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({

                message: err.errors[0].message,
            });
        });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not registered..!"
                });
            }

            if (user.status == 909) {
                return res.status(404).send({
                    message: "Account not activated/check your email..!",
                    code: 909
                });
            }

            if (user.status == 90) {
                return res.status(404).send({
                    message: "Reset password/check your email..!",
                    code: 90
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, process.env.secret, {
                expiresIn: 3600 // 24 hours : 86400 //  1hr: 3600 // 1min = 60

            });

            if (user && passwordIsValid && token) {
                user_profile.findOne({
                        where: {
                            userId: user.id
                        }
                    })
                    .then((result) => {
                        return res.status(200).send({
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            fullname: user.fullname,
                            email: user.email,
                            phone: user.phone,
                            profileId: user.profileId,
                            courtId: result.courtId,
                            status: user.status,
                            accessToken: token,
                        });
                    });

            }


        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.ResetPassword = (req, res) => {
    const NewPass = pass.passoword();
    const email = req.body.email;
    const uuidCode = uuid.v4();
    User.findOne({
            where: {
                email: email
            }
        })
        .then((result) => {
            result.update({
                password: bcrypt.hashSync(NewPass, 8),
                status: 90,
                code: uuidCode
            });
            user_profile.findOne({
                    where: {
                        userId: result.id
                    }
                })
                .then((profile) => {
                    profile.update({
                        status: 90
                    });
                });
            mail.transport.sendMail(mail.passwordResetMail(result.email, result.fullname, uuidCode), (error, info) => {
                if (error) {
                    return res.json({
                        'message': 'Fail to send email but ready for password reset',
                    });
                }
                return res.json({
                    'message': 'Check your email to reset password',
                    'code': uuidCode,
                })
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.ChangePassword = (req, res) => {
    const password = req.body.password;
    const code = req.body.code
    User.findOne({
            where: {
                code: code,
                status: 90
            }

        })
        .then((result) => {
            result.update({
                password: bcrypt.hashSync(password, 8),
                status: 1,
                code: pass.passoword()
            });
            user_profile.findOne({
                    where: {
                        userId: result.id
                    }
                })
                .then((profile) => {
                    profile.update({
                        status: 1
                    });
                });
            res.status(200).send({
                message: 'Password successful changed. Sign in'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
                code: 101
            });
        });
};

exports.ActivateAccount = (req, res) => {
    const uuidCode = uuid.v4();
    const code = req.body.code
    User.findOne({
            where: {
                code: code,
                status: 909
            }

        })
        .then((result) => {
            result.update({
                status: 90,
                code: uuidCode
            });

            user_profile.findOne({
                    where: {
                        userId: result.id
                    }
                })
                .then((profile) => {
                    profile.update({
                        status: 90
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message,
                    });
                });

            mail.transport.sendMail(mail.passwordResetMail(result.email, result.fullname, uuidCode), (error, info) => {
                if (error) {
                    return res.json({
                        'message': 'Fail to send email but ready for password reset',
                    });
                }
                return res.json({
                    'message': 'Check your email to reset password',
                    'code': uuidCode,
                })
            });
            // res.status(200).send({
            //     message: 'Account Activated. Change Password',
            //     code: 200
            // });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
                code: 101
            });
        });
}


exports.checkToken = (req, res) => {
    const id = req.body.id;

    User.findOne({
            where: {
                id: id
            }
        })
        .then((data) => {
            res.status(200).send({
                message: 'Token is active',
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });


}