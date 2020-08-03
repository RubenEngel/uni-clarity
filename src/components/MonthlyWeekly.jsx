import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const MonthlyWeekly = (props) => {

    const {submitValue, updateEndBalance} = useContext(SubmitContext)

    // const [period, setPeriod] = useState(props.userMonthlyWeekly)

    function handleChange(event) {
        submitValue(event)
        // setPeriod(event.target.value)
    }

    useEffect(() => {
        updateEndBalance()
    })

        return (
            <div>
            <ToggleButtonGroup type="radio" name={props.id + '_MonthlyWeekly'} value={props.userMonthlyWeekly}>
                <ToggleButton variant="light" value="monthly" onChange={handleChange}>Monthly</ToggleButton>
                <ToggleButton variant="light" value="weekly" onChange={handleChange}>Weekly</ToggleButton>
            </ToggleButtonGroup>
        </div>
        )
}

export default MonthlyWeekly