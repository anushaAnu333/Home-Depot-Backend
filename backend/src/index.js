const express = require("express");
const cors=require("cors")
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const port=process.env.PORT || 5100;
const connect=require("./configs/db.js");

const Beds=require("./models/beds.models");
const Sofas=require("./models/sofas.models");


const Bedscontroller=require("./controller/beds.controller.js")
const Sofascontroller=require("./controller/sofas.controller.js")
const usercontroller = require("./controller/user.controller");
const { register, login } = require("./controller/auth.controller");



const app = express();

app.use(express.json());
app.use(cors());

app.use("/beds",Bedscontroller);
app.use("/sofas",Sofascontroller);
app.use("/users", usercontroller);
app.post(
  "/register",
  body("firstname")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Field can not be empty")
    .isLength({ min: 2, max: 30 })
    .withMessage("First Name must be at least 2 characters"),

  body("lastName").custom((value) => {
    if (value && value.length < 2) {
      throw new Error("Last Name must be at least 2 characters");
    }
    return true;
  }),
  body("mobile")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Field can not be empty")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be of 10 digits"),

  body("email")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Field can not be empty ")
    .isEmail()
    .withMessage("Enter valid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      const passw = /^[A-Za-z]\w{7,15}$/;
      if (!value.match(passw)) {
        throw new Error(
          "Your password must contain at least 7 characters, First uppercase letter, one number, and one underscore."
        );
      }
      return true;
    })
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password should match");
      }
      return true;
    }),
  register
);

app.post(
  "/login",
  body("email")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Field can not be empty")
    .isEmail()
    .withMessage("enter valid email"),
  login
);

module.exports = app;






app.listen(port,async()=>{
    try{
        await connect();
    }
    catch(err){
        console.log(err)
    }

    console.log(`listening on port ${port}`)
   
})