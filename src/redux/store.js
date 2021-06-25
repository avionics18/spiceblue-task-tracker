import { configureStore } from "@reduxjs/toolkit";
import tasks from "./taskSlice";
import users from "./userSlice";

export default configureStore({
    reducer: {
        tasks,
        users,
    },
});
