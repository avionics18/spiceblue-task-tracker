import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    toggleForm,
    emptyTaskToEdit,
    updateTaskAsync,
    toggleIsLoading,
    deleteTaskAsync,
} from "../redux/taskSlice";
import { getUsersAsync } from "../redux/userSlice";
import DatePicker from "react-datepicker";
import { BiCalendar, BiTimeFive, BiTrash } from "react-icons/bi";
import ReactTooltip from "react-tooltip";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = () => {
    const dispatch = useDispatch();

    // ------ taskToEdit -------
    const { taskToEdit } = useSelector((state) => state.tasks);
    // ------ Users ---------
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);
    // ----------------------

    const [desc, setDesc] = useState(taskToEdit.task_msg);
    const [userId, setUserId] = useState(taskToEdit.user_id);
    const [onDate, setOnDate] = useState(new Date(taskToEdit.task_date));
    // converting time back to date string
    const toDateTime = moment(new Date(taskToEdit.task_date))
        .add(taskToEdit.task_time, "seconds")
        .toString();
    const [onTime, setOnTime] = useState(new Date(toDateTime));

    const showTaskAndEmptyEditTaskHandler = () => {
        dispatch(toggleForm());
        dispatch(emptyTaskToEdit());
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // form validation remains
        let timeInSeconds =
            onTime.getHours() * 3600 +
            onTime.getMinutes() * 60 +
            onTime.getSeconds();
        const task = {
            assigned_user: userId,
            task_date: moment(onDate).format("YYYY-MM-DD"),
            task_time: timeInSeconds,
            is_completed: 0,
            time_zone: onDate.getTimezoneOffset() * -60,
            task_msg: desc,
        };
        // dispatch addTaskAsync and then only show all tasks
        // till tehnshow loading animation
        dispatch(toggleIsLoading());
        dispatch(updateTaskAsync({ task, id: taskToEdit.id })).then(() => {
            dispatch(toggleIsLoading());
            showTaskAndEmptyEditTaskHandler();
        });
        setDesc("");
        setUserId("");
        setOnDate(null);
        setOnTime(null);
    };

    const deleteTaskHandler = () => {
        const ans = window.confirm(
            "Are you sure you want to delete this Task?"
        );
        if (ans) {
            dispatch(toggleIsLoading());
            dispatch(deleteTaskAsync({ id: taskToEdit.id })).then(() => {
                dispatch(toggleIsLoading());
                showTaskAndEmptyEditTaskHandler();
            });
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="p-3 bg-light-info">
            <div className="form-row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="desc" className="text-muted small">
                            Task Description
                        </label>
                        <input
                            type="text"
                            id="desc"
                            className="form-control form-control-sm"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="date" className="text-muted small">
                            Date
                        </label>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <BiCalendar />
                                </span>
                            </div>
                            <DatePicker
                                selected={onDate}
                                onChange={(date) => setOnDate(date)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label htmlFor="time" className="text-muted small">
                            Time
                        </label>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <BiTimeFive />
                                </span>
                            </div>
                            <DatePicker
                                selected={onTime}
                                onChange={(date) => setOnTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="user" className="text-muted small">
                            Assign User
                        </label>
                        <select
                            className="custom-select custom-select-sm"
                            id="user"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            <option value="">Choose...</option>
                            {users.map((u) => (
                                <option value={u.user_id} key={u.user_id}>
                                    {u.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-flex justify-content-between mt-3">
                        <div>
                            <button
                                className="btn btn-light border"
                                type="button"
                                onClick={deleteTaskHandler}
                                data-tip
                                data-for="deletingTask"
                            >
                                <BiTrash />
                            </button>
                            <ReactTooltip
                                id="deletingTask"
                                type="dark"
                                effect="solid"
                            >
                                <span>Delete Task</span>
                            </ReactTooltip>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={showTaskAndEmptyEditTaskHandler}
                            >
                                Cancel
                            </button>{" "}
                            <button
                                type="Submit"
                                className="btn btn-success px-4"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditTaskForm;
