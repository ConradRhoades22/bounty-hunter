import React, {useState, useEffect } from 'react'
import axios from 'axios'
import Bountys from './components/Bountys.js'
import AddBountysForm from './components/AddBountysForm.js'

export default function App(){
    const [bountys, setBountys] = useState([])

    function getBountys() {
        axios.get("/bountys")
            .then(res => setBountys(res.data))
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addBounty(newBounty) {
        axios.post("/bountys", newBounty)
            .then(res => 
                setBountys(prevBountys => [...prevBountys, res.data])
                )
            .catch(err => console.log(err.response.data.errMsg))
}


function deleteBounty(bountyId){
    axios.delete(`/bountys/${bountyId}`)
    .then(res => 
        setBountys(prevBountys => prevBountys.filter(bounty => bounty._id !== bountyId))
        )
        .catch(err => console.log(err.response.data.errMsg)) 
    }
    
    function editBounty(update, bountyId){
        axios.put(`/bountys/${bountyId}`, update)
            .then(res => {
                setBountys(prevBountys => prevBountys.map(bounty => bounty._id !== bountyId ? bounty : res.data))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function handleFilter(e){
        if(e.target.value === "reset"){
            getBountys()
        } else {
        axios.get(`/bountys/search/type?type=${e.target.value}`)
            .then(res => setBountys(res.data))
            .catch(err => console.log(err))
        }
    }
    useEffect (() => {
        getBountys()
    }, [])
    return (
        <div>
            <div className="bountys-container">
                <AddBountysForm 
                    submit = {addBounty}
                    btnText="Add Bounty"
                />
                <h4>Filter by Type</h4>
                <select onChange={handleFilter} className="filter-form">
                    <option value="reset">All Bountys</option>
                    <option value="Jedi">Jedi</option>
                    <option value="Sith">Sith</option>
                </select>
                {bountys.map(bounty => 
                <Bountys 
                    {...bounty} 
                    key={bountys.name}
                    deleteBounty = {deleteBounty}
                    editBounty = {editBounty}
                />)}
            </div>
        </div>
    )
}