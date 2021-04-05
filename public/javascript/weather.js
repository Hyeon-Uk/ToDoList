const weather=document.querySelector(".js-weather");
const API_KEY="51e3fb77af26c1493d111080ea1b283f";
const COORDS='coords';

function getWeather(latitude,longitude){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature=json.main.temp;
        const area=json.name;
        weather.innerText=`${temperature} @ ${area}`;
    });
}

function saveCoords(position){
    localStorage.setItem(COORDS,JSON.stringify(position));
}

function handleGeoSucc(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoErr(){
    console.log("can't load location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucc,handleGeoErr);
}

function init(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }
    else{
        const parsedCoords=JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

init();