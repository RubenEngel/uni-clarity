import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup, Card, Row, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const YesNoRent = () => {
    
    const {updateEndBalance, setShowRent, setShowBills, setInputObject} = useContext(SubmitContext)
    
    useEffect(() => {
        updateEndBalance()
    })

    function handleHideRent() {
        // Set show bills to true so as if the rent option is changed the default show bills is reset
        setShowBills(true)
        setShowRent(false)
        setInputObject(
            (prevObject) => ({
                ...prevObject, 
                rent_cost: "",
                rent_cost_MonthlyWeekly: "1",
                next_rent_payment: "",
                last_rent_payment: "2021-06-30",
                contract_start: "2020-07-01",
                contract_end: "2021-06-30",
                total_payments: "",
                payments_left: "",
            })
            )
    }

    return (
        <Row>
        <Card>
             <InputName  
                name="Paying your own rent?"
                />
            <ToggleButtonGroup type="radio" name="yes_no_rent" defaultValue={true} >
                <ToggleButton variant="light" value={true} onChange={() => setShowRent(true)}>Yes</ToggleButton>
                <ToggleButton variant="light" value={false} onChange={handleHideRent}>No</ToggleButton>
            </ToggleButtonGroup>
        </Card>
        </Row>
       
    )
}
// value={showRent} 
export default YesNoRent



// {props.yesChecked}