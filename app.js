const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const https = require("https");


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/",function(req,res){
    res.render("home");
});

app.post("/",function(req,res){
   const query=req.body.fname;
    const url = "https://api.nationalize.io/?name="+query;

    https.get(url, function (response) {

        response.on("data", function (data) {

            const fetchedData = JSON.parse(data);
            

            res.render("result",{dataArray:fetchedData.country,name:fetchedData.name});
            

    });
});

});




app.listen(3000,function(){
    console.log("on port 3000");
});