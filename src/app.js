const express=require("express")
const cookieParser=require("cookie-parser")
const bcrypt=require('bcryptjs')
require("./db/conn")
const StudentRegister=require("./model/Student")

const app=express()
const  port=5000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/studentRegister",(req,res)=>{
    res.send("send")
})

app.post("/studentRegister",async(req,res)=>{
    try {
        console.log(req.body);
    const pass=req.body.password
    const cpass=req.body.confirm_password
    if(pass==cpass){
        const regStudent=new StudentRegister({
            fname:req.body.fname,
            lname:req.body.lname,
            gender:req.body.gender,
            whatsappNo:req.body.whatsappNo,
            phoneNo:req.body.phoneNo,
            email:req.body.email,
            password:req.body.password
        });

        // console.log(regStudent)
        const token=await regStudent.generateAuthToken()
        console.log("the token part: "+token);

        const regSt=await regStudent.save()
        console.log("Hey Amjad REgister Successfully");
        res.send(regSt)


    }
    else{
        console.log("Password not matched");
    }
    } 
    catch (error) {
        console.log("User Failed\n");
        console.log(error);
        return res.status(422).json({message:"User register failed"})
    }
    
})

app.get("/studentLogin",(req,res)=>{
    res.send("")
})

app.post("/studentLogin",async (req,res)=>{
    try {
        const email=req.body.email
        const pass=req.body.password
        console.log("Email: "+email);
        const useremail=await StudentRegister.findOne({email:email})
        console.log("2) Email: "+email);
        if(!useremail){
            console.log("User not found");
            return res.status(400).json({error:"User error"})
            
        }
        console.log("3) Email: "+email);

        const isMatch=await bcrypt.compare(pass,useremail.password)

        console.log("3) Email: "+email);

        const tokenA=await useremail.generateAuthToken()
        console.log("the token part: 11 "+tokenA);

        res.cookie("jwt", tokenA,{
            expires:new Date(Date.now()+600000),
            httpOnly:true
            // secure:true
        })

        if(isMatch){
            console.log("matched successfully");
            res.send("Successful")
        }
        else{
            console.log("Not Matched");
            res.status(400).json({message:"User signin Failed"})
        }
    } catch (error) {
        console.log("User Failed\n");
        console.log(error);
        return res.status(422).json({message:"User register failed"})
    }
})

app.listen(port,()=>{
    console.log(`successfully listen to port ${port}`);
})