import { configureStore } from "@reduxjs/toolkit";
import tasks from "./taskSlice";

export default configureStore({
    reducer: {
        tasks,
    },
});
