import React, {useContext} from "react"
import {Card, Table} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const OneOffExpenseTable = (props) => {


    const {oneOffExpenseArray, deleteOneOffExpense} = useContext(SubmitContext)

    const total = oneOffExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)

    const Expense = (props) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><button><i className="fas fa-times delete-icon" id={props.id} onClick={() => deleteOneOffExpense(props.id)}></i></button></td>
        </tr>)
    }


    return (
        <div className="input-section">
            <Card >
                <Table >
                    <thead>
                        <tr>
                            <th><h3>Name</h3></th>
                            <th><h3>Cost</h3></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {oneOffExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost).toFixed(2)}
                                />))}
                    </tbody>
                </Table>
                <Card.Footer className="expense-card-footer">
                    <h3 className="col-md-6 col-lg-6 expense-table-total">Total: <span className="pound">£</span><span className="money">{total.toFixed(2)}</span></h3>
                </Card.Footer>
            </Card>
        </div>
            
    )
}

export default OneOffExpenseTable