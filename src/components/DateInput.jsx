//Example component

import React, {useState, useEffect} from "react"

function DateInput(props) {
    
    useEffect(props.updateEndBalance)

// ------------------------------------------- Start date state
    const [startDate, setStartDate] = useState(props.defaultStartDate)

    function handleStartChange(event) {
        const newStartDate = event.target.value

        setStartDate(newStartDate)
        props.submitValue(event)

}

  
// ------------------------------------------- End date state
const [endDate, setEndDate] = useState(props.defaultEndDate)

        function handleEndChange(event) {
        const newEndDate = event.target.value

        setEndDate(newEndDate)
        props.submitValue(event)

}
    
    return (
        <div className="form-group row">

            <div className="col-md-6">
                <label htmlFor="start-date-input" className="col-form-label input-description">Start Date</label>
                <div>
                    <input
                        name="start_date"
                        className="form-control"
                        type="date"
                        value={startDate}
                        onChange={handleStartChange}
                        id="start_date"
                        />
                </div>
            </div>

            <div className="col-md-6">
                <label htmlFor="end-date-input" className="col-form-label input-description">End Date</label>
                <div>
                    <input
                        name="end_date"
                        className="form-control"
                        type="date"
                        value={endDate}
                        onChange={handleEndChange}
                        id="end_date"
                        />
                </div>
            </div>

        </div>
    )
}

export default DateInput