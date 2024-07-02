// 유저가 값을 입력
// + 버튼을 누르면, 할 일이 추가
// delete 버튼을 누르면, 할 일이 삭제
// check 버튼을 누르면, 할 일이 끝나면서 밑줄
// 진행중 또는 완료 탭을 누르면, 언더바가 이동
// 완료 탭은 끝난 아이템만, 진행중 탭은 진행 중인 아이템만 보임
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴 

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask)

function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent)
    render()
}

function render(){
    let resultHTML = ''
    for(let i = 0; i < taskList.length; i++){
        resultHTML += `<div class="task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button>Check</button>
                        <button>Delete</button>
                    </div>
                </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML
}