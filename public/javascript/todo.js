const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector('.js-toDoList');
const TODOS_LS="toDos";
const FINISHED_LS="finishedToDos";
const closeBtn=document.querySelector(".closeBtn");
const finishedListBtn = document.querySelector("#finishedListBtn");
const finishedBox= document.querySelector("#js-finishedList");
const finishedList=document.querySelector(".js-finishedList-ul");
const currentUser=localStorage.getItem(USER_LS);
let toDos=[];
let finished=[];

const AJAX_URL='http://127.0.0.1:8000/';

function clearToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    const inner=li.innerText;
    const text=inner.slice(0,inner.length-2);
    const newId=Date.now();
    const finishedObj={
        text,
        id:newId
    }
    finished.push(finishedObj);
    deleteToDo(event);
    addAjax(`${AJAX_URL}add`,text,"finishedlist");
}


const deleteAjax=(url,data,table)=>{
    const Data=JSON.stringify({topic:data,table:table,user_name:currentUser});
    const xhr=new XMLHttpRequest();
    xhr.open("post",url);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(Data);
}


function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    let topic=li.innerText;
    topic=topic.slice(0,topic.length-2);
    //html dom 제거
    toDoList.removeChild(li);

    //제거하려는 li의 id와 다른것들 필터
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);
    });

    //갱신후 저장
    toDos=cleanToDos;
    deleteAjax(`${AJAX_URL}delete`,topic,"todolist");
}


const addAjax=(url,data,table)=>{
    const Data=JSON.stringify({user_name:currentUser,topic:data,table:table});
    const xhr=new XMLHttpRequest();
    xhr.open("post",url);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(Data);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    addAjax(`${AJAX_URL}add`,currentValue,"todolist");
    paintToDo(currentValue);
    toDoInput.value="";
}

function paintFinished(f){
    const li=document.createElement("li");
    const span=document.createElement("span");
    const delBtn=document.createElement("button");
    delBtn.innerText="X";
    delBtn.addEventListener("click",(event)=>{
        const btn=event.target;
        const li=btn.parentNode;
        let topic=li.innerText;
        topic=topic.slice(0,topic.length-1);
        finishedList.removeChild(li);
        
        const filteredFinished=finished.filter((finish)=>{
            return finish.id!==parseInt(li.id);
        });
        finished=filteredFinished;
        deleteAjax(`${AJAX_URL}delete`,topic,"finishedlist");
    });
    span.innerText=f;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=f.id;
    li.classList.add("js-finishedList-ul-li");
    finishedList.appendChild(li);
}

const loadFinished = () =>{
    finished.forEach(each=>{
        paintFinished(each.text);
    })
}

const initFinished = ()=>{
    closeBtn.addEventListener("click",(event)=>{
        finishedBox.classList.add("disappear");
        finishedListBtn.classList.remove("disappear");
        while(finishedList.hasChildNodes()){
            finishedList.removeChild(finishedList.firstChild);
        }
    });
    finishedListBtn.addEventListener("click",(event)=>{
        finishedBox.classList.remove("disappear");
        finishedListBtn.classList.add("disappear");
    });
}

//load saved finishedlist from database!!
const getFinishedListAjax= (url)=>{
    const Data=JSON.stringify({user_name:currentUser});
    const xhr=new XMLHttpRequest();
    xhr.open("post",url);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(Data);

    xhr.addEventListener("load",()=>{
        const result=JSON.parse(xhr.responseText);
        result.forEach(each=>{
            finished.push({
                text:each.topic
            });
        })
        loadFinished();
    });
}


function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const successBtn=document.createElement("button");
    const span=document.createElement("div");
    const newId=Date.now();
    delBtn.innerText="X";
    successBtn.innerText="V";
    delBtn.addEventListener("click",deleteToDo);
    successBtn.addEventListener("click",clearToDo);
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(successBtn);
    li.id=newId;
    toDoList.appendChild(li);
    const toDosObj={
        text:text,
        id:newId,
    }
    toDos.push(toDosObj);
}

//paint all todo
function loadToDos(){
    toDos.forEach(toDo=>{
        paintToDo(toDo.text);
    })
}


//load saved todolist from database!!
const getToDoListAjax= (url)=>{
    const Data=JSON.stringify({user_name:currentUser});
    const xhr=new XMLHttpRequest();
    xhr.open("post",url);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(Data);

    xhr.addEventListener("load",()=>{
        const result=JSON.parse(xhr.responseText);
        result.forEach(each=>{
            toDos.push({
                text:each.topic
            });
        })
        loadToDos();
    });
}

function init(){
    getToDoListAjax(`${AJAX_URL}gettodo`);
    initFinished();
    getFinishedListAjax(`${AJAX_URL}getfinished`);
    toDoForm.addEventListener("submit",handleSubmit);
    
}
init();
