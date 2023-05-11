const express = require("express");
const { Router} = require("express");


const router = Router();

// Get all shows

async function findUser(id) {
    // Write queries here
    const user = await User.findByPk(id);
    // const payments = await order.getPayments();
    return user;  
}
console.log(findUser(1))