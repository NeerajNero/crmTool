import { useEffect } from "react";
import { getAllLeads, deleteLead } from "../slices/leadSlice";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Leads = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state?.leads?.leads);
  const leadStatus = useSelector((state) => state?.leads?.status);
  useEffect(() => {
    dispatch(getAllLeads());
  },[dispatch, leads?.length]);

  const handleDeleteLead = (leadId) => {
    dispatch(deleteLead({leadId}))
  }

  return (
    <>
    <h4>All Leads ({leads.length})</h4>
    <div>
      {leadStatus === "Loading" && <p>Loading...</p>}
      <div className="d-flex gap-3 flex-wrap row">
        {leads.length > 0 &&
          leads.map((lead) => (
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
                  <Link className="btn btn-primary">Update Lead</Link>
                  <button onClick={() => handleDeleteLead(lead._id)} className="btn btn-danger">Delete Lead</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Leads;
