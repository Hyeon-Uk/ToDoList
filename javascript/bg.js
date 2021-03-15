const body=document.querySelector('body');

const IMG_NUMBER=5;

function getRandom(){
    const number=Math.floor(Math.random()*IMG_NUMBER)+1;
    return number;
}

function setBackground(randomNumber){
    const image=new Image();
    image.src=`./images/${randomNumber}.jpg`;
    image.classList.add("bg");

    body.prepend(image);
    // body.style.backgroundImage=`url('./images/${randomNumber}.jpg')`;
    // body.style.backgroundSize="cover";
    // body.style.backgroundRepeat="no-repeat";
    // body.style.backgroundPosition="center";
}

function init(){
    const randomNumber=getRandom();
    setBackground(randomNumber);
}

init();