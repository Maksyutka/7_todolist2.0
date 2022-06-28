let newTasksArray = [];
let progressTasksArray = [];
let doneTasksArray = [];
let taskName;

const updateStorage = () => {
	localStorage.setItem("newTasksArray", JSON.stringify(newTasksArray));
	localStorage.setItem("progressTasksArray", JSON.stringify(progressTasksArray));
	localStorage.setItem("doneTasksArray", JSON.stringify(doneTasksArray));
};

const pushNewTask = () => {
	taskName = inputSelector.value;
	taskContent = descriptionSelector.value;

	if (taskName.trim() != "" && taskContent.trim() != "") {
		inputSelector.value = "";
		descriptionSelector.value = "";
		newTasksArray.push({
			name: taskName,
			content: taskContent,
		});

		updateStorage();
		updateNewTasks();
	}
};

const updateNewTasks = () => {
	newTasksWrapperSelector.innerHTML = "";
	newTasksArray.forEach((name, index) => {
		newTasksWrapperSelector.innerHTML += generateTaskTemplate(name, index, "new");
	});
};

const updateProgressTasks = () => {
	progressTasksWrapperSelector.innerHTML = "";
	progressTasksArray.forEach((name, index) => {
		progressTasksWrapperSelector.innerHTML += generateTaskTemplate(name, index, "progress");
	});
};

const updateDoneTasks = () => {
	doneTasksWrapperSelector.innerHTML = "";
	doneTasksArray.forEach((name, index) => {
		doneTasksWrapperSelector.innerHTML += generateTaskTemplate(name, index, "done");
	});
};

const deleteTask = (index, status) => {
	switch (status) {
		case "new":
			newTasksArray.splice(index, 1);
			updateNewTasks();
			break;
		case "progress":
			progressTasksArray.splice(index, 1);
			updateProgressTasks();
			break;
		case "done":
			doneTasksArray.splice(index, 1);
			updateDoneTasks();
			break;
	}
};

document.body.addEventListener("change", (event) => {
	const target = event.target;
	const status = target.dataset.status;
	if (target.classList.contains("task-status") && target.value == "progress") {
		const index = target.dataset.index;

		switch (status) {
			case "new":
				progressTasksArray.push(newTasksArray[index]);
				newTasksArray.splice(index, 1);
				updateNewTasks();
				break;
			case "done":
				progressTasksArray.push(doneTasksArray[index]);
				doneTasksArray.splice(index, 1);
				updateDoneTasks();
				break;
		}

		updateProgressTasks();
		updateStorage();
	} else if (target.classList.contains("task-status") && target.value == "done") {
		const index = target.dataset.index;

		switch (status) {
			case "new":
				doneTasksArray.push(newTasksArray[index]);
				newTasksArray.splice(index, 1);
				updateNewTasks();
				break;
			case "progress":
				doneTasksArray.push(progressTasksArray[index]);
				progressTasksArray.splice(index, 1);
				updateProgressTasks();
				break;
		}

		updateDoneTasks();
		updateStorage();
	} else if (target.classList.contains("task-status") && target.value == "new") {
		const index = target.dataset.index;

		switch (status) {
			case "done":
				newTasksArray.push(doneTasksArray[index]);
				doneTasksArray.splice(index, 1);
				updateDoneTasks();
				break;
			case "progress":
				newTasksArray.push(progressTasksArray[index]);
				progressTasksArray.splice(index, 1);
				updateProgressTasks();
				break;
		}

		updateNewTasks();
		updateStorage();
	}
});

!localStorage.newTasksArray ? (newTasksArray = []) : (newTasksArray = JSON.parse(localStorage.getItem("newTasksArray")));
!localStorage.progressTasksArray ? (progressTasksArray = []) : (progressTasksArray = JSON.parse(localStorage.getItem("progressTasksArray")));
!localStorage.doneTasksArray ? (doneTasksArray = []) : (doneTasksArray = JSON.parse(localStorage.getItem("doneTasksArray")));

updateNewTasks();
updateProgressTasks();
updateDoneTasks();
