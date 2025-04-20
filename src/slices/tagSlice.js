import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    tags: [],
    error: null,
    status: "idle"
}

export const getTags = createAsyncThunk('TAGS', async() => {
    const response = await axios.get('http://localhost:5000/tag/tags', {withCredentials: true})
    console.log(response.data)
    return response.data
})

const tagSlice = createSlice({
    name: "TAGS",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTags.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(getTags.fulfilled, (state,action) => {
            state.status = "successfull"
            state.tags = action.payload.tags
        })
        .addCase(getTags.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default tagSlice.reducer