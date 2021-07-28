const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));


app.listen(PORT, () => {
    console.log("Todo correcto");

})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
})

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/carrito.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"))
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"))
})

app.get("/product/detail", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/detailProduct.html"))
})


