import React from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"

function MonthlyWeekly(props) {

const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    props.submitValue(event)
}

    return (
        <div>
        <ToggleButtonGroup type="radio" name={props.id + '_MonthlyWeekly'} defaultValue={props.default}>
            <ToggleButton variant="light" value={1} onChange={handleChange}>Monthly</ToggleButton>
            <ToggleButton variant="light" value={2} onChange={handleChange}>Weekly</ToggleButton>
        </ToggleButtonGroup>
    </div>
    )
}

export default MonthlyWeekly