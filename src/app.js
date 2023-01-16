const express=require("express")
const cookieParser=require("cookie-parser")
const bcrypt=require('bcryptjs')
require("./db/conn")
const StudentRegister=require("./model/Student")
const TeacherRegister=require("./model/Teacher")
const AdminRegister=require("./model/Admin")
const CourseRegister=require("./model/course")
const authenticate=require("./middleware/auth")
const teacherAuthenticate=require("./middleware/teacherAuth")
const adminAuthenticate=require("./middleware/adminAuth")
const jwt=require("jsonwebtoken")

const app=express()
const  port=5000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.post("/teacherRegister",async(req,res)=>{
    try {
        console.log(req.body);
    const pass=req.body.password
    const cpass=req.body.confirm_password
    const pno=req.body.phoneNo
    const wno=req.body.whatsappNo
    const email=req.body.email
    const secret=req.body.secret
    
    if(!req.body.fname){
        return res.json({message:"fname"})
    }
    if(!req.body.lname){
        return res.json({message:"lname"})
    }
    if(!req.body.email){
        return res.json({message:"emptyemail"})
    }
    if(!req.body.phoneNo){
        return res.json({message:"emptyphone"})
    }
    if(!req.body.whatsappNo){
        return res.json({message:"emptywhatsapp"})
    }
    if(!req.body.password){
        return res.json({message:"epassword"})
    }
    if(!req.body.confirm_password){
        return res.json({message:"ecpassword"})
    }

    const useremail=await StudentRegister.findOne({email:email})
    const userphone=await StudentRegister.findOne({phoneNo:pno})
    const userwhatsapp=await StudentRegister.findOne({whatsappNo:wno})

    if(userwhatsapp){
        return res.json({message:"whatsapp"})
    }
    if(!req.body.whatsappNo){
        return res.json({message:"emptywhatsapp"})
    }
    if(!req.body.secret){
        return res.json({message:"secret"})
    }
    if(userphone){
        return res.json({message:"phone"})
    }
    else if(!req.body.phoneNo){
        return res.json({message:"emptyphone"})
    }
    if(useremail){
        return res.json({message:"email"})
    }
    else if(!req.body.email){
        return res.json({message:"emptyemail"})
    }
    

    if(pass==cpass){
        const regTeacher=new TeacherRegister({
            fname:req.body.fname,
            lname:req.body.lname,
            gender:req.body.gender,
            whatsappNo:req.body.whatsappNo,
            phoneNo:req.body.phoneNo,
            email:req.body.email,
            secret:req.body.secret,
            password:req.body.password,
            status:"Inactive",
            zoom:"None"
        });

        const regSt=await regTeacher.save()
        console.log("Hey Amjad REgister Successfully");
        res.send(regSt)


    }
    else{
        return res.json({message:"password"})
    }
    } 
    catch (error) {
        console.log("User Failed\n");
        console.log(error);
        return res.status(422).json({message:"User register failed"})
    }
    
})

app.get("/studentRegister",(req,res)=>{
    res.send("send")
})

