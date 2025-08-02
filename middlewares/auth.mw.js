const userModel = require("../model/user.model")
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
module.exports={
    vs:verifySighnup
}