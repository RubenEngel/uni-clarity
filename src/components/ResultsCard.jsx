import React from "react"
import {Card} from "react-bootstrap"
import EndBalance from "./EndBalance"
import DisposableCash from "./DisposableCash"

const ResultsCard = (props) => {
    return (
      <Card bg="secondary" text="white" className="results-card">
          <Card.Body>

              <DisposableCash 
              id="disposable_cash"
              userValue={props.userValue}/>

              <EndBalance 
              id="end_balance"
              userValue={props.userValue}/>

          </Card.Body>
      </Card>
    )
}

export default ResultsCard