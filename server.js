const express = require('express')
const app = express()
const db = require('./db')
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('welocme to my hotel')
})

//Import menu router file
const menuRoutes = require("./Routes/menuRoutes");

//use menu router
app.use("/menu" , menuRoutes)

//Import  person router file
const personRoutes = require("./Routes/personRoutes");

//use  person router file
app.use("/person" , personRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log("listening on port 3000")
})