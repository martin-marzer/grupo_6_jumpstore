const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const rutaMain = require("./routes/main");
const rutaProducts = require("./routes/products");
const rutaUsers = require("./routes/users");
const rutaAdmin = require("./routes/admin");

app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views", ["./src/views", "./src/views/products", "./src/views/users", "./src/views/admin"]);

app.listen(PORT, () => {
    console.log("Todo correcto");

})

app.use(rutaMain);
app.use(rutaProducts);
app.use(rutaUsers);
app.use(rutaAdmin);



