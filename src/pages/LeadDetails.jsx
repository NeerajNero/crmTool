import React, { useEffect } from 'react'
import { useLocation, useParams} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeadById } from '../slices/leadSlice'
import { addComment, getComments } from '../slices/commentSlice'
import { resetComments } from '../slices/commentSlice'
import { getCurrentUser } from '../slices/userSlice'

const LeadDetails = () => {
const [storedLead, setStoredLead] = useState();
const [comment, setComment] = useState('')
const { leadId } = useParams();
const dispatch = useDispatch();
const location = useLocation();
const currentLead = useSelector((state) => state?.leads?.currentLead);
const comments = useSelector((state) => state?.comments?.comments)
const commentStatus = useSelector((state) => state?.comments?.status)
const currentUser = useSelector((state) => state?.user?.currentUser)
const lead = location?.state?.lead || null;

useEffect(() => {
  if (lead) {
    setStoredLead(lead);
  } else {
    dispatch(getLeadById({ leadId }))
  }
}, [lead, leadId, dispatch]);

useEffect(() => {
  if (currentLead) {
    setStoredLead(currentLead);
  }
}, [currentLead]);

useEffect(() => {
    if(comments.length === 0){
        dispatch(getComments({leadId}))
    }
    return () => {
        dispatch(resetComments())
    }
},[dispatch])

const handleAddComment = () => {
    const user = localStorage.getItem('userId')
    if(user){
      dispatch(addComment({lead: leadId,author: user,commentText: comment}))
    }
}
  return (
    <div className='container'>
        <div>
            <h3>Lead Details</h3>
            <hr/>
            {!storedLead && <p>Loading...</p>}
            {storedLead && <><h5>Lead Name: {storedLead.name}</h5>
            <p>Source: {storedLead.source}</p>
            <p>Status: {storedLead.status}</p>
            <p>tags: {storedLead.tags}</p>
            <p>Time to close: {storedLead.timeToClose} Mins</p>
            <p>Priority: {storedLead.priority}</p>
            <hr/>
            <h5>Sales Agent Assigned</h5>
            <p>Agent Name: {storedLead.salesAgent.name}</p>
            <p>Email: {storedLead.salesAgent.email}</p>
            <div>
                <p><strong>Comments</strong></p>
                {commentStatus === "Loading" && <p>Loading...</p>}
                <ul className='list-group'>
                {comments.length > 0 ? comments.map((comment) => <li key={comment._id} className='list-group-item'>{comment.commentText} 
                    <p className='text-body-tertiary'>Updated by : {comment.author.name} - at - 
                        {new Date(comment.createdAt).toLocaleTimeString()} - 
                        {new Date(comment.createdAt).toLocaleDateString()}</p></li>) : <p className='text-body-tertiary'>No comments yet..</p>}
                </ul>
            </div>
            <hr/>
            <div className='col-md-4'>
            <p><strong>Add Comment</strong></p>
            <input type='text' className='form-control' value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button className='btn btn-primary my-3' onClick={handleAddComment}>Add Comment</button>
            </div>
            </>
            }
        </div>
    </div>
  )
}

export default LeadDetails
