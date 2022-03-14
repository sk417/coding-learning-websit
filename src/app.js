require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const app = express();

require("./db/conn");
const Register = require("./models/registers");
const fill = require("./models/queries");

const port = process.env.PORT || 3000;

 const static_path = path.join(__dirname, "../public");
 const temp_path = path.join(__dirname, "../templates/views");
 const par_path = path.join(__dirname, "../templates/partials");
 
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 
 app.use(express.static(static_path));
 app.set("view engine", "hbs");
 app.set("views", temp_path);
 hbs.registerPartials(par_path);
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register", async(req, res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registerStudent = new Register({
                firstname : req.body.fname,
                lastname : req.body.lname,
                email : req.body.email,
                gender : req.body.gender,
                mobile : req.body.mobile,
                age : req.body.age,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword
            });

            const  registered = await registerStudent.save();
            console.log("successfull");
            res.status(200).render("home");
           
        }else{
            res.send("Password are not matching..... please try again");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});

        const isMatch= bcrypt.compare(password, useremail.password);

        if(isMatch){
            res.status(201).render("home");
        }else{
            res.status(400).send("Invalid user email or password..");
        }

    } catch (error) {
        res.status(400).send("Invalid user email or password...");
    }
})

app.post("/query", async(req,res)=>{
    try {
        const queryInfo = new fill({
            name:req.body.name,
            Query:req.body.queries
        });
        const saveInfo = await queryInfo.save();
        res.status(200).send("Thanks for giving your valuable feedback, again Go back");
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});