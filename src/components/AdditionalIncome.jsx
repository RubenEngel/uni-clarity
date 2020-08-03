// Create additional income - name, amount, period
// Map cards above.

import React, {useState, useContext} from "react"
import {Card, ToggleButton, ToggleButtonGroup, Row, Button} from "react-bootstrap"
import InputName from './InputName'
import SubmitContext from '../context/submit-context'


const AdditionalIncome = () => {

    const {incomeArray ,submitIncomeSource, deleteIncomeSource} = useContext(SubmitContext)
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [period, setPeriod] = useState("")


    function handleAdd() {
        
        if (name === "" | value === "" | period === "" ) {
            return alert("Enter a value for 'Name', 'Value' and 'Period'")
        }
        
        submitIncomeSource(name, value, period)
        setName("")
        setValue("")
        setPeriod("")
    }


    function handleKey(event) {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    const IncomeSource = (props) => {

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

        return(
                <Row>
                    <Card> 
                    <InputName 
                    name={capitalizeFirstLetter(props.name)} />
                    <div>
                        <p className="income-value"><span className="pound">£</span>{props.value}</p>
                    </div>
                    <p className="detail">
                        {props.period === "total" && "Left to Receive"}
                        {props.period === "monthly" && "Per Month"} 
                        {props.period === "weekly" && "Per Week"}        
                    </p>
                    <Button variant="outline-danger" onClick={() => deleteIncomeSource(props.id)}>Remove</Button>
                    </Card>  
                </Row>
                    
        )
    }


    return (
        <div>
            {/* -----------------------------------------Map Income Sources */}
             {incomeArray.map((income) => (
                 <IncomeSource
                 key={income.key}
                 id={income.key}
                 name= {income.name}
                 value= {income.value}
                 period= {income.period}
                 />
             ))}

            {/* --------------------------------------------Add Income */}
            <div className="row">
            <Card>

                <InputName 
                name="Add Income Source"/>

                <Row className="create-income-row input-group input-box mb-3">
                        <p className="input-description col-6 expense-name">Name:</p>
                        <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        onKeyUp={handleKey}
                        className="form-control col-5"/>
                </Row>

                <Row className="create-income-row input-group input-box mb-3 form">
                    <p className="input-description expense-value col-5">Value:</p>
                    <div className="input-group-prepend">
                        <span className="input-group-text">£</span>
                    </div>
                    <input
                    type="number"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyUp={handleKey}
                    className="form-control col-7"/>
                </Row>

                <ToggleButtonGroup className="add-income" type="radio" name="income_period" value={period} >
                    <ToggleButton variant="light" value="total" onChange={(event) => setPeriod(event.target.value)}>Total</ToggleButton>
                    <ToggleButton variant="light" value="monthly" onChange={(event) => setPeriod(event.target.value)}>Monthly</ToggleButton>
                    <ToggleButton variant="light" value="weekly" onChange={(event) => setPeriod(event.target.value)}>Weekly</ToggleButton>
                </ToggleButtonGroup>
                
                <Button variant="outline-primary" onClick={() => handleAdd()} className="add-income-button">Add Income</Button>

                    
            </Card>
            </div>
        </div>
        
    )


}

export default AdditionalIncome