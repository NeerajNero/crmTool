import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAgents } from "../slices/userSlice";
import { getTags } from "../slices/tagSlice";
import { useEffect } from "react";
import { updateLead } from "../slices/leadSlice";
const UpdateLead = () => {
  const location = useLocation();
  const { lead } = location?.state;
  const [leadFormData, setLeadFormData] = useState({
    name: lead?.name,
    source: lead?.source,
    salesAgent: lead?.salesAgent._id,
    status: lead?.status,
    tags: lead?.tags,
    timeToClose: lead?.timeToClose,
    priority: lead?.priority
  })
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

    const handleSubmitData = (e) => {
        e.preventDefault()
        dispatch(updateLead({leadId: lead._id, leadFormData})).unwrap().then(() => console.log("update successfull")).catch((err) => console.log(err.message))
    }

  const handleLeadFormData = (e) => {
    const {name, value} = e.target
    setLeadFormData((prevData) => ({...prevData, [name] : value})) 
  }

  console.log(leadFormData)

  return (
    <div className="ms-5">
      <div>
        <h3>Update Lead : {lead?.name}</h3>
        <hr />
        <form onSubmit={(e) => handleSubmitData(e)} className="col-md-3">
          <label>Lead Name:</label>
          <input
            value={leadFormData.name}
            className="form-control"
            type="text"
            onChange={(e) => handleLeadFormData(e)}
            name="name"
          />
          <label>Source:</label>
          <select
            className="form-select"
            value={leadFormData.source}
            onChange={(e) => handleLeadFormData(e)}
            name="source"
          >
            <option value="Website">
              Website
            </option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
          <label>Sales Agent:</label>
          <select
            className="form-select"
            value={agents.length > 0 ? agents?.find((agent) => agent?.name === leadFormData?.salesAgent?.name)?._id : ""}
            onChange={(e) => handleLeadFormData(e)}
            name="salesAgent"
          >
            {agents?.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
          <label>Priority:</label>
          <select
            className="form-select"
            value={leadFormData.priority}
            onChange={(e) => handleLeadFormData(e)}
            name="priority"
          >
            <option value="Low">
              Low
            </option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Status:</label>
          <select
            className="form-select"
            value={leadFormData.status}
            onChange={(e) => handleLeadFormData(e)}
            name="status"
          >
            <option value="New">
              New
            </option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          <label>Tags:</label>
            <div className="d-flex gap-3 flex-wrap">
            {fetchedtags?.map((tag) => (
              <div key={tag._id}>
                <label className="ms-2">{tag.name} <input onChange={(e) => handleLeadFormData(e)} type="radio" name="tags" value={tag.name}/></label>
              </div>
            ))}
            </div>
          <label>Time To Close:</label>
          <input
            value={leadFormData.timeToClose}
            className="form-control"
            type="Number"
            onChange={(e) => handleLeadFormData(e)}
            name="timeToClose"
          />
          <div className="mt-3 text-center">
          <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLead;
