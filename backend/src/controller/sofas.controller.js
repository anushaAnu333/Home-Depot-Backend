const express = require("express");
const app=express();

const Sofas=require("../models/sofas.models.js")


// USERS CRUD
app.get("", async (req, res) => {
    try {
      const sofas = await Sofas.find().lean().exec();
  
      return res.status(200).send({ sofas: sofas }); // []
    } catch (err) {
      return res
        .status(500)
        .send({  message: err.message });
    }
  });
  
  app.post("", async (req, res) => {
    try {
      const sofas = await Sofas.create(req.body);
  
      return res.status(201).send(sofas);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  // body => req.body
  // url => req.params
  // query string => req.query
  
  app.get("/:id", async (req, res) => {
    try {
      const sofas = await Sofas.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(sofas);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/:id", async (req, res) => {
    try {
      const sofas = await Sofas.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(sofa);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/:id", async (req, res) => {
    try {
      const sofas = await Sofas.findByIdAndDelete(req.params.id).lean().exec();
      // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(sofas);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  module.exports=app;