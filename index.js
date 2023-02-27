const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app=express();
const collection = require('./models/mongodb')

app.use(express.json());
app.set('view engine','hbs');
app.set("views")
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT || 5000 ;

app.get('/',(req,res) =>{
    res.render('login')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})


app.post('/signup',async(req,res)=> {
    console.log(req.body);
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])
    console.log(data);
    res.render("login");
})

app.post('/login', async(req,res) => {
    let status =false;
    const inputName = req.body.name;
    const inputPass = req.body.password;
    if(await collection.findOne({name:inputName})){
        status=true;
        if(await collection.findOne({password:inputPass})){
            console.log("Logged in");
            console.log(inputPass);
            console.log(collection.findOne({password:inputPass}));
            res.render('index');
        }
        else{
            res.render('login');
        }
    }
    if(status){
        console.log('name found');
    }else{
        console.log('name not found');
    }
})


app.listen(5000, () => {
    console.log(`server started at port ${port}`);
})