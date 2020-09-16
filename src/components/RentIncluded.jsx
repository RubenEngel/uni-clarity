import React, {useContext, useState} from "react"
import {ToggleButtonGroup, Card, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const RentIncluded = () => {
    
    const {inputObject, setInputObject} = useContext(SubmitContext)

    function handleChange(event) {
        const newValue = event.target.value

        setInputObject(
            (prevObject) => ({
                ...prevObject, 
                include_rent: newValue
            })
            )
        setIncludeRent(newValue)
    }

    const [includeRent, setIncludeRent] = useState(inputObject.include_rent)

    
    return (
        <div className="card-section">
            <Card>
                <InputName
                    name="Paying your own rent?"
                    />
                <ToggleButtonGroup type="radio" name="include_rent" value={includeRent}>
                    <ToggleButton variant="light" value="yes" onChange={(event) => handleChange(event)}>Yes</ToggleButton>
                    <ToggleButton variant="light" value="no" onChange={(event) => handleChange(event)}>No</ToggleButton>
                </ToggleButtonGroup>
            </Card>
        </div>
    )
}

export default RentIncluded