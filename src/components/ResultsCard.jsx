import React from "react"
import {Card} from "react-bootstrap"
import EndBalance from "./EndBalance"
import DisposableCash from "./DisposableCash"

function ResultsCard(props) {
    return (
      <Card bg="secondary" text="white" className="results-card">
          <Card.Body>
              <DisposableCash id="disposable_cash" updateEndBalance={props.updateEndBalance} submitValue={props.submitValue} />
              <EndBalance id="end_balance" endBalance={props.endBalance}/>
          </Card.Body>
      </Card>
    )
}

export default ResultsCard