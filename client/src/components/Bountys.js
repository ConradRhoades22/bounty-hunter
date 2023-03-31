import React, { useState } from 'react'
import AddBountysForm from './AddBountysForm'

export default function Bountys(props){
    const { fName, lName, living, bounty, type,  _id } = props
    const [editToggle, setEditToggle] = useState(false)

    let currStatus
    if(living) {
        currStatus = "Alive"
    } else {
        currStatus = "Dead"
    }

    // function editSubmit(_id) {
    //     props.editBounty(_id);
    //     setEditToggle(prevToggle => !prevToggle)
    // }

    return (
        <div className="bountys">
            { ! editToggle ?
            <>
                <h1>Name: {fName} {lName}</h1>
                <p>Bounty: {bounty}</p>
                <p>Living: {currStatus}</p>
                <p>Type: {type}</p>
                <button 
                    className="delete-btn"
                    onClick ={() => props.deleteBounty(_id)}>
                    Delete
                </button>
                <button 
                className="edit-btn"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}
                >
                    Edit
                </button>
            </>
            :
            <>
                <AddBountysForm 
                    fName = {fName}
                    lName = {lName}
                    living = {living}
                    bounty = {bounty}
                    type = {type}
                    _id = {_id}
                    btnText = "Submit Edit"
                    submit = {props.editBounty}
                />
                <button
                onClick={() => setEditToggle(prevToggle => !prevToggle)}
                >
                Close
                </button>
            </>
            }
        </div>
    )
}
