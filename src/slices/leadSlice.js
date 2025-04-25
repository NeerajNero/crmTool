import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    leads : [],
    currentLead : null,
    agentLeads: [],
    userId: localStorage.getItem('userId') || null,
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
    return response.data
})

export const closeLead = createAsyncThunk('/closeLead', async({leadId, status}) => {
    const response = await axios.patch(`http://localhost:5000/lead/closeLead/${leadId}`, {status}, {withCredentials: true})
    console.log(response.data)
    return response.data
})

export const updateLead = createAsyncThunk('/updateLead', async({leadId, leadFormData}) => {
    const response = await axios.put(`http://localhost:5000/lead/updateLead/${leadId}`, {leadFormData}, {withCredentials: true})
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
            if(action.payload.lead.salesAgent._id === state.userId){
                state.agentLeads.push(action.payload.lead)
            }
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
            
            const findLead = state.agentLeads.find((lead) => lead._id === action.payload.leadId)
            if(findLead){
                state.agentLeads = state.agentLeads.filter((lead) => lead._id !== action.payload.leadId)
            }
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
        builder
        .addCase(closeLead.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(closeLead.fulfilled, (state,action) => {
            const {lead} = action.payload
            const findLead = state.agentLeads.find((stateLead) => stateLead._id ===  lead._id)
            if(findLead){
                findLead.status = "Closed"
            }
            state.status = "successfull"
        })
        .addCase(closeLead.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
        builder
        .addCase(updateLead.pending, (state) => {
            state.status = "Loading"
        })
        .addCase(updateLead.fulfilled, (state,action) => {
            const {lead} = action.payload
            const findLead = state.leads.find((stateLead) => stateLead?._id === lead?._id)
            findLead.name = lead.name
            findLead.source = lead.source
            findLead.salesAgent = lead.salesAgent
            findLead.status = lead.status
            findLead.tags = lead.tags
            findLead.timeToClose = lead.timeToClose
            findLead.priority = lead.priority

            if(state.agentLeads._id === lead.salesAgent._id){
                const findAgentLead = state.agentLeads.find((stateLead) => stateLead?._id === lead?.salesAgent._id)
                findAgentLead.name = lead.name
                findAgentLead.source = lead.source
                findAgentLead.salesAgent = lead.salesAgent
                findAgentLead.status = lead.status
                findAgentLead.tags = lead.tags
                findAgentLead.timeToClose = lead.timeToClose
                findAgentLead.priority = lead.priority
            }
            
            state.status = "successfull"
        })
        .addCase(updateLead.rejected, (state,action) => {
            state.status = "Failed",
            state.error = action.error.message
        })
    }
})

export default leadSlice.reducer