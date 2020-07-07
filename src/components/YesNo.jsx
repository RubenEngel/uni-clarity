import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"


function YesNo(props) {
    
    const {updateEndBalance, toggleShowBills} = useContext(SubmitContext)
    
    function handleChange(event) {
        toggleShowBills(event)
    }

    useEffect(() => {
        updateEndBalance()
    })

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