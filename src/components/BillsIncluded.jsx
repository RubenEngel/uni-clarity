import React, {useContext, useState} from "react"
import {ToggleButtonGroup, Card, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const BillsIncluded = () => {
    
    const {inputObject, setInputObject} = useContext(SubmitContext)


    function handleChange(event) {
        const newValue = event.target.value

        setInputObject( 
            (prevObject) => ({
                ...prevObject,
                bills_included: newValue
            }) 
        )
        setBillsIncluded(newValue)
    }

    const [billsIncluded, setBillsIncluded] = useState(inputObject.bills_included)

    return (
        <div className="card-section">
                <Card>
                    <InputName  
                        name="Bills included in rent?"
                        />
                    <ToggleButtonGroup type="radio" name="bills_included" value={billsIncluded}>
                        <ToggleButton variant="light" value="yes" onChange={(event) => handleChange(event)}>Yes</ToggleButton>
                        <ToggleButton variant="light" value="no" onChange={(event) => handleChange(event)}>No</ToggleButton>
                    </ToggleButtonGroup>
                </Card>
        </div>
    )
}

export default BillsIncluded