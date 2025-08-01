/**
 * This will be starting file of the project
 */
const mongoose=require("mongoose")
const express=require("express")
const config= require("./configs/server.config")
const db_config = require("./configs/db.config")
const userModel = require("./model/user.model")
const bcrypt=require("bcryptjs")
const app=express()
/**
 * Create an admin user at the starting of the application
 * if not already present
 */
//Connection with mongodb
mongoose.connect(db_config.DB_URL)
const db=mongoose.connection
db.on("error",()=>{
    console.log("Error while connecting to the mongo database")
})
db.once("open",()=>{
    console.log("Connected to MongoDB")
    init()
})
async function init(){
    try{

    
    let user = await userModel.findOne({userId:"admin"})
    if(user){
        console.log("ADMIN ALREADY CREATED")
        return
    }
  }catch(err){
    console.log("Error while reading the data",err)
  }
    try{
       user= await userModel.create({
            name:"Santanu",
            userId:"admin",
            email:"santanumondal4168@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin created",user)
    }catch(err){
        console.log("Error while creating admin",err)
    }
}
/**
 * Start the server
 */
app.listen(config.PORT,()=>{
    console.log("Server started at port no:",config.PORT)
})