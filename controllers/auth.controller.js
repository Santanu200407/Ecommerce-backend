/**
 * I need to write the controller / logic to register the user
 */
const bcrypt=require("bcryptjs")
const userModel = require("../model/user.model")
const jwt=require("jsonwebtoken")
const secret_code = require("../configs/auth.config")
exports.sighnup=async (req,res)=>{
    /**
     * logic to create the user
     */
    //1.Read the request body

    const rb=req.body //in the form of js object
    //2.Insert the data in the Users collection in MongoDB
    const userObj={
        name:rb.name,
        userId:rb.userId,
        email:rb.email,
        userType:rb.userType,
        password:bcrypt.hashSync(rb.password,8)
    }
    try{
        //3.Return the response back to the user
        const  user=await userModel.create(userObj)
        const response={
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        }
        res.status(201).send(response)
    }catch(err){
        console.log("Error while registering the user",err)
        res.status(500).send({
            message:"some error happen while registering the user"
        })
    }
}

exports.sighnin=async (req,res)=>{
    //check if the user id is present in the system
    const user=await userModel.findOne({userId:req.body.userId})
    if(user==null){
        return res.status(400).send({
            message:"User id is not a valid user id"
        })
    }
    //password is correct
    const ispass=bcrypt.compareSync(req.body.password,user.password)
    if(!ispass){
        return res.status(401).send("Wrong password passed")
    }
    //using jwt we will create the acess token with a given TTL and return
    const token=jwt.sign({id:user.userId},secret_code.secret,{
        expiresIn:120//sec
    })
    res.status(200).send({
        nsme:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        acessToken:token
    })
}