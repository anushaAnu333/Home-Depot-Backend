const express = require("express");
const app=express();

const Beds=require("../models/beds.models.js")


// USERS CRUD
app.get("", async (req, res) => {
    try {
      const beds = await Beds.find().lean().exec();
  
      return res.status(200).send({ beds: beds }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("", async (req, res) => {
    try {
      const beds = await Beds.create(req.body);
  
      return res.status(201).send(beds);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  // body => req.body
  // url => req.params
  // query string => req.query
  
  app.get("/:id", async (req, res) => {
    try {
      const beds = await Beds.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(beds);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/:id", async (req, res) => {
    try {
      const beds = await Beds.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(beds);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/:id", async (req, res) => {
    try {
      const beds = await Beds.findByIdAndDelete(req.params.id).lean().exec();
      // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(beds);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  module.exports=app;