import React, { useState } from'react'

export default function AddBountysForm(props){
    const initInputs = { 
        fName: props.fName || "", 
        lName: props.lName || "", 
        living: props.living || true,
        bounty: props.bounty || null || 0,
        type: props.type || "",

}
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setInputs(prevInputs => ({...prevInputs,[name]: type === "checkbox" ? checked : value}))
        console.log(inputs)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.submit(inputs, props._id)
        setInputs(initInputs)
    }

    function handleEditSubmit(e) {
        e.preventDefault()
        props.submit(inputs, props._id)

    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="fName" 
                value={inputs.fName} 
                onChange={handleChange} 
                placeholder="First Name"
                />

            <input 
                type="text" 
                name="lName" 
                value={inputs.lName} 
                onChange={handleChange} 
                placeholder="Last Name"
            />

            <input
                type="text"
                name="type"
                value={inputs.type}
                onChange={handleChange}
                placeholder="Type"
            />

            <input 
                type="number"
                name="bounty"
                value={inputs.bounty}
                onChange={handleChange}
                placeholder="Bounty"
            />
            <p>Alive:</p>
            <input 
                type="checkbox"
                name="living"
                id="living"
                checked={inputs.living}
                onChange={handleChange}
            />

            <button
            onClick={handleEditSubmit}
            >{props.btnText}</button>
        </form>
    )
}