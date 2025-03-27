// =========== Task Management ===========
const listOfTasks = document.getElementById("list-of-my-tasks");
const listOfArchiveTasks = document.getElementById("list-of-archive-tasks");
const addBtn = document.getElementById("add");
const progress = document.getElementById("progress");

let tasks = JSON.parse(localStorage.getItem("tasks_list")) || [];

const refreshStorage = () => localStorage.setItem("tasks_list", JSON.stringify(tasks));

const renderTasks = () => {
    let tasksList = "";
    let archiveTasksList = "";
    let completedTasksCount = 0;

    listOfTasks.innerHTML = "";

    if (tasks.length === 0) {
        listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
        return;
    }

    tasks.forEach((task) => {
        if (task.completed) completedTasksCount++;
        if (task.archived) {

            archiveTasksList += `
            <div ondblclick="handleTaskClick('${task.id}')"  class="${!task.completed ? 'bg-white' : 'bg-[#C4E1F6]'} rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${task.completed && 'text-slate-500'}">${task.title}</p>
                <div class="flex gap-2">
                    <button onclick="archive('${task.id}')" class="border bg-green-400 text-white border-[#C4E1F6] py-1 px-3 rounded shadow-sm archive-btn">unarchive</button>
                </div>
            </div>

        `;

        } else {
            tasksList += `
            <div ondblclick="handleTaskClick('${task.id}')"  class="${!task.completed ? 'bg-white' : 'bg-green-300'} rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${task.completed && 'text-slate-500'}">${task.title}</p>
                <div class="flex gap-2">
                    ${task.completed
                    ? `<button onclick="archive('${task.id}')" class="border bg-slate-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm archive-btn">archived</button>`
                    : `<button class="border bg-blue-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">edit</button><button onclick="deleteTask('${task.id}')" class="border bg-red-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">delete</button>`} 
                </div>
            </div>

        `;
        }
    });

    listOfTasks.innerHTML = tasksList;
    listOfArchiveTasks.innerHTML = archiveTasksList;
    progress.innerText = `${completedTasksCount}/${tasks.length} ~ ${Math.round((completedTasksCount * 100) / tasks.length)}%`;
};

addBtn.addEventListener("click", () => {
    const newTask = {
        id: Date.now(),
        title: prompt("Title of the task:"),
        created_at: Date.now(),
        updated_at: Date.now(),
        completed: false,
        archived: false
    };

    !!newTask.title ? tasks.push(newTask) : alert("Should be real title!");

    refreshStorage();
    renderTasks();
});

const handleTaskClick = (id) => {
    if (confirm("Are you sure?")) {
        tasks = tasks.map(task => {
            if (task.id == id) {
                task.completed = !task.completed;
            };

            return task;
        });

        refreshStorage();
        renderTasks();
    }
};

const archive = (id) => {
    if (confirm("Are you sure?")) {
        tasks = tasks.map(task => {
            if (task.id == id) {
                task.archived = !task.archived
            };

            return task;
        });

        refreshStorage();
        renderTasks();
    }
};

const deleteTask = (id) => {
    if (confirm("Are you sure?")) {
        for (let i = 0; i < tasks.length; i++) {
            if (id == tasks[i].id) {
                tasks.splice(i, 1);
                break;
            }
        }
    }
    refreshStorage();
    renderTasks();
};

renderTasks();
