import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLeads } from '../slices/leadSlice'
import { getAgents } from '../slices/userSlice'
import { Link } from 'react-router-dom'
import { deleteLead } from '../slices/leadSlice'
const LeadsPage = () => {
  const dispatch = useDispatch()
  const leadsData = useSelector((state) => state?.leads?.leads)
  const leadStatus = useSelector((state) => state?.leads?.status)
  const allAgents = useSelector((state) => state?.user?.allAgents)
  const [filteredData, setFilteredData] = useState(leadsData)
  const [filterdDataByAgentName, setFilteredDataByAgentName] = useState(null)
  const [filteredDataByPriority, setFilteredDataByPriority] = useState(null)
  const [filteredDataByStatus, setFilteredDataByStatus] = useState(null)

  useEffect(() => {
    if(leadsData?.length === 0 || !leadsData){
      dispatch(getAllLeads())
    }
    setFilteredData(leadsData)
  },[leadsData?.length, dispatch])

  useEffect(() => {
    if(allAgents.length === 0 || !allAgents){
      dispatch(getAgents())
    }
  },[allAgents?.length,dispatch])

 /* const handleFilter = (e) => {
    setFilteredData((prevData) => prevData.filter((data) => data?.salesAgent?.name === e.target.value)) 
    const filter = leadsData.filter((data) => data?.salesAgent?.name === e.target.value)
    setFilteredData(filter)
  } */

  useEffect(() => {
    let filter = leadsData

    if(filterdDataByAgentName){
      filter = filter.filter((data) => data?.salesAgent?.name === filterdDataByAgentName)
    }

    if(filteredDataByPriority){
      filter = filter.filter((data) => data?.priority === filteredDataByPriority)
    }

    if(filteredDataByStatus) {
      filter = filter.filter((data) => data?.status === filteredDataByStatus)
    }

    setFilteredData(filter)
  },[filterdDataByAgentName, filteredDataByPriority, filteredDataByStatus])
  
  const handleClear = () => {
    setFilteredDataByAgentName(null)
    setFilteredDataByPriority(null)
    setFilteredDataByStatus(null)
  }

  const handleDeleteLead = (leadId) => {
      dispatch(deleteLead({leadId}))
    }
  return (
    <div className='ms-5'>
      <h3 className='mt-3'>Filter</h3>
      <div className='d-flex my-3 gap-3 align-items-center'>
        <div>
          <label className='me-3'>Filter by Agent: </label>
          <select className='form-select' onChange={(e) => setFilteredDataByAgentName(e.target.value)}>
          <option default hidden>Select Any One</option>
            {allAgents?.map((agent) => <option key={agent._id} value={agent.name}>{agent.name}</option>)}
          </select>
        </div>
        <div>
          <label className='mx-3'>Filter by Priority: </label>
          <select className='form-select' onChange={(e) => setFilteredDataByPriority(e.target.value)}>
            <option default hidden>Select Any One</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>
        <div>
          <label className='mx-3'>Filter by Status: </label>
          <select className='form-select' onChange={(e) => setFilteredDataByStatus(e.target.value)}>
            <option default hidden>Select Any One</option>
            <option value='New'>New</option>
            <option value='Contacted'>Contacted</option>
            <option value='Qualified'>Qualified</option>
            <option value='Proposal Sent'>Proposal Sent</option>
            <option value='Closed'>Closed</option>
          </select>
        </div>
        <div className='d-flex align-self-end'>
        <button className='btn btn-secondary' onClick={handleClear}>Clear</button>
        </div>
      </div>
      <h4>All Leads ({filteredData.length})</h4>
    <div>
      {leadStatus === "Loading" && <p>Loading...</p>}
      <div className="d-flex gap-3 flex-wrap row">
        {filteredData?.length > 0 &&
          filteredData?.map((lead) => (
            <div key={lead._id} className="col-md-4 my-3">
              <div className="card">
                <h5 className="card-header">{lead.name}</h5>
                <div className="card-body">
                  <h5 className="card-title">{lead.salesAgent.name}</h5>
                  <div className="card-text">
                    <p>Status: {lead.status}</p>
                    <p>Priority: {lead.priority}</p>
                    <p>Source: {lead.source}</p>
                    <p>Tags: {lead.tags.join(',')}</p>
                    <p>Time To Close: {lead.timeToClose} Mins</p>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                  <Link className="btn btn-primary" to={`/leadDetails/${lead._id}`} state={{lead}}>More Details</Link>
                  <Link to='/updateLead' state={{lead}} className="btn btn-primary">Update Lead</Link>
                  <button onClick={() => handleDeleteLead(lead._id)} className="btn btn-danger">Delete Lead</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  )
}

export default LeadsPage
