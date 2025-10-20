import axios from "axios";
//function to get joke from the joke api
const jokeUrl = "https://v2.jokeapi.dev/joke";
export async function fetchJoke (){
            let jokeResponse = await axios.get(jokeUrl +"/programming" , {
            params : {
                type : "twopart"
            }
        });
    return jokeResponse;
}