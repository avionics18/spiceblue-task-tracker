import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsersAsync = createAsyncThunk(
    "users/getUsersAsync",
    async () => {
        const res = await fetch("https://stage.api.sloovi.com/team", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        });
        if (res.ok) {
            const {
                results: { data },
            } = await res.json();
            // GET Users having "user_status": "accepted"
            const users = data.filter((d) => d.user_status === "accepted");
            return { users };
        } else {
            console.log("Oops... Users Data couldn't fetched!");
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getUsersAsync.fulfilled]: (state, action) => {
            return action.payload.users;
        },
    },
});

export default userSlice.reducer;
