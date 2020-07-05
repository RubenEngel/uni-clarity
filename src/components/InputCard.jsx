import React from "react"
import InputName from './InputName'
import MoneyInput from './MoneyInput'
import MonthlyWeekly from './MonthlyWeekly'
import {Card} from "react-bootstrap"
import YesNo from "./YesNo"
import NumberInput from "./NumberInput"


function InputCard (props) {


    return (
        <div className="row">
        <Card body>
            <InputName  
            name={props.name} 
            example={props.example}
            average={props.average}/>
            {props.yesNoDefault && <YesNo toggleShowBills={props.toggleShowBills} id={props.id} defaultValue={props.yesNoDefault} updateEndBalance={props.updateEndBalance}/>}
            {props.inputType === "money" && <MoneyInput id={props.id} defaultValue={props.defaultValue} submitValue={props.submitValue} updateEndBalance={props.updateEndBalance}/>}
            {props.inputType === "length" && <NumberInput  id={props.id} className="months" submitValue={props.submitValue} updateEndBalance={props.updateEndBalance}/>}
            {props.detail && <p className="detail">{props.detail}</p>}
            {props.monthlyWeeklyDefault && <MonthlyWeekly submitValue={props.submitValue} id={props.id} choiceId={props.choiceId} default={props.monthlyWeeklyDefault} updateEndBalance={props.updateEndBalance}/>}
        </Card>
    </div>
    )
}

export default InputCard

