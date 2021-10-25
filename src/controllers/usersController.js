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
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10)
        User.create({
                username: req.body.name,
                email: req.body.email,
                password: encryptedPassword,
                rol: 2
            })
            .then(user => {
                req.session.usuarioLogeado = user;

                return res.redirect("/");
            })
    },
    
    login: (req,res) => {
        res.render("login");
    },
    loginProcess: (req,res) => {
        User.findOne ({
            where: {
                email: req.body.email
            }
        })
        .then(userToLogin => {
            // console.log(userToLogin)
            if(userToLogin) {
                let verifiquePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
             if (verifiquePassword){
                 delete userToLogin.password
                 req.session.userLogged = userToLogin;
                 if(req.body.recordame != undefined){
                     res.cookie('recordame',userToLogin.email,{maxAge: 1000 * 60 * 60 * 24})
                   }
                   // console.log("prueba", req.body.recordame)
                 return res.redirect("/profile")
             }
            }
           
           
            return res.render("login", {
                errors: {
                    email: {
                        msg:"Encontramos datos erroneos"
                    }
                }
            })
        })
    //    let userToLogin = User.findByField("email", req.body.email);
    //    if(userToLogin) {
    //        let verifiquePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
    //     if (verifiquePassword){
    //         delete userToLogin.password
    //         req.session.userLogged = userToLogin;
    //         if(req.body.recordame != undefined){
    //             res.cookie('recordame',userToLogin.email,{maxAge: 1000 * 60 * 60 * 24})
    //           }
    //           // console.log("prueba", req.body.recordame)
    //         return res.redirect("/profile")
    //     }
    //    }
      
      
    //    return res.render("login", {
    //        errors: {
    //            email: {
    //                msg:"Encontramos datos erroneos"
    //            }
    //        }
    //    })
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('recordame',null,{maxAge: -1});
        res.redirect('/')
      },

    profile: function (req, res) {
        res.render("profile", {
            user: req.session.userLogged
        });
    }
};

module.exports = controlador;