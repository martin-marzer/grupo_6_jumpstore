function adminMiddleware (req, res, next) {
    if (req.session.userLogged != undefined && req.session.userLogged.category == "admin") {
        next()
    } else {
        res.send("no sos admin")
    }
}

module.exports = adminMiddleware