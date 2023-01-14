const express=require("express")
const cookieParser=require("cookie-parser")
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

app.listen(port,()=>{
    console.log(`successfully listen to port ${port}`);
})