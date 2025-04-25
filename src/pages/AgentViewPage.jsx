import { useDispatch, useSelector } from "react-redux"
import { getLeadsByAgentId } from "../slices/leadSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { closeLead } from "../slices/leadSlice"
const AgentViewPage = () => {
    const [filteredDataByStatus, setFilteredDataByStatus] = useState(null)
    const [filteredDataByPriority, setFilteredDataByPriority] = useState(null)
    const [leads, setLeads] = useState(null)
    const stateLeads = useSelector((state) => state?.leads?.agentLeads)
    const status = useSelector((state) => state?.leads?.status)
    const dispatch = useDispatch()

    useEffect(() => {
        const agentId = localStorage.getItem('userId')
        if(stateLeads?.length === 0 || !stateLeads && agentId){
            dispatch(getLeadsByAgentId({agentId}))
        }
        setLeads(stateLeads)
    },[dispatch, stateLeads?.length])
      
    useEffect(() => {
      let filteredLeads = stateLeads
      
      if(filteredDataByPriority){
        filteredLeads = filteredLeads.filter((lead) => lead.priority === filteredDataByPriority)
        console.log(filteredDataByPriority)
        console.log(filteredLeads)
      }

      if(filteredDataByStatus){
        filteredLeads = filteredLeads.filter((lead) => lead.status === filteredDataByStatus)
        console.log(filteredDataByPriority)
        console.log(filteredLeads)
      }

      setLeads(filteredLeads)
    },[filteredDataByPriority, filteredDataByStatus])

    const handleCloseLead = (lead) => {
      const status = "Closed"
      dispatch(closeLead({leadId: lead._id,status})).unwrap().then(() => console.log("status updated"))
    }

    const handleClear = () => {
      setFilteredDataByPriority(null)
      setFilteredDataByStatus(null)
    }
    console.log(stateLeads)
    console.log(leads)
  return (
    <div className="ms-5">
        <div className="mt-3">
            <h3>Filter</h3>
        <div className="d-flex gap-3">
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
            <div>
            <label className='mx-3'>Filter by Priority: </label>
          <select className='form-select' onChange={(e) => setFilteredDataByPriority(e.target.value)}>
            <option default hidden>Select Any One</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
            </div>
            <div className="d-flex align-self-end">
            <button onClick={handleClear} className="btn btn-secondary">clear</button>
            </div>
        </div>
        </div>
        <hr/>
        <div className="my-3">
        <h3>All Leads ({leads?.length})</h3>
            <div className="my-3">
                {status === "Loading" && <p>Loading...</p>}
                <div className="list-group col-md-5 ">
                {leads?.map((lead) => <div key={lead._id} className="list-group-item">
                        <p><strong>Name: </strong>{lead.name}</p>
                        <p><strong>Priority: </strong>{lead.priority}</p>
                        <p><strong>Source: </strong>{lead.source}</p>
                        <p><strong>Status: </strong>{lead.status}</p>
                        <p><strong>Time To Complete: </strong>{lead.timeToClose} Mins</p>
                        <Link className="btn btn-primary" to={`/leadDetails/${lead._id}`} state={{lead}}>More Details</Link>
                        {lead?.status !== "Closed" && <button onClick={() => handleCloseLead(lead)} className="btn btn-secondary mx-3">Mark as closed</button>}
                </div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AgentViewPage