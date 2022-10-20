const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const { submodules } = require("./modules");
const modules = db.pms_modules;
const sub_modules = db.pms_sub_modules;
const actions = db.pms_sub_module_action;
const pms_module = db.pms_module_permission;
const pms_sub_module = db.pms_sub_module_permission;
const pms_action = db.pms_action_permission;
const user_roles = db.user_roles;
const Op = db.Sequelize.Op;
var moduleList = [];

exports.permissions = (req, res) => {
    modules.findAll({
            include: [{
                model: sub_modules,
                include: [{
                    model: actions,
                    order: [
                        ['name', 'ASC'],
                    ],
                }],

            }],


        })
        .then((data) => {
            res.json({
                Links: data
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

exports.rolePermissions = (req, res) => {
    const roleId = req.params.id;
    modules.findAll({
            include: [{
                    model: pms_module,
                    where: {
                        roleId: roleId,
                        permission: 'true'
                    }
                },
                {
                    model: sub_modules,
                    include: {
                        model: pms_sub_module,
                        where: {
                            roleId: roleId,
                            permission: 'true'
                        },
                    }
                },
                {
                    model: actions,
                    include: {
                        model: pms_action,
                        where: {
                            roleId: roleId,
                            permission: 'true'
                        },
                    }
                }
            ]

        })
        .then((data) => {
            res.json({
                permissions: data
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        });
}

exports.showModulePermissions = (req, res) => {
    const roles = req.body.roles
    pms_module.aggregate('moduleId', 'DISTINCT', {
            plain: false,
            where: {
                roleId: {
                    [Op.or]: roles
                },
                permission: 'true'
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
}

exports.showSubPermissions = (req, res) => {
    const roles = req.body.roles
    pms_sub_module.aggregate('sub_moduleId', 'DISTINCT', {
            plain: false,
            where: {
                roleId: {
                    [Op.or]: roles
                },
                permission: 'true'
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
}

exports.showActionPermissions = (req, res) => {
    const roles = req.body.roles;
    const submodule = req.body.sub_moduleId;
    pms_action.aggregate('actionId', 'DISTINCT', {
            plain: false,
            where: {
                roleId: {
                    [Op.or]: roles
                },
                sub_moduleId: submodule,
                permission: 'true'
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
}

exports.updatePermissions = (req, res) => {
    const role = req.body.roleId;
    const module = req.body.moduleId;
    const submodule = req.body.sub_moduleId;
    const action = req.body.actionId;
    // const role = 1;
    // const module = [2, 3];
    modules.findAll()
        .then((data) => {
            for (const key in data) {
                if (module.indexOf(data[key].id) !== -1) {
                    pms_module.update({
                        permission: 'true'
                    }, {
                        where: {
                            moduleId: data[key].id,
                            roleId: role
                        }
                    })
                } else {
                    pms_module.update({
                        permission: 'false'
                    }, {
                        where: {
                            moduleId: data[key].id,
                            roleId: role
                        }
                    })
                }

            }
        })
        .then((module_update) => {
            sub_modules.findAll()
                .then((result) => {

                    for (const key in result) {
                        if (submodule.indexOf(result[key].id) !== -1) {
                            pms_sub_module.update({
                                permission: 'true'
                            }, {
                                where: {
                                    sub_moduleId: result[key].id,
                                    roleId: role
                                }
                            })
                        } else {
                            pms_sub_module.update({
                                permission: 'false'
                            }, {
                                where: {
                                    sub_moduleId: result[key].id,
                                    roleId: role
                                }
                            })
                        }

                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message,
                    });
                })

        })
        .then((submodule_update) => {
            actions.findAll()
                .then((sub_action) => {
                    for (const key in sub_action) {
                        if (action.indexOf(sub_action[key].id) !== -1) {
                            pms_action.update({
                                permission: 'true'
                            }, {
                                where: {
                                    actionId: sub_action[key].id,
                                    roleId: role
                                }
                            })
                        } else {
                            pms_action.update({
                                permission: 'false'
                            }, {
                                where: {
                                    actionId: sub_action[key].id,
                                    roleId: role
                                }
                            })
                        }

                    }

                })
                .then((updated) => {
                    res.status(200).send({
                        message: 'Permissions Successful updated'
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.errors[0].message,
                    });
                })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.errors[0].message,
            });
        })

}