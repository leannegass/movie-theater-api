const express = require("express");
const { Router} = require("express");
const User = require("../models/User.js");

const router = Router();

// define middleware 
router.use(express.json());
router.use(express.urlencoded({extended : true}));

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

router.post("/", async (req,res,next) => {
    try {
        const user = req.body;
        await User.create(user);
        res.json(user);
    } catch (error) {
        next(error);  
    }
});

module.exports = router;