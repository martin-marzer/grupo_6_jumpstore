const controlador = {
    index: (req,res) => {
        res.render("home");
    },
    carrito: (req,res) => {
        res.render("carrito");
    },
    administrator: (req,res) => {
        res.render("administrator");
    }
};
module.exports = controlador;