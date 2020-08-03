import React, {useState, useContext} from "react"
import {Row, Card, Dropdown, DropdownButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import SectionHeading from "./SectionHeading"


const Help = () => {

    const {submitValue} = useContext(SubmitContext)

    // -------------------------------------------- Method switch

    const [nav,setNav] = useState()

    function handleChange(event) {
        const newValue = event.target.value;

        submitValue(event)
        setNav(newValue)
    }

    return (
        <div>
            
            <Row>
            <Card>
                <Card.Header><SectionHeading name="Guide" icon="fas fa-question-circle icon"/></Card.Header>
                <Card.Body>
                <DropdownButton value={nav} variant="outline-primary" className="walkthtough-dropdown rent-payments" title={nav ? nav : "Sections"}>
                    <Dropdown.Item as="button" value="account" onClick={handleChange}>Account</Dropdown.Item>
                    <Dropdown.Item as="button" value="dates" onClick={handleChange}>Dates</Dropdown.Item>
                    <Dropdown.Item as="button" value="income" onClick={handleChange}>Income</Dropdown.Item>
                    <Dropdown.Item as="button" value="rent" onClick={handleChange}>Rent</Dropdown.Item>
                    <Dropdown.Item as="button" value="groceries" onClick={handleChange}>Groceries</Dropdown.Item>
                    <Dropdown.Item as="button" value="expenses" onClick={handleChange}>Expenses</Dropdown.Item>
                    <Dropdown.Item as="button" value="results" onClick={handleChange}>Results</Dropdown.Item>
                </DropdownButton>

                {nav === "account" &&
                    <div>
                        {/* <h2>Account</h2> */}
                        <p>Login if you wish to unlock the save feature or load previously saved data.</p>
                    </div>
                }
                {nav === "dates" &&
                    <div>
                        {/* <h2>Dates</h2> */}
                        <p>Specify the date range that your budgeting will last - this will be used for calculations.</p>
                    </div>
                }
                {nav === "income" &&
                    <div>
                        {/* <h2>Income</h2> */}
                        <p>Specify any income you are expecting to receive within your specified date range.</p>
                    </div>
                }
                  {nav === "rent" &&
                    <div>
                        {/* <h2>Rent & Bills</h2> */}
                        <p>Specify rent costs to you as an individual, then select how often you pay your rent.</p>
                    </div>
                }
                  {nav === "groceries" &&
                    <div>
                        {/* <h2>Groceries</h2> */}
                        <p>Specify the amount you usually spend (upper estimate) on your household essentials such as food or toiletries</p>
                    </div>
                }
                  {nav === "expenses" &&
                    <div>
                        <h3>Recurring Expenses</h3>
                        <p>Specify any fixed recurring costs such a mobile contract, gym membership or a streaming subscription.</p>
                        <h3>One-off Expenses</h3>
                        <p>Specify any large one-off expenses that you want to take into account when calculating your end bank balance, such as a winter holiday.</p>
                    </div>
                }
                  {nav === "results" &&
                    <div>
                        <h3>Weekly Cash to Splash</h3>
                        <p>This is the amount you will spend per week on non-essential purchases that have not been taken into account in recurring expenses.</p>
                        <h3>End Balance</h3>
                        <p>What your bank balance will be at the end of your specified date range.</p>
                    </div>
                }
                </Card.Body>
               

            </Card>
        </Row>
        </div>
        
    )
}

export default Help