// const User = require("../database/User");

const db = require("../database/models")
const User = db.User

function recordingMiddleware (req, res, next){

    
    let emailInCookie = req.cookies.recordame

    if (emailInCookie != undefined) {
        User.findOne ({
            where: {
                email: emailInCookie
            }
        })
        .then(UserFromCookie => {

            res.locals.isLogged = true;

            req.session.userLogged = UserFromCookie;
            res.locals.userLogged = req.session.userLogged;
           
        })
    } else {
        res.locals.isLogged = false;
    }
    next();




    // let UserFromCookie = User.findByField("email", emailInCookie);

    // if(UserFromCookie){
    //     req.session.userLogged = UserFromCookie;
    // }

    // if(req.session.userLogged){
    //     res.locals.isLogged = true;
    //     res.locals.userLogged = req.session.userLogged;
    // }
    // //console.log(UserFromCookie)

    // next();
}

module.exports = recordingMiddleware;