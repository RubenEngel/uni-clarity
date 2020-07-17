
import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"


const DisposableCash = (props) => {

  const {submitValue, updateEndBalance} = useContext(SubmitContext)

  const [disposableCash, setDisposableCash] = useState("")

    const handleChange = (event) => {
    const newInputValue = event.target.value

    setDisposableCash(newInputValue)
    submitValue(event)
}

    useEffect(() => {
      updateEndBalance()
      setDisposableCash(props.userValue)
    }, [updateEndBalance, props.userValue])

    return (
        <div className="row">
        
        <div className="col-lg-6"><p className="input-description">Weekly Cash to Splash</p></div>
        
        <form className="col-lg-6">
          <div className="form-group">
            <label className="end-value" id="dispoable-cash-value" htmlFor="formControlRange"><span className="end-value-currency">£ </span>{disposableCash}</label>
            <input name={props.id} type="range" className="custom-range" min="0" max="200" value={disposableCash} onChange={handleChange} id="disposable-cash-slider"/>
          </div>
        </form>
       </div>
    )
}

export default DisposableCash