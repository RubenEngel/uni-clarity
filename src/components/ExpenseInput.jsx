import React, {useState, useEffect, useContext, useRef} from "react"
import InputName from './InputName'
import {Card, Button, ToggleButton, ToggleButtonGroup, Row} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const ExpenseInput = (props) => {

    const {submitOneOffExpense, submitRecurringExpense, updateEndBalance} = useContext(SubmitContext)

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

    // ------------------------Update end balance on changes
    useEffect(() => {
        updateEndBalance()
    })

  
    //------------------------- Hook for focuses back on name input after submit
    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    
        return [ htmlElRef, setFocus ] 
    }

    const [inputRef, setInputFocus] = useFocus()

        return (
            <div className="row">
            <Card body>
                <InputName  
                name="Create an Expense"/>

                <form>

                
    {/*------------------------------------- Name Input ------------------------------ */}
                <Row className="create-expense-row input-group input-box mb-3">
                    <p className="input-description col-6 expense-name">Name:</p>
                    <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onKeyUp={handleKey}
                    className="form-control col-5"/>
                </Row>

    {/*------------------------------------- Cost Input ------------------------------ */}
                <Row className="create-expense-row input-group input-box mb-3 form">
                    <p className="input-description expense-cost col-5">Cost:</p>
                    <div className="input-group-prepend">
                        <span className="input-group-text">£</span>
                    </div>
                    <input
                    type="number"
                    value={cost}
                    min="0"
                    onChange={(event) => setCost(event.target.value)}
                    onKeyUp={handleKey}
                    className="form-control col-7"/>
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
                    <Button variant="outline-primary" onClick={handleAdd} className="add-expense-button">Add Expense</Button>
                </div>
                
                </form>

            </Card>
        </div>
        )
    }

export default ExpenseInput

