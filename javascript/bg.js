const body=document.querySelector('body');

function setBackground(){
    fetch(
        `https://source.unsplash.com/random`
    ).then(function(response){
        const image=new Image();
        image.src=response.url;
        image.classList.add("bg");
        body.prepend(image);
    })
}

function init(){
    setBackground();
}

init();