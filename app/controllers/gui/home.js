const dotenv = require("dotenv");
dotenv.config();
const db = require("../../models");
const capitalize = require("../../../node_modules/capitalize-the-first-letter");
const appSubModule = db.pms_sub_modules;
const appAction = db.pms_sub_module_action;
const appRoles = db.pms_roles;
const pms_sub_modules = db.pms_sub_module_permission;
const pms_modules = db.pms_modules;
const Op = db.Sequelize.Op;
exports.findAll = (req, res) => {
    pms_modules.findAll({
            where: {
                id: {
                    [Op.ne]: 1,
                },
                status: {
                    [Op.ne]: 0,
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

    appSubModule.findByPk(id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                massage: err.errors[0].message,
            })
        })
}

exports.editSubModule = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const icon = req.body.icon;
    const link = req.body.link;

    appSubModule.findByPk(id)
        .then((data) => {
            data.update({
                    name: capitalize(name.toLowerCase()),
                    icon: icon,
                    link: link,
                    linkName: capitalize(name.toLowerCase()).split(" ").join(""),
                    moduleId: data.moduleId
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


