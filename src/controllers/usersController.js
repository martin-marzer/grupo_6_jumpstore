const { validationResult } = require("express-validator")
const fs = require('fs');
const path = require("path")
const bcrypt = require('bcryptjs');

    
const db = require("../database/models")

const User = db.User

const controlador = {
    register: (req,res) => {
        res.render("register");
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req);
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10)
        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: encryptedPassword,
                rol: 2
            })
            .then(user => {
                req.session.userLogged = user;

                res.redirect("/profile");
            })
            .catch(error => res.send(error))
        }
    },
    
    login: (req,res) => {
        res.render("login");
    },
    loginProcess: (req,res) => {
        const resultValidation = validationResult(req);
        User.findOne ({
            include: ["address", "payment"],
            where: {
                email: req.body.email
            }
        })
        .then(userToLogin => {
            if(userToLogin) {
                let verifiquePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
             if (verifiquePassword){
                 delete userToLogin.password
                 req.session.userLogged = userToLogin;
                 if(req.body.recordame != undefined){
                     res.cookie('recordame',userToLogin.email,{maxAge: 1000 * 60 * 60 * 24})
                   }
                 return res.redirect("/profile")
             }
            }
                     
            return res.render("login", {
                errors: resultValidation.mapped(),
                errorsGeneral: {
                    msg:"Hubo un problema con su inicio de sesión"
                },
                oldData: req.body
            })
        })
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('recordame',null,{maxAge: -1});
        res.redirect('/')
      },

    profile: (req, res) => {
        let userA = req.session.userLogged
        User.findOne({
            include: ["address", "payment"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            // console.log(userFinal);
            res.render("profile", {
                user: userFinal
            });
        })
        .catch(error => res.send(error))

    },
    editProfile: (req, res) => {
        let url = req.originalUrl.split("/");
        let userA = req.session.userLogged
        User.findOne({
            include: ["address", "payment"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            // console.log(userFinal);
            res.render("editProfile", {
                user: userFinal,
                url: url
            });
        })
        .catch(error => res.send(error))
    },
    editPersonalData: (req, res) => {
        User.update(
            {
                username: req.body.username,
                name: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
            },
            {
                where: { id:  req.session.userLogged.id }
            })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(error => res.send(error))
    },
    editPassword: (req, res) => {
        User.update(
            {
                password: req.body.newpassword,
            },
            {
                where: { id:  req.session.userLogged.id }
            })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(error => res.send(error))
    },
    newPayment: (req, res) => {
        let userA = req.session.userLogged
        User.findOne({
            include: ["payment"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            
            Payment.create({
                    userID:  userFinal.id,
                    card: req.body.cardNumber,
                    name: req.body.cardOwner,
                    dni: req.body.identification
            })
            .then(() => {
                res.redirect('/profile')
            })
            .catch(error => res.send(error))
        })

    },
    editPayment: (req, res) => {
        let userA = req.session.userLogged
        User.findOne({
            include: ["payment"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            
            Payment.update({
                    card: req.body.cardNumber,
                    name: req.body.cardOwner,
                    dni: req.body.identification
            },
            {
                where: {userID: userFinal.id}
            })
            .then(() => {
                res.redirect('/profile')
            })
            .catch(error => res.send(error))
        })
    },
    newAddress: (req, res) => {
        let userA = req.session.userLogged
        User.findOne({
            include: ["address"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            Address.create({
                    userID:  userFinal.id,
                    street: req.body.address_street,
                    city: req.body.address_city,
                    postal_code: req.body.address_postalCode,
                    province: req.body.address_state
            })
            .then(() => {
                res.redirect('/profile')
            })
            .catch(error => res.send(error))
        })
    },
    editAddress: (req, res) => {
        let userA = req.session.userLogged
        User.findOne({
            include: ["address"],
            where: {
                email: userA.email
            }    
        })
        .then(userFinal => {
            Address.update({
                street: req.body.address_street,
                city: req.body.address_city,
                postal_code: req.body.address_postalCode,
                province: req.body.address_state
        },{
            where: {userID: userFinal.id}
        })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(error => res.send(error))
        })
    }
};

module.exports = controlador;