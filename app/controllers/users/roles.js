const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const Roles = db.pms_roles;

const appModule = db.pms_modules;
const appSubModule = db.pms_sub_modules;
const appAction = db.pms_sub_module_action;
const pms_module = db.pms_module_permission;
const pms_sub_modules = db.pms_sub_module_permission;
const pms_sub_module_action = db.pms_action_permission;

const Op = db.Sequelize.Op;

exports.addRoles = (req, res) => {
    const name = req.body.name;
    const role = capitalize(name.toLowerCase());
    Roles.create({
            name: role,
            status: 1
        })
        .then((role) => {
            appModule.findAll()
                .then((module) => {
                    for (const key in module) {
                        pms_module.create({
                                permission: 'false',
                                moduleId: module[key].id,
                                roleId: role.id
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    message: err.errors[0].message,
                                });
                            })

                    }
                })
                .then((modulePermissions) => {
                    appSubModule.findAll()
                        .then((submodule) => {
                            for (const key in submodule) {
                                pms_sub_modules.create({
                                        permission: 'false',
                                        moduleId: submodule[key].moduleId,
                                        sub_moduleId: submodule[key].id,
                                        roleId: role.id
                                    })
                                    .catch((err) => {
                                        res.status(500).send({
                                            message: err.errors[0].message,
                                        });
                                    })

                            }
                        })
                        .then((subModulePermissions) => {
                            appAction.findAll()
                                .then((action) => {
                                    for (const key in action) {
                                        pms_sub_module_action.create({
                                                permission: 'false',
                                                moduleId: action[key].moduleId,
                                                sub_moduleId: action[key].sub_moduleId,
                                                actionId: action[key].id,
                                                roleId: role.id
                                            })
                                            .catch((err) => {
                                                res.status(500).send({
                                                    message: err.errors[0].message,
                                                });
                                            })
                                    }
                                })
                                .catch((err) => {
                                    res.status(500)
                                        .send({
                                            message: err.errors[0].message,
                                        });
                                })
                        })
                        .then(() => {
                            res.status(200).send({
                                message: role.name + ' Successfull created'
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
    const role = capitalize(name.toLowerCase());
    Roles.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                name: role
            });

            res.status(200).send({
                message: 'Role Successful Edited'
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

    Roles.findByPk(id).then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send({
                    message: "No Role(s) found"
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
    Roles.findAll({
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

    Roles.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 1
            });

            res.status(200).send({
                message: 'Role Successful Activated'
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

    Roles.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 2
            });

            res.status(200).send({
                message: 'Role Successful Deactivated'
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

    Roles.findOne({
            where: {
                id: id
            }
        })
        .then((result) => {
            result.update({
                status: 100
            });

            res.status(200).send({
                message: 'Role Successful Deleted'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })
}