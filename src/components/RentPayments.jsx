import React, {useContext, useEffect, useState} from "react"
import {ToggleButtonGroup, Card, ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import InputName from "./InputName"
import NumberInput from "./NumberInput"
import DateRangeInput from "./DateRangeInput"


const RentPayments = (props) => {
    
    const { submitValue, inputObject} = useContext(SubmitContext)


    // -------------------------------------------- Method switch
    
    const [rentMethod, setRentMethod] = useState()

    function handleChange(event) {
        const newValue = event.target.value;

        submitValue(event)
        setRentMethod(newValue)
    }


    // ----------------------------------Update balance on re-render
    useEffect(() => {
        setRentMethod(props.userMethod)
    }, [props.userMethod])


    //---------------------------Main render
    return (
        <div className="card-section">
            <Card>
                <InputName  
                    name="How often do you send rent payments?"
                    />
                <ToggleButtonGroup className="rent-payments" type="radio" name="rent_payment_period" value={rentMethod}>
                    <ToggleButton variant="light" value="monthly" onChange={handleChange}>Monthly</ToggleButton>
                    <ToggleButton variant="light" value="termly" onChange={handleChange}>Installments</ToggleButton>
                </ToggleButtonGroup>
                
                    
                    {rentMethod && (
                        rentMethod === "monthly" ? 
                        /* Monthly Render */
                        <Card.Body>
                            <div>
                                <p>Remember that rent is usually paid for the month in advance.</p>
                            </div>
                        <DateRangeInput 
                            date1_name="Next Payment"
                            date1_id="next_rent_payment"
                            date2_name="Last/End Payment"
                            date2_id="last_rent_payment"
                            startDate={props.initialNextPayment}
                            endDate={props.initialLastPayment} 
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
                            startDate={props.initialContractStart} 
                            endDate={props.initialContractEndDate}
                            />

                            <InputName name="Total number of payments"/>
                            <NumberInput 
                            id="total_payments"
                            userValue={inputObject.total_payments}/>
                            <p className="detail">Payments</p>


                            <InputName name="Number of payments still to make"/>
                            <NumberInput 
                            id="payments_left"
                            userValue={inputObject.payments_left} />
                            <p className="detail">Payments</p>


                        </Card.Body>

                    )
                    }
            </Card>
        </div>
        
    )
}

export default RentPayments
