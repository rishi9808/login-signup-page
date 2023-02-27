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
    res.render('index')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})


app.post('/signup',async(req,res)=> {

    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])
    console.log(data);
    res.render("login")
})


app.listen(port, () => {
    console.log(`server started at port ${port}`);
})