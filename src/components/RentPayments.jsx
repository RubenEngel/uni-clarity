import React, {useContext, useState, useEffect} from "react"
import {ToggleButtonGroup, Card, Row, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"
import NumberInput from "./NumberInput"
import DateRangeInput from "./DateRangeInput"


const RentPayments = (props) => {
    
    const {updateEndBalance, submitValue, setInputObject} = useContext(SubmitContext)

    useEffect(() => {
        updateEndBalance()
    })

    // -------------------------------------------- Method switch
    
    const [rentMethod, setRentMethod] = useState()

    function handleMonthlyRent(event) {
        submitValue(event)
        setRentMethod("monthly")
        setInputObject(
            (prevObject) => ({
                ...prevObject,
                total_payments: "",
                payments_left: "",
            })
        )
    }

    function handleTermlyRent(event) {
        submitValue(event)
        setRentMethod("termly")
        setInputObject(
            (prevObject) => ({
                ...prevObject,
                next_rent_payment: "",
            })
        )
    }


    // ----------------------------------Update balance on re-render
    useEffect(() => {
        updateEndBalance()
    })


    //---------------------------Main render
    return (
        <Row>
        <Card>
             <InputName  
                name="How often do you send rent payments?"
                />
            <ToggleButtonGroup className="rent-payments" type="radio" name="rent_payment_period">
                <ToggleButton variant="light" value="monthly" onChange={handleMonthlyRent}>Every Month</ToggleButton>
                <ToggleButton variant="light" value="termly" onChange={handleTermlyRent}>Every Term/Quarter</ToggleButton>
            </ToggleButtonGroup>
            
                
                {rentMethod && (
                    rentMethod === "monthly" ? 
                    /* Monthly Render */
                    <Card.Body>
                        <div className="form-group row">
                            <p>Specific dates are not crucial here (if they aren't known). 
                            <br/><strong>Example: </strong>
                            If your next payment is in October and your last is in June, you can use the 30th of each month below.
                            </p>
                        </div>
                    <DateRangeInput 
                        date1_name="Next Payment"
                        date1_id="next_rent_payment"
                        date2_name="Last/End Payment"
                        date2_id="last_rent_payment"
                        startDate={props.defaultNextPayment}
                        endDate={props.defaultLastPayment} 
                        />

                        
                    </Card.Body>
                    :
                    //Installments Render
                    <Card.Body>
                        <DateRangeInput 
                        date1_name="Contract Start"
                        date1_id="contract_start"
                        date2_name="Contract End"
                        date2_id="contract_end"
                        startDate={props.defaultContractStartDate} 
                        endDate={props.defaultContractEndDate}
                        />

                        <InputName name="Total number of payments"/>
                        <NumberInput id="total_payments"/>
                        <p className="detail">Payments</p>


                        <InputName name="Number of payments still to make"/>
                        <NumberInput id="payments_left" />
                        <p className="detail">Payments</p>


                    </Card.Body>


//  

                )
                }
        </Card>
        </Row>
        
    )
}

export default RentPayments
