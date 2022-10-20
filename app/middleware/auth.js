const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const db = require("../models");
const User = db.users;




checkUserExistance = (req, res, next) => {
        // CHECK USERNAME IF EXIST
        User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((user) => {
                if (user) {
                    res.status(200).send({
                        message: "Email already exist",
                        'code': 0
                    });
                    return;
                }

                next();

            })
            .catch((err) => {
                res.status(500).send({

                    message: err
                });
            });
    },

    // VERIFY TOKEN
    verifyToken = (req, res, next) => {
        let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({
                message: "No token provided"
            });

        }

        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unathorized..!",
                    'token': 0
                });
            }
            req.userId = decoded.id;
            next();
        });
    }


const auth = {
    checkUserExistance: checkUserExistance,
    verifyToken: verifyToken,
}
module.exports = auth;