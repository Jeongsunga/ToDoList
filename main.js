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
let taskList = []
addButton.addEventListener("click", addTask)

function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task)
    console.log(taskList)
    render()
    taskInput.value = ""
}

function render(){
    let resultHTML = ''
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color: gainsboro;">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <i class="fa-solid fa-rotate-left" onclick="toggleComplete('${taskList[i].id}')" style="margin-right:10px; color:gray;"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${taskList[i].id}')" style="color:red"></i>
                    </div>
                </div>`
        } else{
            resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <i class="fa-solid fa-check" onclick="toggleComplete('${taskList[i].id}')" style="margin-right:10px; color:green"></i>
                        <i class="fa-solid fa-trash-can" onclick="deleteTask('${taskList[i].id}')" style="color:red"></i>
                    </div>
                </div>`
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
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
    render();
}