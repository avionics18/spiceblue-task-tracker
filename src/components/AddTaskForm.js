import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, toggleForm } from "../redux/taskSlice";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";
import { BiCalendar, BiTimeFive } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";

const AddTaskForm = () => {
    const [desc, setDesc] = useState("");
    const [user, setUser] = useState("");
    const [onDate, setOnDate] = useState(null);
    const [onTime, setOnTime] = useState(null);

    const dispatch = useDispatch();

    const showTaskHandler = () => {
        dispatch(toggleForm());
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // form validation remains
        const newTask = {
            id: uuid(),
            desc,
            user,
            onDate: onDate.toString(),
            onTime: onTime.toString(),
        };
        dispatch(addTask(newTask));
        setDesc("");
        setUser("");
        setOnDate(null);
        setOnTime(null);
        showTaskHandler();
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
                    <div className="text-right mt-3">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={showTaskHandler}
                        >
                            Cancel
                        </button>{" "}
                        <button type="Submit" className="btn btn-success px-4">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddTaskForm;
