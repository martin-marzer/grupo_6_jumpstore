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

            infoUser = UserFromCookie
            
        })
        res.locals.isLogged = true;
        req.session.userLogged = infoUser;
        res.locals.userLogged = req.session.userLogged;

    } else {
        res.locals.isLogged = false;
    }
    next();
}

module.exports = recordingMiddleware;