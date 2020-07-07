import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const MonthlyWeekly = (props) => {

    const {submitValue, updateEndBalance} = useContext(SubmitContext)

    function handleChange(event) {
        submitValue(event)
    }

    useEffect(() => {
        updateEndBalance()
    })

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