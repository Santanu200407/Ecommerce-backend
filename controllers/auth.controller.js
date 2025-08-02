/**
 * I need to write the controller / logic to register the user
 */
const bcrypt=require("bcryptjs")
const userModel = require("../model/user.model")
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
        //3.Return the response back to thee user
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