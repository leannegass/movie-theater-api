const express = require("express");
const { Router} = require("express");
const users = require("./models/User.js");

const router = Router();

// Get all users
router.get("/", async (req,res,next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);  
    }
});
// Get user by id
router.get("/:id", async (req,res,next) => {
    try {
        const {id} = req.params;
        const userAtId = await User.findByPk(id);
        if(userAtId){
            res.json(userAtId);
        }
        else{
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);    
    }
});

module.exports = router;