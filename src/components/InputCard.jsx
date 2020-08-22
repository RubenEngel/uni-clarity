import React from "react"
import InputName from './InputName'
import MoneyInput from './MoneyInput'
import MonthlyWeekly from './MonthlyWeekly'
import {Card} from "react-bootstrap"
import NumberInput from "./NumberInput"


const InputCard = (props) => {


    return (
        <div className="input-section">
        <Card body>

            <InputName  
                name={props.name} 
                example={props.example}
                average={props.average}/>

            {props.inputType === "money" && 
                <MoneyInput 
                    id={props.id}
                    userValue={props.userValue}/>}
            
            {props.inputType === "length" && 
                <NumberInput  
                    id={props.id}
                    userValue={props.userValue}/>}

            {props.detail && 
                <p className="detail">{props.detail}</p>}

            {props.userMonthlyWeekly && 
                <MonthlyWeekly 
                    id={props.id} 
                    userMonthlyWeekly={props.userMonthlyWeekly}/>}

        </Card>
    </div>
    )
}

export default InputCard

