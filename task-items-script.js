const generateTaskTemplate = (newTask, index, status) => {
	return `
	<div class="todo-list__item">
		<div class="todo-list__upper-block">
			<p class="todo-list__item-name">
			<span class="todo-list__item-index">${index + 1}.</span>
			${newTask.name}
			</p>
			<select name="task-status" class="task-status" data-index="${index}" data-status="${status}">
				<option hidden value="current">${status}</option>
				<option value="new">New</option>
				<option value="progress">In progress</option>
				<option value="done">Done</option>
			</select>
			<button class="todo-list__item-delete" data-index="${index}" data-status="${status}"></button>
		</div>
		<div class="todo-list__lower-block">
			<p class="todo-list__lower-content">
				<span class="todo-list__lower-explanation">Description of your task:</span> ${newTask.content}
			</p>
		</div>
	</div>
	`;
};

document.body.addEventListener("click", (event) => {
	const target = event.target;
	if (target.classList.contains("todo-list__item-delete")) {
		const index = target.dataset.index;
		const status = target.dataset.status;
		deleteTask(index, status);

		updateStorage();
		updateNewTasks();
	}
});

addBtnSelector.onclick = () => {
	pushNewTask();
};
