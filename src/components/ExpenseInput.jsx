import React, {useState, useEffect, useContext} from "react"
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
            weeklyCost = cost / 4.35
        }}
        
        setName("")
        setCost("")
        
        if (props.id === "recurring_expense") {
            submitRecurringExpense(name, weeklyCost)
        } 
        else if (props.id === "one_off_expense") {
            submitOneOffExpense(name, cost)
        }
        
    }

    function handleKey(event) {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    useEffect(() => {
        updateEndBalance()
    })


    
        return (
            <div className="row">
            <Card body>
                <InputName  name="Create an Expense"/>

                <form>

                
    {/*------------------------------------- Name Input ------------------------------ */}
                <Row className="create-expense-row">
                    <p className="input-description col-6">Name:</p>
                    <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onKeyUp={handleKey}
                    className="form-control col-6"/>
                </Row>

    {/*------------------------------------- Cost Input ------------------------------ */}
                <Row className="create-expense-row">
                    <p className="input-description col-6">Cost:</p>
                    <input
                    type="number"
                    value={cost}
                    onChange={(event) => setCost(event.target.value)}
                    onKeyUp={handleKey}
                    className="form-control col-6"/>
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

