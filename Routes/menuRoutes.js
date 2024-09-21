const express = require("express");
const router = express.Router();
const Menu = require("./../models/Menu")

//POST method to add a item
router.post('/' , async (req , res) => {
    try{
        const data = req.body
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//GET method to fetch menu data
router.get("/" , async (req , res) => {
    try{
        const data = await Menu.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//Fetching based on the taste
router.get("/:taste" , async (req , res) => {
    try{
    const taste = req.params.taste;
    if(taste == "sweet" || taste == "spicy" || taste == "sour"){
        const response = await Menu.find({taste: taste});
        console.log("response fetched");
        res.status(200).json(response);
    }else{
        res.status(404).json({error : "Invalid taste type"})
    }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})
//comment added fot testing purpose
module.exports = router;