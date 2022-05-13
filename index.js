require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

// midllewares
const AuthMiddleware = require("./middleware/auth");

// routes
const AuthRouter = require("./routes/userLogin");
const UserUpdateRouter = require("./routes/userUpdateDetails");

app.use(express.json());
app.use(cors());

app.use("/api/auth", AuthRouter);
app.use("/api/user", AuthMiddleware, UserUpdateRouter);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server connected at port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
