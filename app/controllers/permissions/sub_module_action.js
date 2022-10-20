const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appAction = db.pms_sub_module_action;
const appRoles = db.pms_roles;
const pms_sub_module_action = db.pms_action_permission;
const Op = db.Sequelize.Op;

exports.addAction = (req, res) => {
    const name = req.body.name;
    const moduleId = req.body.moduleId;
    const sub_moduleId = req.body.sub_moduleId;
    appAction.create({
            name: name.toLowerCase(),
            moduleId: moduleId,
            sub_moduleId: sub_moduleId,
            status: 1
        })
        .then((action) => {
            appRoles.findAll()
                .then((roles) => {
                    for (const key in roles) {
                        pms_sub_module_action.create({
                                permission: 'false',
                                actionId: action.id,
                                sub_moduleId: sub_moduleId,
                                moduleId: moduleId,
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
                        message: 'Action successfull created'
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
    appAction.findAll({
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

    appAction.findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                massage: err.errors[0].message,
            })
        })
}

exports.editAction = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    appAction.findByPk(id)
        .then((data) => {
            data.update({
                    name: name.toLowerCase(),
                })
                .then((result) => {
                    res.status(200).send({
                        message: 'Successful updated'
                    })
                })
                .catch((err) => {
                    res.status(500)
                        .send({
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
    appAction.findByPk(id)
        .then((data) => {
            data.update({
                status: 1
            });

            res.status(200).send({
                message: data.name + ' Successful activated'
            })
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}

exports.deactivate = (req, res) => {
    const id = req.body.id;
    appAction.findByPk(id)
        .then((data) => {
            data.update({
                status: 2
            });
            res.status(200).send({
                message: data.name + ' Successful deactivated'
            })
        })
        .catch((err) => {
            res.status(500)
                .send({
                    message: err.errors[0].message,
                });
        })
}