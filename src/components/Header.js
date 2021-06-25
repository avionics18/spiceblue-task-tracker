import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleForm, emptyTaskToEdit } from "../redux/taskSlice";
import { BiPlus } from "react-icons/bi";
import ReactTooltip from "react-tooltip";

const Header = () => {
    const { allTasks, taskToEdit } = useSelector((state) => state.tasks);

    const dispatch = useDispatch();

    const showTaskHandler = () => {
        dispatch(toggleForm());
        if (Object.keys(taskToEdit).length !== 0) {
            dispatch(emptyTaskToEdit());
        }
    };

    return (
        <div className="card-header d-flex justify-content-between align-items-center p-0">
            <div className="pl-3">
                <span className="text-dark font-weight-bold">TASKS</span>
                <span className="text-muted ml-3">
                    {allTasks ? allTasks.length : 0}
                </span>
            </div>
            <div className="border-left">
                <button
                    className="btn btn-light rounded-0"
                    onClick={showTaskHandler}
                    data-tip
                    data-for="addingTask"
                >
                    <BiPlus />
                </button>
                <ReactTooltip id="addingTask" type="dark" effect="solid">
                    <span>New Task</span>
                </ReactTooltip>
            </div>
        </div>
    );
};

export default Header;
