// 유저가 값을 입력
// + 버튼을 누르면, 할 일이 추가
// delete 버튼을 누르면, 할 일이 삭제
// check 버튼을 누르면, 할 일이 끝나면서 밑줄
// 1. check 버튼을 클릭하는 순간 isComplete를 false에서 true
// 2. true이면 끝난 걸로 간주하고 밑줄
//    false이면 안 끝난 걸로 간주하고 그대로
// 진행중 또는 완료 탭을 누르면, 언더바가 이동
// 완료 탭은 끝난 아이템만, 진행중 탭은 진행 중인 아이템만 보임
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = []
let filterList = []
let specialList = []
let mode = 'all'
addButton.addEventListener("click", addTask)
taskInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        addTask();
    }
})

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event);})
}

tabs.forEach(tab => tab.addEventListener("click", (e) => lineIndicator(e)))

function addTask(){
    if(taskInput.value == ''){
        alert("공백 불가합니다. 내용을 입력해주세요")
        return;
    }
    let task = {
        id : randomIDGenerate(),
        timeCreate : new Date(),
        taskContent : taskInput.value,
        isComplete : false,
        isSpecial : false
    }
    taskList.push(task)
    console.log(taskList)
    render()
    taskInput.value = ""
}

function render(){
    // 내가 선택한 탭에 따라 리스트를 달리 보여준다.
    let list = []
    if(mode === "all"){
        // all taskList
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        // ongoing & done filterList
        list = filterList;
    }
    let resultHTML = ''
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color: gainsboro;">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>${(list[i].timeCreate).toLocaleString()}</div>
                    <div>
                        <i class="fa-solid fa-rotate-left" onclick="toggleComplete('${list[i].id}')" style="margin-right:10px; color:gray;"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')" style="margin-right:10px; color:red"></i>
                        <i class="fa-regular fa-star" onclick="specialTask('${list[i].id}')" style="margin-right:10px; style="color:rgb(208, 215, 108)"></i>
                    </div>
                </div>`
        } else{
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>${(list[i].timeCreate).toLocaleString()}</div>
                    <div>
                        <i class="fa-solid fa-check" onclick="toggleComplete('${list[i].id}')" style="margin-right:10px; color:green"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${list[i].id}')" style="margin-right:10px; color:red"></i>
                        <i class="fa-regular fa-star" onclick="specialTask('${list[i].id}')" style="color:rgb(208, 215, 108)"></i>
                    </div>
                </div>`
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function specialRender(){
    let resultHTML = ''
    for(let i = 0; i < specialList.length; i++){
        resultHTML += `<div class="task">
                    <div>${specialList[i].taskContent}</div>
                    <div>${(specialList[i].timeCreate).toLocaleString()}</div>
                    <div>
                        <i class="fa-solid fa-check" onclick="toggleComplete('${specialList[i].id}')" style="margin-right:10px; color:green"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${specialList[i].id}')" style="margin-right:10px; color:red"></i>
                        <i class="fa-regular fa-star" onclick="specialTask('${specialList[i].id}')" style="color:rgb(208, 215, 108)"></i>
                    </div>
                </div>`
        
    }
    document.getElementById("special-board").innerHTML = resultHTML
}

function toggleComplete(id){
    let list = []
    if(mode === "all"){
        // all taskList
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        // ongoing & done filterList
        list = filterList;
    }
    for(let i = 0; i < list.length; i++){
        if(list[i].id == id){
            list[i].isComplete = !list[i].isComplete;
            break;
        }
    }
    for(let i = 0; i < filterList.length; i++){
        if(filterList[i].id == id){
            if(mode === "ongoing" && list[i].isComplete == true){
                filterList.splice(i, 1);
                break;
            } else if(mode === "done" && list[i].isComplete == false){
                filterList.splice(i, 1);
                break;
            }
        }
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break;
        }
    }

    for(let i = 0; i < filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i, 1);
            break;
        }
    }

    for(let i = 0; i < specialList.length; i++){
        if(specialList[i].id == id){
            specialList.splice(i, 1);
            break;
        }
    }
    render();
    specialRender();
}

function specialTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id === id){
            taskList[i].isSpecial = !taskList[i].isSpecial;
            if(taskList[i].isSpecial){
                specialList.push(taskList[i])

            }else{
                for(let i = 0; i < specialList.length; i++){
                    if(specialList[i].id === id)
                        specialList.splice(i, 1);
                }          
            }
            break;
        }
    }
    specialRender();
}

function filter(event){
    mode = event.target.id;
    filterList = []
    if(mode == "all"){
        // 전체 리스트를 보여준다.
        render()

    } else if(mode == "ongoing"){
        // 진행 중인 아이템을 보여준다. (task.isComplete == false)
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
    } else if(mode == "done"){
        // 끝난 아이템을 보여준다. (task.isComplete == true)
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function lineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px"
    underLine.style.width = e.currentTarget.offsetWidth + "px"
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px"
}