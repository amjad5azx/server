const jwt=require("jsonwebtoken")
const Register=require("../model/Student")

const auth=async(req,res,next) =>{
    try {
        
        const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

        
        console.log(verifyUSer);

        const user=await Register.findOne({_id:verifyUSer._id,"tokens.token":token})
        // console.log("Ye dekho");
        console.log(user);

        if(!user){
            throw new Error('User not found')
        }

        req.token=token
        req.user=user
        req.userID=user._id

        next()
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports=auth