const express = require("express");
const { Router} = require("express");
const { Show, User } = require('../models/index')


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
router.get("/:id/:shows", async (req,res,next) => {
    
        const {id,shows} = req.params;
        console.log(id,shows)
        const userAtId = await User.findByPk(id);
        const userShows = await userAtId.getShows();
        console.log(userShows)
        res.json(userShows);
        
});

router.put("/:userId/:books/:showId", async (req,res,next) => {
    //parse data from the request
    const {userId, showId } = req.params;
    // console.log(userId, showId)
    const user = await User.findOne({ where: { id: userId } });
    // console.log(user)
    const show = await Show.findOne({ where: { id: showId } });
    // console.log(show)
    //set the userid for the show watched by the specific user
    show.setUser(user);
    res.json("success");
});

module.exports = router;