import React, {useState} from "react"
import { Card, Row } from "react-bootstrap"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"


function Summary (props) {
    
    const [view, setView] = useState("1")

    const handleChange = (event) => {
        setView(event.target.value)
    }

    function SummarySection(props) {

        return(
                <div>
                <Row className="summary-heading">
                        <h3 style={{margin: '5px 0'}}><i className={props.icon}></i>{props.title}: </h3>
                        { (view === "1") ? 
                        <p className="summary-money"><span className="pound">£ </span>{Math.round(props.total)}</p> : 
                        <p className="summary-money"><span className="pound">£ </span>{props.total > 0 ? (Math.round(props.total / props.total_weeks())) : "0"}</p> }
                </Row>
                </div>  
        )
    }


 

    return (
      <Card >

          <Card.Header>
              <h2>Summary<i className="far fa-chart-bar icon"></i></h2>
              <p className="date-range"> Date Range: {props.total_weeks()} Weeks</p>
     
          </Card.Header>

          <Card.Body>
              <div className="view-button">
                <ToggleButtonGroup type="radio" name="summary_view" defaultValue={1}>
                    <ToggleButton variant="light" value={1} onChange={handleChange}>Total</ToggleButton>
                    <ToggleButton variant="light" value={2} onChange={handleChange}>Weekly</ToggleButton>
                </ToggleButtonGroup>
              </div>

                <SummarySection title="Income" icon="fas fa-money-check icon" total={props.total_income} total_weeks={props.total_weeks}/>

                <SummarySection title="Rent & Bills" icon="fas fa-home icon" total={props.total_rent_bills} total_weeks={props.total_weeks}/>

                <SummarySection title="Food" icon="fas fa-shopping-cart icon" total={props.total_food} total_weeks={props.total_weeks}/>

                <SummarySection title="Expenses" icon="fas fa-receipt icon" total={props.total_expenses} total_weeks={props.total_weeks}/>
                    
                <Row>
                    <h3 style={{margin: '5px 0'}}>Weekly Dispoable: </h3><p className="summary-money"><span className="pound">£ </span>{props.disposable_cash}</p>
                    <br/>
                    <h3 style={{marginBottom: '10px'}}>End Balance: </h3> <p className="summary-money"><span className="pound">£ </span>{props.end_balance}</p>
                </Row>

          </Card.Body>
      </Card>
    )
}

export default Summary