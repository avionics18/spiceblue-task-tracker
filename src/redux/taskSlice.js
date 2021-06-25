import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTaskAsync = createAsyncThunk(
    "tasks/addTaskAsync",
    async (payload) => {
        const res = await fetch(
            "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
            {
                method: "POST",
                body: JSON.stringify(payload.task),
                headers: {
                    Authorization:
                        "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }
        );
        if (res.ok) {
            const { results } = await res.json();
            console.log(results);
            return { data: results };
        } else {
            console.log("Oops...Task wasn't added!");
        }
    }
);

export const getTasksAsync = createAsyncThunk(
    "tasks/getTasksAsync",
    async () => {
        const res = await fetch(
            "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }
        );
        if (res.ok) {
            const { results } = await res.json();
            return { data: results };
        } else {
            console.log("Oops...Tasks weren't fetched!");
        }
    }
);

export const updateTaskAsync = createAsyncThunk(
    "tasks/updateTaskAsync",
    async (payload) => {
        const res = await fetch(
            `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${payload.id}`,
            {
                method: "PUT",
                body: JSON.stringify(payload.task),
                headers: {
                    Authorization:
                        "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }
        );
        if (res.ok) {
            const { results } = await res.json();
            console.log(results);
            return { data: results };
        } else {
            console.log("Oops...Task wasn't Updated!");
        }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    "tasks/deleteTaskAsync",
    async (payload) => {
        const res = await fetch(
            `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${payload.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }
        );
        if (res.ok) {
            const { results } = await res.json();
            console.log(results);
            return { data: results };
        } else {
            console.log("Oops...Task wasn't deleted!");
        }
    }
);

export const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        allTasks: [],
        taskToEdit: {},
        showTaskForm: false,
        isLoading: false,
    },
    reducers: {
        addTask: (state, action) => {
            state.allTasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const index = state.allTasks.findIndex(
                (task) => task.id === action.payload.id
            );
            state.allTasks[index] = action.payload;
        },
        deleteTask: (state, action) => {
            const newAllTasks = state.allTasks.filter(
                (task) => task.id !== action.payload.id
            );
            state.allTasks = newAllTasks;
        },
        addTaskToEdit: (state, action) => {
            state.taskToEdit = action.payload;
        },
        emptyTaskToEdit: (state, action) => {
            state.taskToEdit = {};
        },
        toggleForm: (state, action) => {
            state.showTaskForm = !state.showTaskForm;
        },
        toggleIsLoading: (state, action) => {
            state.isLoading = !state.isLoading;
        },
    },
    extraReducers: {
        [addTaskAsync.fulfilled]: (state, action) => {
            state.allTasks.push(action.payload.data);
        },
        [getTasksAsync.fulfilled]: (state, action) => {
            state.allTasks = action.payload.data;
        },
        [updateTaskAsync.fulfilled]: (state, action) => {
            const index = state.allTasks.findIndex(
                (task) => task.id === action.payload.data.id
            );
            state.allTasks[index] = action.payload.data;
        },
        [deleteTaskAsync.fulfilled]: (state, action) => {
            const newAllTasks = state.allTasks.filter(
                (task) => task.id !== action.payload.data.id
            );
            state.allTasks = newAllTasks;
        },
    },
});

// addTask action automatically generated by createSlice
// produces actions with the same name as our reducer
export const {
    addTaskToEdit,
    emptyTaskToEdit,
    toggleForm,
    toggleIsLoading,
} = taskSlice.actions;
// reducer automatically generated by createSlice
// contains all our reducers
export default taskSlice.reducer;
