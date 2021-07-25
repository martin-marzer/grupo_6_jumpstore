const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3030;

app.use(express.static("public"));

<<<<<<< HEAD
app.listen(3030, () => {
    console.log("Todo correcto");
=======
app.listen(PORT, () => {
    console.log("Levantando un servidor con Express");
>>>>>>> e5f9851ac64330acf255e140e00156296bd59f43
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


