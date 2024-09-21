const express = require("express");
const router = express.Router();
const Person = require("./../models/Person")

//Using POST to add a person
router.post('/' , async (req , res) => {
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//GET method to fetch person data
router.get("/" , async (req , res) => {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//Fetching based on the work
router.get("/:workType" , async (req , res) => {
    try{
    const workType = req.params.workType;
    if(workType == "chef" || workType == "manager" || workType == "waiter"){
        const response = await Person.find({work: workType});
        console.log("response fetched");
        res.status(200).json(response);
    }else{
        res.status(404).json({error : "Invalid work type"})
    }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//updating person data
router.put("/:id" , async(req , res) => {
    try{
        const personId = req.params.id;
        const updatesPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId , updatesPersonData , {
            new : true , 
            runValidators : true,
        })
        if(!response){
            return res.status(404).json({error : "Person not found"})
        }
        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

//Delete person data
router.delete("/:id" , async (req , res) => {
    try{
         const perSonId = req.params.id;
         const response = await Person.findByIdAndDelete(perSonId);
         if(!response){
            return res.status(404).json({error : "Person not found"})
         }
         console.log("data deleted");
         res.status(200).json({message :'Person Deleted successfully'})
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"})
    }
})

module.exports = router;