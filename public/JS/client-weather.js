// Using helper function for the queryselecotor so i wont have to type them again
const $ = id => document.getElementById(id);
const el = selector => document.querySelector(selector);

//Function to get the user location
window.addEventListener("load", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success , error , {enableHighAccuracy : true})
    }else{
        console.log("User didn't accept location")
    }
})

//function to show and hide the second part joke and also change the message in the button
// function toggleButtion (){
// const isHidden = el(".response").style.display === "none";
// // el(".response").style.display = isHidden ? "block" : "none";
// // $("show-joke").textContent = isHidden ? "Hide Joke" : "Show Joke";


// if(isHidden){
//     el(".response").classList.add("show");
// }else{
//     el(".response").classList.remove("show");
// }
// }

function toggleButton() {
  const response = el(".response");
  response.classList.toggle("show");

  // Update button text
  $("show-joke").textContent = response.classList.contains("show")
    ? "Hide Joke"
    : "Show Joke";
}

//function that runs if get location was sucessful
async function success(position) {
    const {latitude , longitude} = position.coords;
    
    const response = await fetch ("/get-weather" , {
        method : "POST" ,
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({lat : latitude , lon : longitude})
    });

    // geting response from the get weather route 
    let result = await response.json();
    console.log(result);

    const {feels_like , temp , temp_max, temp_min} = result.main;
    const { description , icon} = result.weather[0];
    const {setup , delivery} = result.jokeResponse;
    let  iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Formating the content of the weather
   let  html = `<div class="weather-row"> <img src = ${iconUrl}></img> <p> Temperature ${temp}&degC </p>  
    <p> |Max area temperature ${temp_min}&degC</p>
    <p>|Min area Temperature ${temp_max}&degC</p> 
    <p>|Feels like ${feels_like}&degC</p>
    <p> |Description : ${description} </p> </div>`
    
    // formating the content of the joke
    const htmlJoke = `<p class="first-joke"> ${setup} </p> 
    <p class="response">${delivery}</p>`;


$("weather-info").innerHTML = html;
$("joke").innerHTML = htmlJoke;
// el(".response").style.display = "none";
$("show-joke").addEventListener("click", () => {
    toggleButton();
});
}

//funcitons the runs if getting location is not sucessful would mostly happen if user denies locaiton access
function error(err){
    let noLocation = "<p>Unable to get waether information. Please ensure your location is enabled </p>"
    document.getElementById("weather-info").innerHTML = noLocation
}

//Function to get next joke without reloading the page
async function nextJoke(){
    const response = await fetch("/get-joke");
    let result = await response.json();
    const {setup , delivery} = result.jokeResponse;
    const htmlJoke = `<p class="first-joke"> ${setup} </p> 
    <p class="response">${delivery}</p>`;
    $("joke").innerHTML = htmlJoke;
    el(".response").classList.toggle("show");
    toggleButton();
}

//click event listener that actiaite the function nextJoke
$("next-joke").addEventListener("click", () => {
 nextJoke();
});

