import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import weatherJoke from "./routes/weatherRoute.js";

//configuring the dotenv to allow key values to be use from the env
dotenv.config();


const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use(express.json());

//Render the home page
app.get("/" , (req , res)=>{
    res.render("index");
})

//post route to provide weahter details on loading the page
app.use("/" , weatherJoke)

app.listen(port , ()=>{
    console.log(`server started at port ${port}`);  
})
