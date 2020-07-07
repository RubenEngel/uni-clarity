import React, {useContext} from "react"
import {Card, Table} from "react-bootstrap"
import SubmitContext from "../context/submit-context"

const OneOffExpenseTable = (props) => {


    const {oneOffExpenseArray, deleteOneOffExpense} = useContext(SubmitContext)

    const Expense = (props) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><i className="fas fa-times delete-icon" id={props.id} onClick={() => deleteOneOffExpense(props.id)}></i></td>
        </tr>)
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
                            {oneOffExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost).toFixed(2)}
                                />))}
                    </tbody>
                </Table>
                {/* <Card.Footer>

                </Card.Footer> */}
            </Card>
        </div>

    )
}

export default OneOffExpenseTable