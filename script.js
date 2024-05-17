function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    if (droppedElement) {
        ev.currentTarget.appendChild(droppedElement);
    }
}

function toggleTaskForm() {
    const newTaskBlock = document.getElementById("create-new-task-block");
    if (newTaskBlock.style.display === "none" || newTaskBlock.style.display === "") {
        newTaskBlock.style.display = "block";
    } else {
        newTaskBlock.style.display = "none";
    }
}

function saveTask() {
    const taskName = document.getElementById("task-name").value.trim();
    const taskDescription = document.getElementById("task-description").value.trim();
    const taskStatus = document.getElementById("task-status").value;

    if (!taskName || !taskDescription) {
        alert("Please fill in both Task and Description fields.");
        return;
    }

    const targetColumn = document.getElementById(taskStatus);
    if (targetColumn) {
        const taskId = taskName.toLowerCase().replace(/\s+/g, '-');
        targetColumn.innerHTML += `
            <div class="task" id="${taskId}" draggable="true" ondragstart="drag(event)">
                <span>${taskName}</span>
                <p>${taskDescription}</p>
            </div>
        `;
        toggleTaskForm(); // Hide the task creation form after saving
    }
}
