import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { getTasksAsync, toggleIsLoading } from "../redux/taskSlice";

const TaskList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // show loading till all tasks are fetched
        dispatch(toggleIsLoading());
        dispatch(getTasksAsync()).then(() => dispatch(toggleIsLoading()));
    }, [dispatch]);
    const { allTasks } = useSelector((state) => state.tasks);

    let taskItems;
    if (allTasks && allTasks.length) {
        taskItems = allTasks.map((task) => {
            return <TaskItem key={task.id} task={task} />;
        });
    } else {
        taskItems = null;
    }

    return <div id="task-list">{taskItems}</div>;
};

export default TaskList;
