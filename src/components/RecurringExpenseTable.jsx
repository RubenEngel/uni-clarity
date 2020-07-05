import React, {useState, useEffect} from "react"
import {Card, Table, ToggleButton, ToggleButtonGroup} from "react-bootstrap"

function RecurringExpenseTable(props) {

    useEffect(props.updateEndBalance)

    function Expense(props) {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><i className="fas fa-times" id={props.id} onClick={() => props.deleteRecurringExpense(props.id)}></i></td>
        </tr>)
    }
    

    // Chnage monthly/weekly view of table
    const [view, setView] = useState("1")

    const handleChange = (event) => {
        setView(event.target.value)
    }


    return (

        <div>
            <Card className="expense-card">
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
                            props.recurringExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost*4.35).toFixed(2)}
                                deleteRecurringExpense={props.deleteRecurringExpense}
                                />
                                )) :
                            props.recurringExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost).toFixed(2)}
                                deleteRecurringExpense={props.deleteRecurringExpense}
                                />
                                ))  
                        }

                    </tbody>
                </Table>
                <Card.Footer>
                        <ToggleButtonGroup type="radio" name="recurring_expenses_view" defaultValue={1}>
                            <ToggleButton variant="light" value={1} onChange={handleChange}>Monthly</ToggleButton>
                            <ToggleButton variant="light" value={2} onChange={handleChange}>Weekly</ToggleButton>
                        </ToggleButtonGroup>
                </Card.Footer>
            </Card>
                        
        </div>

    )
}

export default RecurringExpenseTable