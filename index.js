const apiKey = "4a755bcf504fb8f3d425bd310da2ccb9";
let api;
let arrow = document.querySelector('#arrow');
let weatherInfo = document.querySelector('.weather-details');
let inputSection = document.querySelector('.input-div')
// let inputField = document.querySelector('input')

const cityName = document.querySelector(".cityName");
let city_Name = document.querySelector('.city_Name')
let userLocation = document.querySelector('button')

const tem = document.querySelector(".temp-value");
const descrip = document.querySelector(".description");
const hum = document.querySelector(".humidity-value");
const wnd = document.querySelector(".wind");
let ico = document.querySelector(".icon")



const weatherData = function(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => fetchWeather(data))
}
// console.log(weatherData())

function fetchWeather(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    let {temp, humidity} = data.main;
    const {speed} = data.wind;

    temp = Math.round(temp - 273.15) ;
    console.log(temp)

    tem.textContent = `${temp}`;
    hum.textContent = `${humidity}%`;
    wnd.textContent = `${speed}Km/h`
    descrip.textContent = ` ${description}`
    cityName.textContent = `${name}`
    
    ico.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    ico.style.width="100%"
    ico.style.backgroundColor = "black";
    // hum.style.backgroundColor = "white"
   
}

function searchData(){
   
   
    let search = document.querySelector(".city_Name").value;
    weatherData(search)
}

document.querySelector("#search").addEventListener(("click"), function(){
    searchData()
    inputSection.style.display = 'none';
    weatherInfo.style.display = "flex";
    arrow.style.display = 'inline'

})

// document.querySelector('.city_Name').addEventListener('keyup', e=>{
//     if(e.key == "Enter" && city_Name.value !== ''){
//         searchData(city_Name.value)
//     }
// })
// cityName.addEventListener('keyup', e => {
//     if(e.key == "Enter" && cityName.value !== ""){
//         console.log(inputField.value)
//     }
// })

arrow.addEventListener('click', function(){
    weatherInfo.style.display = "none";
    inputSection.style.display = 'block';
    arrow.style.display = 'none'
})

userLocation.addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error)
    } else{
        alert('Your browser does not support geolocation API')
    }
})

function success(position){
    const {latitude, longuitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longuitude}&appid=${apiKey}`
    searchData()
}

function error(error){
    console.log(error)
}

function fetchData(){
    fetch(api).then(response => response.json()).then(result => weatherData(result))
}