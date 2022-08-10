if(process.env.NODE_ENV !== "production"){
      require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

mongoose.connect(process.env.DATABASE_URL,
      // {useNewUrlParser: true }
      )
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log("connected to mongoose"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
      console.log(`we are running on https://localhost:${PORT}`)
);
module.exports = app;