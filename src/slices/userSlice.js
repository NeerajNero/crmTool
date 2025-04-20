import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    userData: {},
    currentUser: null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    userId: localStorage.getItem("userId") || null,
    allAgents: [],
    error: null,
    status: 'idle'
}

export const signup = createAsyncThunk('signup', async({name,email,password}) => {
    const {data} = await axios.post('http://localhost:5000/api/signup', {name,email,password}, {withCredentials: true})
    console.log(data)
    return data
})

export const login = createAsyncThunk('login', async({email,password}) => {
    const {data} = await axios.post('http://localhost:5000/api/login', {email,password}, {withCredentials: true})
    console.log(data)
    return data
})

export const getAgents = createAsyncThunk('GetOnlyAgents', async() => {
    const response = await axios.get('http://localhost:5000/api/agents', {withCredentials: true})
    console.log(response.data)
    return response.data
})

export const getCurrentUser = createAsyncThunk('getCurrentUser', async({userID}) => {
    const response = await axios.get(`http://localhost:5000/api/currentUser/${userID}`, {withCredentials: true})
    console.log(response.data)
    return response.data
}) 

export const logout = createAsyncThunk('/Logout', async() => {
    const response = await axios.post('http://localhost:5000/api/logout',{}, {withCredentials:true})
    return response.data
})

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder
        .addCase(signup.pending, (state) => {
            state.status = "loading"
        })
        .addCase(signup.fulfilled, (state,action) => {
            state.status = "successful"
            localStorage.setItem('userId', action.payload.user._id)
            state.currentUser = action.payload.user
        })
        .addCase(signup.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(login.pending, (state) => {
            state.status = "loading"
        })
        .addCase(login.fulfilled, (state,action) => {
            state.status = "successful"
            localStorage.setItem('userId', action.payload.user._id)
            state.currentUser = action.payload.user
        })
        .addCase(login.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(getAgents.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getAgents.fulfilled, (state,action) => {
            state.status = "successful"
            state.allAgents = action.payload.agents
        })
        .addCase(getAgents.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(getCurrentUser.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getCurrentUser.fulfilled, (state,action) => {
            state.status = "successful"
            state.currentUser = action.payload.user
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
        builder
        .addCase(logout.pending, (state) => {
            state.status = "loading"
        })
        .addCase(logout.fulfilled, (state,action) => {
            state.status = "successful"
            state.isLoggedIn = false
            state.userId = null
        })
        .addCase(logout.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer