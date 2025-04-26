import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    comments : [],
    status: "idle",
    error: null
}

export const addComment = createAsyncThunk('/addComment', async({lead,author,commentText}) => {
    const response = await axios.post('https://my-crm-backend-gamma.vercel.app/comment/addComment', {lead,author,commentText}, {withCredentials: true})
    return response.data
})

export const getComments = createAsyncThunk('/getComments', async({leadId}) => {
    const response = await axios.get(`https://my-crm-backend-gamma.vercel.app/comment/getAllComments/${leadId}`, {withCredentials: true})
    return response.data
})

const commentSlice = createSlice({
    name: 'COMMENT',
    initialState,
    reducers: {
        resetComments: (state,action) => {
            state.comments = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addComment.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(addComment.fulfilled, (state,action) => {
            state.status = "successfull"
            state.comments.push(action.payload.comment)
        })
        .addCase(addComment.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(getComments.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(getComments.fulfilled, (state,action) => {
            state.status = "successfull"
            state.comments = action.payload.comments
        })
        .addCase(getComments.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
    }
})

export const {resetComments} = commentSlice.actions

export default commentSlice.reducer