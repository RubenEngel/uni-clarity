import React, {useState, useContext} from "react"
import {Card, Table, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap"
import SubmitContext from "../context/submit-context"


const RecurringExpenseTable = (props) => {


    const {recurringExpenseArray, deleteRecurringExpense} = useContext(SubmitContext)

    const weekly_total = recurringExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
    const monthly_total = weekly_total*4.345

    const Expense = (props) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><button><i className="fas fa-times delete-icon" id={props.id} onClick={() => deleteRecurringExpense(props.id)}></i></button></td>
        </tr>)
    }
    

    // Monthly/weekly view of table
    const [view, setView] = useState("monthly")


    return (
        <div className="card-section">
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
                        {recurringExpenseArray.map((expense) => (
                            <Expense
                            key={expense.key}
                            id={expense.key}
                            expenseName={expense.name}
                            expenseCost={(+expense.cost * ( (view === "monthly") ? 4.345 : 1 )).toFixed(2)}
                            />
                            )) }
                    </tbody>
                </Table>
                <Card.Footer className="expense-card-footer">
                    <Row>
                    <h3 className="col-md-6 col-lg-6 expense-table-total">Total: <span className="pound">£</span><span className="money">{view === "monthly" ? monthly_total.toFixed(2) :  weekly_total.toFixed(2)}</span></h3>
                        <ToggleButtonGroup className="col-md-6 col-lg-6" type="radio" name="recurring_expenses_view" defaultValue="monthly">
                            <ToggleButton variant="light" value={"monthly"} onChange={(e) => setView(e.target.value)}>Monthly</ToggleButton>
                            <ToggleButton variant="light" value={"weekly"} onChange={(e) => setView(e.target.value)}>Weekly</ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
        
    )
}

export default RecurringExpenseTable