import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    toggleForm,
    updateTask,
    emptyTaskToEdit,
    deleteTask,
} from "../redux/taskSlice";
import DatePicker from "react-datepicker";
import { BiCalendar, BiTimeFive, BiTrash } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";

const EditTaskForm = () => {
    const { taskToEdit } = useSelector((state) => state.tasks);

    const [desc, setDesc] = useState(taskToEdit.desc);
    const [user, setUser] = useState(taskToEdit.user);
    const [onDate, setOnDate] = useState(new Date(taskToEdit.onDate));
    const [onTime, setOnTime] = useState(new Date(taskToEdit.onTime));

    const dispatch = useDispatch();

    const showTaskAndNoEditTaskHandler = () => {
        dispatch(toggleForm());
        dispatch(emptyTaskToEdit());
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // form validation remains
        const updatedTask = {
            id: taskToEdit.id,
            desc,
            user,
            onDate: onDate.toString(),
            onTime: onTime.toString(),
        };
        dispatch(updateTask(updatedTask));
        setDesc("");
        setUser("");
        setOnDate(null);
        setOnTime(null);
        showTaskAndNoEditTaskHandler();
    };

    const deleteTaskHandler = () => {
        dispatch(deleteTask({ id: taskToEdit.id }));
        showTaskAndNoEditTaskHandler();
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
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            <option value="">Choose...</option>
                            <option value="Prateek">Prateek</option>
                            <option value="Anvita">Anvita</option>
                            <option value="Sabeel">Sabeel</option>
                            <option value="Karthik">Karthik</option>
                            <option value="Shamita">Shamita</option>
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
                            >
                                <BiTrash />
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={showTaskAndNoEditTaskHandler}
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
