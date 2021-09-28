const fs = require('fs');
const path = require('path');
let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));


function authMiddleware (req, res, next) {
 if (req.session.userLogged != undefined) {
    res.locals.usuario = req.session.userLogged;
    usuario = res.locals.usuario
    // console.log(res.locals.usuario);
     next()
 } else {
     res.redirect("/login")
 }



//  if(req.session.usuario){
//      res.locals.usuario = req.session.usuario;
//      return next();
//  }else if(req.cookies.email){
//      let usuario = archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
//      req.session.usuario = usuario;
//      res.locals.usuario = usuario;
//      return next();
//  }else{
//      return next();
//  }
}


module.exports = authMiddleware

//este middleware es para preguntar si estas logueado, si estas loggueado ya no vvas  apoder entrar en esas paginas