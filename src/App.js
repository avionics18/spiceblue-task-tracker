import React from "react";
import { useSelector } from "react-redux";
import Card from "./ui/Card";
import CardBody from "./ui/CardBody";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import TaskList from "./components/TaskList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const App = () => {
    const { showTaskForm, taskToEdit } = useSelector((state) => state.tasks);

    return (
        <Card>
            <Header />
            <CardBody>
                {showTaskForm ? (
                    Object.keys(taskToEdit).length === 0 ? (
                        <AddTaskForm />
                    ) : (
                        <EditTaskForm />
                    )
                ) : (
                    <TaskList />
                )}
            </CardBody>
        </Card>
    );
};

export default App;
