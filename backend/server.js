//importation
const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const employeer = require("./models/employeer.js")
const bodyParser = require("body-parser");
var cors = require('cors')


//assign
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors())
//middelware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//connect to DB
mongoose.connect(process.env.DB_url)
        .then(() => console.log ("Database connected successfully!"))
        .catch((err) => {
            console.log(err);
    })
    


//get method
app.get('/employeer',async(req,res)=>{
    try {
        await employeer.find({})
        .then (result=>{
            res.send(result)
        })
    } 
    catch (error) {
        console.log(err)
    }
})
//end get



//post method
app.post("/add-employeer", async(req,res)=>{
try {
    const new_employeer = new employeer({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        mobile : req.body.mobile
    });
    await new_employeer.save();
    res.send("saved successfully!")
} catch (error) {
    console.log(error)
}
});
//end post


//delete methode
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id)
try {
   const empDl=  await employeer.findOneAndDelete({_id:req.params.id})
    res.send({msg : "deleted successfully!", empDl})
} 
catch (error) {
    res.send(error)
}
})
//end delete


//put methode
app.put('/update/:id',async(req,res)=>{
    try {
        await employeer.findOneAndUpdate({_id:req.params.id},
            {email:req.params.email})
            res.send("updated successfully!")
    } catch (error) {
        res.send(error)
    }
})
//end put method




//start server
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});