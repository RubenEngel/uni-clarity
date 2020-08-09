
import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
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
    }, [updateEndBalance, inputObject.input_choice, inputObject.disposable_cash])

    return (
        <div className="row">
        
        <div className="col-lg-6">
          <p className="input-description">Weekly Cash to Splash</p>
        </div>
        
        <form className="col-lg-6">
          
          {(input === "range") &&
          <div className="form-group">
            <label className="end-value" id="dispoable-cash-value" htmlFor="formControlRange"><span className="end-value-currency">£ </span>{disposableCash}</label>
            <input name={props.id} type="range" className="custom-range" min="0" max="100" value={disposableCash} onChange={handleChange} id="disposable-cash-slider"/>
            
            <ToggleButtonGroup name="input_choice" value={input}>
              <ToggleButton variant="secondary" value="range" onChange={(event) => inputChange(event)}>Range</ToggleButton>
              <ToggleButton variant="secondary" value="custom" onChange={(event) => inputChange(event)}>Custom</ToggleButton>
            </ToggleButtonGroup>
          </div>
          }

          {(input === "custom") &&
          <div className="form-group input-box custom-input">
          <MoneyInput 
            id={props.id}
            userValue={disposableCash}/>

            <ToggleButtonGroup name="input_choice" value={input}>
              <ToggleButton variant="secondary" value="range" onChange={(event) => inputChange(event)}>Range</ToggleButton>
              <ToggleButton variant="secondary" value="custom" onChange={(event) => inputChange(event)}>Custom</ToggleButton>
            </ToggleButtonGroup>
          </div>}

        </form>
       </div>
    )
}

export default DisposableCash