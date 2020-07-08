import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup, Card, Row, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const YesNoBills = () => {
    
    const {updateEndBalance, setShowBills, setInputObject} = useContext(SubmitContext)

    function handleFalse() {
        setShowBills(false)
        setInputObject(
            (prevObject) => ({...prevObject, bills_cost: "0" }) 
        )
    }

    useEffect(() => {
        updateEndBalance()
    })

    return (
        <Row>
            <Card>
                <InputName  
                    name="Bills included in rent?"
                    />
                <ToggleButtonGroup type="radio" name="yes_no_bills" defaultValue={true}>
                    <ToggleButton variant="light" value={false} onChange={handleFalse}>Yes</ToggleButton>
                    <ToggleButton variant="light" value={true} onChange={() => setShowBills(true)}>No</ToggleButton>
                </ToggleButtonGroup>
            </Card>
        </Row>
        
    )
}

export default YesNoBills



// {props.yesChecked}