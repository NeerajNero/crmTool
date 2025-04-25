import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAgents } from "../slices/userSlice"
import { createLead } from "../slices/leadSlice"
import { getTags } from "../slices/tagSlice"
import {toast} from 'react-hot-toast'

const CreateLead = () => {
  const [name,setName] = useState('')
  const [source, setSource] = useState('')
  const [salesAgent, setSalesAgent] = useState('')
  const [status, setStatus] = useState('')
  const [tags, setTags] = useState('')
  const [timeToClose, setTimeToClose] = useState(0)
  const [priority, setPriority] = useState('')

  const fetchedtags = useSelector((state) => state?.tags?.tags)
  const agents = useSelector((state) => state?.user?.allAgents)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!agents || agents.length === 0){
      dispatch(getAgents())
    }
  },[dispatch,agents])

  useEffect(() => {
    if(!fetchedtags || fetchedtags.length === 0){
      dispatch(getTags())
    }
  },[dispatch, fetchedtags])

  const handleCreateLead = async() => {
    dispatch(createLead({name,source,salesAgent,status,tags,timeToClose,priority})).unwrap(() => {
      setName('')
      setTags('')
      setTimeToClose(0)
      toast.success("Lead Added successfully")
    })
  }
  console.log(fetchedtags)
  return (
    <div>
      <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create New Lead
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create New Lead
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label>Lead Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" type="text"/>
                    <label>Source:</label>
                    <select className="form-control" onChange={(e) => setSource(e.target.value)}>
                      <option defaultValue value='Website'>Website</option>
                      <option value='Referral'>Referral</option>
                      <option value='Cold Call'>Cold Call</option>
                      <option value='Advertisement'>Advertisement</option>
                      <option value='Email'>Email</option>
                      <option value='Other'>Other</option>
                    </select>
                    <label>Sales Agent:</label>
                    <select className="form-control" onChange={(e) => setSalesAgent(e.target.value)}>
                      {agents?.map((agent) => <option key={agent._id} value={agent._id}>{agent.name}</option>)}
                    </select>
                    <label>Priority:</label>
                    <select className="form-control" onChange={(e) => setPriority(e.target.value)}>
                      <option defaultValue value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                    </select>
                    <label>Status:</label>
                    <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                      <option defaultValue value='New'>New</option>
                      <option value='Contacted'>Contacted</option>
                      <option value='Qualified'>Qualified</option>
                      <option value='Proposal Sent'>Proposal Sent</option>
                      <option value='Closed'>Closed</option>
                    </select>
                    <label>Tags:</label>
                      <select className="form-control" onChange={(e) => setTags(e.target.value)}>
                          {fetchedtags?.map((tag) => <option key={tag._id} value={tag.name}>{tag.name}</option>)}
                      </select>
                    <label>Time To Close:</label>
                    <input value={timeToClose} onChange={(e) => setTimeToClose(e.target.value)} className="form-control" type="Number"/>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button onClick={handleCreateLead} type="button" className="btn btn-primary">
                    Add Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CreateLead
