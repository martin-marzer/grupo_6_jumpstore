const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const rutaMain = require("./routes/main");
const rutaProducts = require("./routes/products");
const rutaUsers = require("./routes/users");

app.use(express.static("public"));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "./src/views")



app.use(rutaMain);
app.use(rutaProducts);
app.use(rutaUsers);



app.listen(PORT, () => {
    console.log("Todo correcto");

})