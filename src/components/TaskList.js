import React from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

const TaskList = () => {
    const { allTasks } = useSelector((state) => state.tasks);

    let taskItems;
    if (allTasks.length) {
        taskItems = allTasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
        });
    } else {
        taskItems = null;
    }

    return <div id="task-list">{taskItems}</div>;
};

export default TaskList;
