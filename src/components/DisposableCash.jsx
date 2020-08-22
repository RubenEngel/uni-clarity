
import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"
import { ToggleButton, ToggleButtonGroup, Col, Row } from "react-bootstrap"
import MoneyInput from "./MoneyInput"


const DisposableCash = (props) => {

  const {inputObject, submitValue, updateEndBalance} = useContext(SubmitContext)

  const [disposableCash, setDisposableCash] = useState("")

    function handleChange(event) {
    setDisposableCash(event.target.value)
    submitValue(event)
    }

  const [input, setInput] = useState(inputObject.input_choice)

    function inputChange(event) {
      setInput(event.target.value)
      submitValue(event)
    }

    useEffect(() => {
      updateEndBalance()
      setInput(inputObject.input_choice)
      setDisposableCash(inputObject.disposable_cash)
    }, [updateEndBalance, inputObject.input_choice, inputObject.disposable_cash, setDisposableCash])

    return (
        <Row>
        
          <Col lg={6} className="input-description-div">
            <p className="input-description">Weekly Cash to Splash</p>
          </Col>
          
          <Col lg={6}>
            {(input === "range") &&
            <div>
              <label className="end-value" id="dispoable-cash-value" htmlFor="formControlRange"><span className="end-value-currency">£ </span>{Math.round(disposableCash)}</label>
              <input name={props.id} type="range" className="custom-range" min="0" max="100" value={disposableCash} onChange={handleChange} id="disposable-cash-slider"/>
              
              <ToggleButtonGroup name="input_choice" value={input}>
                <ToggleButton variant="secondary" value="range" onChange={(event) => inputChange(event)}>Range (<span className="range-pound">£</span>100)</ToggleButton>
                <ToggleButton variant="secondary" value="custom" onChange={(event) => inputChange(event)}>Custom (Unlimited)</ToggleButton>
              </ToggleButtonGroup>
            </div>
            }
            {(input === "custom") &&
            <div className="input-box custom-input">
            <MoneyInput 
              id={props.id}
              userValue={Math.round(disposableCash)}/>

              <ToggleButtonGroup name="input_choice" value={input}>
                <ToggleButton variant="secondary" value="range" onChange={(event) => inputChange(event)}>Range (£100)</ToggleButton>
                <ToggleButton variant="secondary" value="custom" onChange={(event) => inputChange(event)}>Custom (Unlimited)</ToggleButton>
              </ToggleButtonGroup>
            </div>}
          </Col>
          
       </Row>
    )
}

export default DisposableCash