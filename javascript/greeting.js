const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting=document.querySelector(".js-greetings");
const logoutBtn=document.querySelector(".renameBtn");
const showList=document.querySelector(".js-toDoList");
const showForm=document.querySelector(".js-toDoForm");

const USER_LS="currentUser";
const SHOWING_CN="showing";

function changeName(){
    localStorage.removeItem(USER_LS);
    location.reload();
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`Hello ${text}`;

    logoutBtn.addEventListener("click",changeName);
    logoutBtn.classList.remove("disappear");
    showList.classList.remove("disappear");
    showForm.classList.remove("disappear");
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    saveName(input.value);
    paintGreeting(input.value);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
    logoutBtn.classList.add("disappear");
    showList.classList.add("disappear");
    showForm.classList.add("disappear");
}

function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();