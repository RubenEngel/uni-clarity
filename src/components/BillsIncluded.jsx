import React, {useContext} from "react"
import {ToggleButtonGroup, Card, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"


const BillsIncluded = () => {
    
    const {setShowBills, setInputObject} = useContext(SubmitContext)


    function handleShowBills() {
        setShowBills(true)
        setInputObject( 
            (prevObject) => ({
                ...prevObject,
                bills_included: "no"
            }) 
        )
    }

    function handleHideBills() {
        setShowBills(false)
        setInputObject( 
            (prevObject) => ({
                ...prevObject,
                bills_included: "yes"
            }) 
        )
    }


    return (
        <div className="card-section">
                <Card>
                    <InputName  
                        name="Bills included in rent?"
                        />
                    <ToggleButtonGroup type="radio" name="bills_included" defaultValue="no">
                        <ToggleButton variant="light" value="yes" onChange={handleHideBills}>Yes</ToggleButton>
                        <ToggleButton variant="light" value="no" onChange={handleShowBills}>No</ToggleButton>
                    </ToggleButtonGroup>
                </Card>
        </div>
    )
}

export default BillsIncluded