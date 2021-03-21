const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector('.js-toDoList');
const TODOS_LS="toDos";
const FINISHED_LS="finishedToDos";

let toDos=[];

let finished=[];

function saveFinished(){
    localStorage.setItem(FINISHED_LS,JSON.stringify(finished));
}

function clearToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    const inner=li.innerText;
    const text=inner.slice(0,inner.length-2);

    finished.push(text);
    deleteToDo(event);
    saveFinished();
}

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;

    //html dom 제거
    toDoList.removeChild(li);

    //제거하려는 li의 id와 다른것들 필터
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);
    });

    //갱신후 저장
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
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
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => {
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}
init();
