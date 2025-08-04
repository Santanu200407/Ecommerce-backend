const authConfig = require("../configs/auth.config")
const userModel = require("../model/user.model")
const jwt=require("jsonwebtoken")

const verifySighnup=async (req,res,next)=>{
    //check for name
    if(!req.body.name){
        return res.status(400).send({
            message:"name is not provided"
        })
    }
    //check for email
    if(!req.body.email){
        return res.status(400).send({
            error:"email is not provided"
        })
    }
    //check for user id
    if(!req.body.userId){
        return res.status(400).send({
            error:"userId is not provided"
        })
    }
    //check for userId duplicate or not
    const found=await userModel.findOne({userId:req.body.userId})
    if(found){
        return res.status(400).send({
            error:"userId already present"
        })
    }
    next()
}
const verifySighnin=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"password is not provided"
        })
    }
    next()
}
const verifyToken=(req,res,next)=>{
    //check if the token is present in the header
    const token=req.header('x-acess-token')
    if(!token){
        return res.status(403).send({
            message:"No token found: UnAuthorized"
        })
    }
    //If its the valid token
    jwt.verify(token,authConfig.secret,async (error,decoded)=>{
        if(error){
            return res.status(401).send({
                message:"UnAuthorized !"
            })
        }
        const user=await userModel.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message:"UnAuthorized,this user for this token doesn't exist"
            })
        }
        //Then move to the next step
        req.user=user
        next()
    })
    
    
}
const isAdmin=(req,res,next)=>{
    const user=req.user
    if(user && user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message:"Only ADMIN users are allowed to acess this endpoint"
        })
    }
}
module.exports={
    vs:verifySighnup,
    vi:verifySighnin,
    vt:verifyToken,
    va:isAdmin
}