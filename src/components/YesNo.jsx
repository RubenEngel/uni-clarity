import React from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"

function YesNo(props) {
    
    
    const handleChange = (event) => {
        props.toggleShowBills(event)
    }

    return (
        <div>
        <ToggleButtonGroup type="radio" name={props.id} defaultValue={props.defaultValue}>
            <ToggleButton variant="light" value={1} onChange={handleChange}>Yes</ToggleButton>
            <ToggleButton variant="light" value={2} onChange={handleChange}>No</ToggleButton>
        </ToggleButtonGroup>
    </div>
    )
}

export default YesNo



// {props.yesChecked}