import React, {useEffect} from "react"
import {Card, Table} from "react-bootstrap"

function OneOffExpenseTable(props) {

    useEffect(props.updateEndBalance)

    function Expense(props) {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
        <tr>
            <td>{capitalizeFirstLetter(props.expenseName)}</td>
            <td>£ {props.expenseCost}</td>
            <td><i className="fas fa-times" id={props.id} onClick={() => props.deleteOneOffExpense(props.id)}></i></td>
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
                            {props.oneOffExpenseArray.map((expense) => (
                                <Expense
                                key={expense.key}
                                id={expense.key}
                                expenseName={expense.name}
                                expenseCost={(+expense.cost).toFixed(2)}
                                deleteOneOffExpense={props.deleteOneOffExpense}
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