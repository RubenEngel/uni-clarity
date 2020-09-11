import React, {useState, useContext, useRef} from "react"
import InputName from './InputName'
import {Card, Button, ToggleButton, ToggleButtonGroup, Row, Col, InputGroup} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const ExpenseInput = (props) => {

    const {submitOneOffExpense, submitRecurringExpense} = useContext(SubmitContext)

    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [period, setPeriod] = useState("1")


    function handleAdd() {
        
        if (cost === "" || name === "") {
            return alert("Please enter a value for both 'Name' and 'Cost'")
        }

        let weeklyCost = cost;
        if (props.id === "recurring_expense") {
        if (period === "1") {
            weeklyCost = cost / 4.345
        }}
        
        setName("")
        setCost("")
        
        if (props.id === "recurring_expense") {
            submitRecurringExpense(name, weeklyCost)
        } 
        else if (props.id === "one_off_expense") {
            submitOneOffExpense(name, cost)
        }
        
        setInputFocus(inputRef)
    }


    function handleKey(event) {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    //------------------------- Hook for focuses back on name input after submit
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    
        return [ htmlElRef, setFocus ] 
    }

    const [inputRef, setInputFocus] = useFocus()

        return (
            <div className="card-section">
                <Card body>
                    <InputName  
                    name="Create an Expense"/>

        {/*------------------------------------- Name Input ------------------------------ */}
                    <Row className="create-expense-row input-group input-box mb-3">
                        <Col className="expense-name" xs={5}>
                            <p className="input-description">Name:</p>
                        </Col>
                        <Col xs={7}>
                            <input
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            onKeyUp={handleKey}
                            className="form-control"/>
                        </Col>
                        
                    </Row>

        {/*------------------------------------- Cost Input ------------------------------ */}
                    <Row>
                        <InputGroup className="create-expense-row input-box">
                            <Col xs={5} className="expense-cost">
                                <p className="input-description">Cost:</p>
                            </Col>
                            <Col className="input-group input-box mb-3 form" xs={7}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className="input-group-text">£</InputGroup.Text>
                                </InputGroup.Prepend>
                                <input
                                type="number"
                                value={cost}
                                min="0"
                                onChange={(event) => setCost(event.target.value)}
                                onKeyUp={handleKey}
                                className="form-control"/>
                            </Col>
                        </InputGroup>
                    </Row>

        {/*------------------------------------- Monthly Weekly Toggle ------------------------------ */}
                    
                    {props.id === "recurring_expense" &&
                    <div>
                    <ToggleButtonGroup type="radio" name={props.id + '_MonthlyWeekly'}  defaultValue={1}>
                        <ToggleButton variant="light" onChange={(event) => (setPeriod(event.target.value))} value={1}>Monthly</ToggleButton>
                        <ToggleButton variant="light" onChange={(event) => (setPeriod(event.target.value))} value={2}>Weekly</ToggleButton>
                    </ToggleButtonGroup>
                    </div>
                    }


        {/*------------------------------------------- Add Button ------------------------------------*/}

                    <div>
                        <Button variant="primary" onClick={handleAdd} className="add-expense-button">Add Expense</Button>
                    </div>

                </Card>
        </div>
        )
    }

export default ExpenseInput

