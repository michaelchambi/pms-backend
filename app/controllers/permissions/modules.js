const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appModule = db.pms_modules;
const appSubModule = db.pms_sub_modules;
const appRoles = db.pms_roles;
const pms_module = db.pms_module_permission;
const Op = db.Sequelize.Op;

exports.addModule = (req, res) => {
    const name = req.body.name;
    const icon = req.body.icon;
    const module = capitalize(name.toLowerCase());
    appModule.create({
            name: module,
            icon: icon,
            linkName: module.split(" ").join(""),
            status: 1
        })
        .then((module) => {
            appRoles.findAll()
                .then((roles) => {
                    for (const key in roles) {
                        pms_module.create({
                                permission: 'false',
                                moduleId: module.id,
                                roleId: roles[key].id
                            })
                            .catch((err) => {
                                res.status(500)
                                    .send({
                                        message: err.errors[0].message,
                                    });
                            })
                    }
                })
                .then((result) => {
                    res.status(200).send({
                        message: module.name + ' Successfull created'
                    })
                })
                .catch((err) => {
                    res.status(500)
                        .send({
                            message: err.errors[0].message,
                        });
                })
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.findAll = (req, res) => {
    appModule.findAll({
            where: {
                status: {
                    [Op.ne]: 100,
                },
            },
            order: [
                ['name', 'ASC'],
            ],
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    appModule.findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                massage: err.errors[0].message,
            })
        })
}

exports.editModule = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const icon = req.body.icon;
    const module = capitalize(name.toLowerCase());

    appModule.findByPk(id)
        .then((data) => {
            data.update({
                    name: module,
                    icon: icon,
                    linkName: module.split(" ").join("")
                })
                .then((result) => {
                    res.status(200).send({
                        message: 'Successful updated'
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message,
                    });
                });
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        });

}

exports.activate = (req, res) => {
    const id = req.body.id;
    appModule.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });
            res.status(200).send({
                message: result.name + ' Successful activated'
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
    appModule.findByPk(id)
        .then((data) => {
            data.update({
                status: 2
            });

            res.status(200).send({
                message: data.name + ' Successful deactivated'
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.submodules = (req, res) => {
    const moduleId = req.params.id;
    appSubModule.findAll({
            where: {
                moduleId: moduleId
            },
            order: [
                ['name', 'ASC'],
            ],
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