const db = require('../../database/models');

const User = db.User

const controller = {
    list: (req, res) => {
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: '/api/users'
                },
                count:  users.length,
                users: users.map(user => {
                    delete user.dataValues.password
                    delete user.dataValues.rol
                    user.dataValues.detail = `/api/users/${user.id}`
                    return user
                })
            }
                res.json(respuesta);
            })
    },
    detail: (req, res) => {
        User.findByPk(req.params.id)
        .then(user => {
            delete user.dataValues.password
            delete user.dataValues.rol
            let respuesta = {
                meta: {
                    status: 200,
                    url: `/api/users/${req.params.id}`,
                    oldURL: '/api/users'
                },
                data: user
            }
            res.json(respuesta);
        });
    }
}

module.exports = controller;