import React, {useState, useEffect, useContext} from "react"
import SubmitContext from "../context/submit-context"

    const DateRangeInput = (props) => {

        const {submitValue, updateEndBalance} = useContext(SubmitContext)

    // ------------------------------------------- Start date state
            const [startDate, setStartDate] = useState("")

            function handleStartChange(event) {
                const newStartDate = event.target.value

                setStartDate(newStartDate)
                submitValue(event)
            }

    
    // ------------------------------------------- End date state
            const [endDate, setEndDate] = useState("")

            function handleEndChange(event) {
                const newEndDate = event.target.value

                setEndDate(newEndDate)
                submitValue(event)
            }
        
    //------------------------------------- Update end balance on date update
             useEffect( () =>  {
                updateEndBalance()
                setStartDate(props.startDate)
                setEndDate(props.endDate)
            }, [updateEndBalance, props.startDate, props.endDate])
            


        return (
            <div className="form-group row">
                <div className="col-md-6">
                    <label htmlFor="start-date-input" className="col-form-label input-description">{props.date1_name}</label>
                        <input
                            name={props.date1_id}
                            className="form-control"
                            type="date"
                            value={startDate}
                            onChange={handleStartChange}
                            id={props.date1_id}
                            />
                </div>

                <div className="col-md-6">
                    <label htmlFor="end-date-input" className="col-form-label input-description">{props.date2_name}</label>
                        <input
                            name={props.date2_id}
                            className="form-control"
                            type="date"
                            value={endDate}
                            onChange={handleEndChange}
                            id={props.date2_id}
                            />
                </div>
            </div>
        )
}

export default DateRangeInput