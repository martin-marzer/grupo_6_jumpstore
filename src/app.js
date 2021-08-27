const express = require('express');
const app = express();
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const createError = require('http-errors');

const PORT = process.env.PORT || 3030;




app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");
app.set("views", ["./src/views", "./src/views/products", "./src/views/users", "./src/views/admin"]);



const rutaMain = require("./routes/main");
const rutaProducts = require("./routes/products");
const rutaUsers = require("./routes/users");
const rutaAdmin = require("./routes/admin");

app.use(rutaMain);
app.use(rutaProducts);
app.use(rutaUsers);
app.use(rutaAdmin);


app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(PORT, () => {
    console.log("funca bien pa, 3030 server personal");
})






