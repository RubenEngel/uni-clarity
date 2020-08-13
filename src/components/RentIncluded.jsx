import React, {useContext, useEffect} from "react"
import {ToggleButtonGroup, Card, Row, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const RentIncluded = () => {
    
    const {updateEndBalance, setShowRent, setInputObject} = useContext(SubmitContext)
    
    useEffect(() => {
        updateEndBalance()
    })

    function handleHideRent() {
        setShowRent(false)
        setInputObject(
            (prevObject) => ({
                ...prevObject, 
                include_rent: "no"
            })
            )
    }

    function handleShowRent() {
        setShowRent(true)
        setInputObject(
            (prevObject) => ({
                ...prevObject, 
                include_rent: "yes"
            })
            )
    }


    return (
        <div className="input-section">
            <Card>
                <InputName  
                    name="Paying your own rent?"
                    />
                <ToggleButtonGroup type="radio" name="include_rent" defaultValue="yes" >
                    <ToggleButton variant="light" value="yes" onChange={handleShowRent}>Yes</ToggleButton>
                    <ToggleButton variant="light" value="no" onChange={handleHideRent}>No</ToggleButton>
                </ToggleButtonGroup>
            </Card>
        </div>
    )
}
// value={showRent} 
export default RentIncluded



// {props.yesChecked}