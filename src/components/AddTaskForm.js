import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm, addTaskAsync, toggleIsLoading } from "../redux/taskSlice";
import { getUsersAsync } from "../redux/userSlice";
import DatePicker from "react-datepicker";
import moment from "moment";
import { BiCalendar, BiTimeFive } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";

const AddTaskForm = () => {
    const [desc, setDesc] = useState("");
    const [userId, setUserId] = useState("");
    const [onDate, setOnDate] = useState(null);
    const [onTime, setOnTime] = useState(null);

    const dispatch = useDispatch();

    // ------ Users ---------
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);
    // ----------------------

    const showTaskHandler = () => {
        dispatch(toggleForm());
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // form validation remains
        let timeInSeconds =
            onTime.getHours() * 3600 +
            onTime.getMinutes() * 60 +
            onTime.getSeconds();
        console.log(timeInSeconds);
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
        dispatch(addTaskAsync({ task })).then(() => {
            dispatch(toggleIsLoading());
            showTaskHandler();
        });
        setDesc("");
        setUserId("");
        setOnDate(null);
        setOnTime(null);
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
