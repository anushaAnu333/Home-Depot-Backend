const express = require("express")

const router = express.Router();
const User=require("../models/user.models")

router.get("", async (req, res) => {
    try {
        if(req.query.email){
            const item = await User.findOne({email:req.query.email}).lean().exec();
            return res.status(200).send(item);
        }
        else{
            const users = await User.find().lean().exec();
            return res.status(200).send(users);  

        }
      
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;

