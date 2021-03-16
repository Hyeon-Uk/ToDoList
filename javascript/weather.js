const API_KEY="51e3fb77af26c1493d111080ea1b283f";
const COORDS='coords';

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

    }
}

init();