app.post("/studentRegister",async(req,res)=>{
    try {
        console.log(req.body);
    const pass=req.body.password
    const cpass=req.body.confirm_password
    const pno=req.body.phoneNo
    const wno=req.body.whatsappNo
    const email=req.body.email
    const secret=req.body.secret
    
    if(!req.body.fname){
        return res.json({message:"fname"})
    }
    if(!req.body.lname){
        return res.json({message:"lname"})
    }
    if(!req.body.email){
        return res.json({message:"emptyemail"})
    }
    if(!req.body.phoneNo){
        return res.json({message:"emptyphone"})
    }
    if(!req.body.whatsappNo){
        return res.json({message:"emptywhatsapp"})
    }
    if(!req.body.secret){
        return res.json({message:"secret"})
    }
    if(!req.body.password){
        return res.json({message:"epassword"})
    }
    if(!req.body.confirm_password){
        return res.json({message:"ecpassword"})
    }

    const useremail=await StudentRegister.findOne({email:email})
    const userphone=await StudentRegister.findOne({phoneNo:pno})
    const userwhatsapp=await StudentRegister.findOne({whatsappNo:wno})

    if(userwhatsapp){
        return res.json({message:"whatsapp"})
    }
    if(!req.body.whatsappNo){
        return res.json({message:"emptywhatsapp"})
    }
    if(userphone){
        return res.json({message:"phone"})
    }
    else if(!req.body.phoneNo){
        return res.json({message:"emptyphone"})
    }
    if(useremail){
        return res.json({message:"email"})
    }
    else if(!req.body.email){
        return res.json({message:"emptyemail"})
    }
    

    if(pass==cpass){
        const regStudent=new StudentRegister({
            fname:req.body.fname,
            lname:req.body.lname,
            gender:req.body.gender,
            whatsappNo:req.body.whatsappNo,
            phoneNo:req.body.phoneNo,
            email:req.body.email,
            secret:req.body.secret,
            status:"Inactive",
            zoom:"None",
            password:req.body.password
        });

        // console.log(regStudent)
        // const token=await regStudent.generateAuthToken()
        // console.log("the token part: "+token);

        const regSt=await regStudent.save()
        console.log("Hey Amjad REgister Successfully");
        res.send(regSt)


    }
    else{
        return res.json({message:"password"})
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

        // if(!email||!pass){
        //     return res.json({message:"empty"})
        // }
        console.log("Email: "+email);
        const useremail=await StudentRegister.findOne({email:email})
        console.log("2) Email: "+email);
        if(!useremail){
            console.log("User not found");
            return res.status(400).json({error:"User error"})
            
        }

        console.log("First Tokens: "+useremail.tokens);


        useremail.tokens=[]
        console.log("Empty Tokens: "+useremail.tokens);

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
        return res.status(422).json({message:"User failed"})
    }
})

app.post("/teacherLogin",async (req,res)=>{
    try {
        const email=req.body.email
        const pass=req.body.password

        // if(!email||!pass){
        //     return res.json({message:"empty"})
        // }
        console.log("Email: "+email);
        const useremail=await TeacherRegister.findOne({email:email})
        console.log("2) Email: "+email);
        if(!useremail){
            console.log("User not found");
            return res.status(400).json({error:"User error"})
            
        }

        console.log("First Tokens: "+useremail.tokens);


        useremail.tokens=[]
        console.log("Empty Tokens: "+useremail.tokens);

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
        return res.status(422).json({message:"User failed"})
    }
})

app.get("/profile",authenticate,async (req,res)=>{
    console.log("about");

    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await StudentRegister.findOne({_id:verifyUSer._id,"tokens.token":token})
        console.log("Ye dekho");
        console.log(user);

    return res.json(user)
})

app.get("/teacherProfile",teacherAuthenticate,async (req,res)=>{
    console.log("about");

    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await TeacherRegister.findOne({_id:verifyUSer._id,"tokens.token":token})
        console.log("Ye dekho");
        console.log(user);

    return res.json(user)
})

app.get("/adminProfile",adminAuthenticate,async (req,res)=>{
    console.log("about");

    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await AdminRegister.findOne({_id:verifyUSer._id,"tokens.token":token})
        console.log("Ye dekho");
        console.log(user);

    return res.json(user)
})

app.get("/logout",authenticate,async(req,res)=>{
    try {
        console.log(req.user);
        req.user.tokens=[]
        res.clearCookie("jwt")
        await req.user.save()
        console.log("logout successfully");
        // res.render("login")
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/teacherLogout",teacherAuthenticate,async(req,res)=>{
    try {
        console.log(req.user);
        req.user.tokens=[]
        res.clearCookie("jwt")
        await req.user.save()
        console.log("logout successfully");
        // res.render("login")
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get("/adminLogout",adminAuthenticate,async(req,res)=>{
    try {
        console.log(req.user);
        req.user.tokens=[]
        res.clearCookie("jwt")
        await req.user.save()
        console.log("logout successfully");
        // res.render("login")
    } catch (e) {
        res.status(500).send(e)
    }
})

app.put("/studentPassword",authenticate,async (req,res)=>{
    try {

        const pass=req.body.oldPassword
        console.log("about");
    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await StudentRegister.findOne({_id:verifyUSer._id,"tokens.token":token})

    const isMatch=await bcrypt.compare(pass,user.password)

    if(!isMatch){
        return res.json({message:"oldPassword"})
    }
    if(req.body.newPassword!==req.body.confirm_password){
        return res.json({message:"newPassword"})
    }

        user.password=req.body.newPassword
        await user.save()

        console.log("Ye dekho");
        console.log(user);

    
    } catch (e) {
        return res.status(422).json({message:"Password changing failed"})
    }
})

app.put("/teacherPassword",teacherAuthenticate,async (req,res)=>{
    try {

        const pass=req.body.oldPassword
        console.log("about");
    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await TeacherRegister.findOne({_id:verifyUSer._id,"tokens.token":token})

    const isMatch=await bcrypt.compare(pass,user.password)

    if(!isMatch){
        return res.json({message:"oldPassword"})
    }
    if(req.body.newPassword!==req.body.confirm_password){
        return res.json({message:"newPassword"})
    }

        user.password=req.body.newPassword
        await user.save()

        console.log("Ye dekho");
        console.log(user);

    
    } catch (e) {
        return res.status(422).json({message:"Password changing failed"})
    }
})

app.put("/adminPassword",adminAuthenticate,async (req,res)=>{
    try {

        const pass=req.body.oldPassword
        console.log("about");
    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await AdminRegister.findOne({_id:verifyUSer._id,"tokens.token":token})

    const isMatch=await bcrypt.compare(pass,user.password)

    if(!isMatch){
        return res.json({message:"oldPassword"})
    }
    if(req.body.newPassword!==req.body.confirm_password){
        return res.json({message:"newPassword"})
    }

        user.password=req.body.newPassword
        await user.save()

        console.log("Ye dekho");
        console.log(user);

    
    } catch (e) {
        return res.status(422).json({message:"Password changing failed"})
    }
})

app.put("/zoomLink",teacherAuthenticate,async (req,res)=>{
    try {

        console.log("about");
    const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await TeacherRegister.findOne({_id:verifyUSer._id,"tokens.token":token})


    if(user.status=="Inactive"){
        return res.json({message:"inactive"})
    }

        user.zoom=req.body.zoom
        await user.save()

        console.log("Ye dekho");
        console.log(user);

    
    } catch (e) {
        return res.status(422).json({message:"Password changing failed"})
    }
})


app.post("/regCourse",authenticate,async(req,res)=>{
    try {
        const token=req.cookies.jwt
        const verifyUSer=jwt.verify(token,"process.env.SECRET_KEY")

    const user=await StudentRegister.findOne({_id:verifyUSer._id,"tokens.token":token})
        console.log("Ye dekho");
        console.log(user);

        const regCourse=new CourseRegister({
            stlname:user.lname,
            stgender:user.gender,
            stwhatsappNo:user.whatsappNo,
            stemail:user.email,
            tlname:"None",
            tgender:"None",
            twhatsappNo:"None",
            temail:"None",
            zoom:"None",
        });


    } catch (e) {
        res.status(500).send(e)
    }
})

app.put("/regCourse",async(req,res)=>{
    try {

    const student=await CourseRegister.findOne({stemail:req.body.stemail})
    const teacher=await TeacherRegister.findOne({email:req.body.semail})
    if(!student){
        return res.json({message:"No student found"})
    }
    if(!teacher){
        return res.json({message:"No student found"})
    }
    if(teacher.zoom=="None"){
        return res.json({message:"No zoom link of teacher found"})
    }

            student.tlname=teacher.lname
            student.tgender=teacher.gender
            student.twhatsappNo=teacher.whatsappNo
            student.temail=teacher.email
            student.zoom=teacher.zoom
            await student.save()

            const actualStudent=await StudentRegister.findOne({email:req.body.stemail})
            actualStudent.zoom=teacher.zoom
            await actualStudent.save()
    } catch (e) {
        res.status(500).send(e)
    }
})


app.listen(port,()=>{
    console.log(`successfully listen to port ${port}`);
})