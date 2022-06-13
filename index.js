//env initialize
require("dotenv").config();

//import all require dependencies
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//express initialize
const app = express();

//port
const port = process.env.PORT || 8000;

//define or require all routes
const slotroutes = require("./routes/slots");

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//create middleware for APIs
app.use("/api/v1/slot", slotroutes);

//DB Connection
try {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Database is Connected Successfully");
    });
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log(`Server is Running.....At ${port}`);
});
