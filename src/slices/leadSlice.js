import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    leads : [],
    currentLead : null,
    agentLeads: [],
    error: null,
    status: "idle"
}

export const getAllLeads = createAsyncThunk('getLeads', async() => {
    const response = await axios.get('http://localhost:5000/lead/getLeads', {withCredentials: true})
    return response.data
})

export const createLead = createAsyncThunk('Create new Lead', async({name,source,salesAgent,status,tags,timeToClose,priority}) => {
    const response = await axios.post('http://localhost:5000/lead/createLead',{name,source,salesAgent,status,tags,timeToClose,priority}, {withCredentials: true})
    return response.data
})

export const getLeadById = createAsyncThunk('get lead by id', async({leadId}) => {
    const response = await axios.get(`http://localhost:5000/lead/getLeadById/${leadId}`, {withCredentials: true})
    return response.data
})

export const deleteLead = createAsyncThunk('/DeleteLead', async({leadId}) => {
    const response = await axios.delete(`http://localhost:5000/lead/deleteLead/${leadId}`, {withCredentials: true})
    console.log(response.data)
    return response.data
})

export const getLeadsByAgentId = createAsyncThunk('/GetLeadsByAgent', async({agentId}) => {
    const response = await axios.get(`http://localhost:5000/lead/getLeadsByAgent/${agentId}`, {withCredentials: true})
    console.log(response.data)
    return response.data
})

const leadSlice = createSlice({
    name: 'LEADS',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllLeads.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(getAllLeads.fulfilled, (state,action) => {
            state.status = "successfull"
            state.leads = action.payload.leads
        })
        .addCase(getAllLeads.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(createLead.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(createLead.fulfilled, (state,action) => {
            state.status = "successfull"
            state.leads.push(action.payload.lead)
        })
        .addCase(createLead.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(getLeadById.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(getLeadById.fulfilled, (state,action) => {
            state.status = "successfull"
            state.currentLead = action.payload.lead
        })
        .addCase(getLeadById.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(deleteLead.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(deleteLead.fulfilled, (state,action) => {
            state.status = "successfull"
            state.leads = state.leads.filter((lead) => lead._id !== action.payload.leadId)
        })
        .addCase(deleteLead.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(getLeadsByAgentId.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(getLeadsByAgentId.fulfilled, (state,action) => {
            state.status = "successfull"
            state.agentLeads = action.payload.leads
        })
        .addCase(getLeadsByAgentId.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
    }
})

export default leadSlice.reducer