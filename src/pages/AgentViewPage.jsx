import { useDispatch, useSelector } from "react-redux"
import { getLeadsByAgentId } from "../slices/leadSlice"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
const AgentViewPage = () => {
    const [filteredDataByStatus, setFilteredDataByStatus] = useState(null)
    const [filteredDataByPriority, setFilteredDataByPriority] = useState(null)
    const leads = useSelector((state) => state?.leads?.agentLeads)
    const status = useSelector((state) => state?.leads?.status)
    const dispatch = useDispatch()

    useEffect(() => {
        const agentId = localStorage.getItem('userId')
        if(leads?.length === 0 || !leads && agentId){
            dispatch(getLeadsByAgentId({agentId}))
        }
    },[dispatch, leads?.length])
  return (
    <div className="container">
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
        </div>
        </div>
        <hr/>
        <div className="my-3">
        <h3>All Leads</h3>
            <div className="my-3">
                {status === "Loading" && <p>Loading...</p>}
                <div className="list-group col-md-4">
                {leads?.map((lead) => <div key={lead._id} className="list-group-item">
                        <p><strong>Name: </strong>{lead.name}</p>
                        <p><strong>Priority: </strong>{lead.priority}</p>
                        <p><strong>Source: </strong>{lead.source}</p>
                        <p><strong>Status: </strong>{lead.status}</p>
                        <p><strong>Time To Complete: </strong>{lead.timeToClose} Mins</p>
                        <Link className="btn btn-primary" to={`/leadDetails/${lead._id}`} state={{lead}}>More Details</Link>
                        {lead?.status !== "Closed" && <button className="btn btn-secondary mx-3">Mark as closed</button>}
                </div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AgentViewPage