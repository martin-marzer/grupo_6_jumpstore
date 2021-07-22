const express = require('express');
const app = express();
const path = require("path");

app.use(express.static("public"));

app.listen(3030, () => {
    console.log("Levantando un servidor con Express");
})



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
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


