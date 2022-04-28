const mongoose = require("mongoose");

// USER SCHEMA
// Step 1 :- creating the schema
const bedsSchema = new mongoose.Schema(
    {
      imgSrc: { type: String, required: true },
      Name: { type: String, required: true },
      ratingNum: { type: String, required: true, unique: true },
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      pickupshow: { type: String, required: true },
      pickup: { type: String, required: true },
      delivery: { type: String, required: true },
      imgdelivery: { type: String, required: true },
      imgcross: { type: String, required: true },
     
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );
  
  // Step 2 : creating the model
  const Beds = mongoose.model("beds", bedsSchema); // user => users

  module.exports=Beds;