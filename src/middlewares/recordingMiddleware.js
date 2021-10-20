// const User = require("../database/User");

const db = require("../database/models")
const User = db.User

function recordingMiddleware (req, res, next){

    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.recordame

    if (emailInCookie != undefined) {
        User.findOne ({
            where: {
                email: emailInCookie
            }
        })
        .then(UserFromCookie => {
            if(UserFromCookie){
                req.session.userLogged = UserFromCookie;
            }
        
            if(req.session.userLogged){
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
            //console.log(UserFromCookie)
        
           
        })
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