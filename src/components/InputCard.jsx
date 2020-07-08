import React from "react"
import InputName from './InputName'
import MoneyInput from './MoneyInput'
import MonthlyWeekly from './MonthlyWeekly'
import {Card} from "react-bootstrap"
import NumberInput from "./NumberInput"


const InputCard = (props) => {


    return (
        <div className="row">
        <Card body>

            <InputName  
                name={props.name} 
                example={props.example}
                average={props.average}/>

            {props.inputType === "money" && 
                <MoneyInput 
                    id={props.id}/>}
            
            {props.inputType === "length" && 
                <NumberInput  
                    id={props.id}/>}

            {props.detail && 
                <p className="detail">{props.detail}</p>}

            {props.monthlyWeeklyDefault && 
                <MonthlyWeekly 
                    id={props.id} 
                    choiceId={props.choiceId} 
                    default={props.monthlyWeeklyDefault}/>}

        </Card>
    </div>
    )
}

export default InputCard

