function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button onclick="deleteTask(this)">X</button>`;

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}

function toggleTask(task) {
    task.classList.toggle("completed");
}