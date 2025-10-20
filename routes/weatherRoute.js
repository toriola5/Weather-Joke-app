import express from "express";
import {fetchJoke} from "../services/jokeWeatherFunction.js"
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const url = "https://api.openweathermap.org/data/2.5/weather";
const key = process.env.OPENWEATHER_KEY;

router.post("/get-weather", async (req ,res)=>{
        const {lat , lon} = req.body;
try{
        let response = await axios.get(url, {
        params : {
        lat : lat,
        lon : lon,
        appid : key,
        units : "metric"
         }});
        const {setup , delivery} = (await fetchJoke()).data
         res.json(
            {
                weather : response.data.weather,
                main : response.data.main,
                jokeResponse : {setup , delivery}
            }
         )
} catch(error){
    console.log(error.message);
}
})

router.get("/get-joke", async (req, res)=>{

try{
        const {setup , delivery} = (await fetchJoke()).data;
        res.json({
            jokeResponse : {setup , delivery}
        })
} catch (error){
    console.log("Unable to get new jokes at this moment" , error.message);
}

})

export default router;