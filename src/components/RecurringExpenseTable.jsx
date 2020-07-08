import React, {useState, useContext} from "react"
import {Card, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap"
import SubmitContext from "../context/submit-context"


const RecurringExpenseTable = (props) => {


    const {recurringExpenseArray, deleteRecurringExpense} = useContext(SubmitContext)

    const Expense = (props) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><i className="fas fa-times delete-icon" id={props.id} onClick={() => deleteRecurringExpense(props.id)}></i></td>
        </tr>)
    }
    

    // Monthly/weekly view of table
    const [view, setView] = useState("1")

    function handleChange(event) {
        setView(event.target.value)
    }


    return (

        <div>
            <Card className="recurring-expense-card">
                <Table >
                    <thead>
                        <tr>
                            <th><h3>Name</h3></th>
                            <th><h3>Cost</h3></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {view === "1" ? 
                            recurringExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost*4.345).toFixed(2)}
                                />
                                )) :
                            recurringExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost).toFixed(2)}
                                />
                                ))  
                        }

                    </tbody>
                </Table>
                <Card.Footer className="expense-card-footer">
                        <ToggleButtonGroup type="radio" name="recurring_expenses_view" defaultValue={1}>
                            <ToggleButton variant="light" value={1} onChange={(e) => setView(e.target.value)}>Monthly</ToggleButton>
                            <ToggleButton variant="light" value={2} onChange={(e) => setView(e.target.value)}>Weekly</ToggleButton>
                        </ToggleButtonGroup>
                </Card.Footer>
            </Card>
                        
        </div>

    )
}

export default RecurringExpenseTable