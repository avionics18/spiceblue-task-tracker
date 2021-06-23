import React from "react";
import { useDispatch } from "react-redux";
import { addTaskToEdit, toggleForm } from "../redux/taskSlice";
import { MdEdit, MdNotificationsPaused, MdCheck } from "react-icons/md";

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();

    const formatDate = (d) => {
        const date = new Date(d);
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
            "/"
        );
    };

    const formattedDate = formatDate(task.onDate);

    const editTaskHandler = () => {
        dispatch(addTaskToEdit(task));
        dispatch(toggleForm());
    };

    return (
        <div className="media align-items-center m-3 p-2 border shadow-sm">
            <img
                className="mr-2 shadow rounded"
                src="https://image.flaticon.com/icons/png/512/168/168723.png"
                width="40"
                alt="user icon"
            />
            <div className="media-body">
                <h5 className="small font-weight-bold mb-0">{task.desc}</h5>
                <p className="text-danger m-0 small">{formattedDate}</p>
            </div>
            <div className="media-action ml-3">
                <button
                    className="btn btn-light btn-sm border"
                    onClick={editTaskHandler}
                >
                    <MdEdit />
                </button>
                <div className="btn-group ml-2">
                    <button className="btn btn-light btn-sm border">
                        <MdNotificationsPaused />
                    </button>
                    <button className="btn btn-light btn-sm border">
                        <MdCheck />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
