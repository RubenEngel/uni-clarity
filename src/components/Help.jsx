import React, {useState, useContext} from "react"
import {Row, Dropdown, DropdownButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import SectionHeading from "./SectionHeading"


const Help = () => {

    const {submitValue} = useContext(SubmitContext)

    // -------------------------------------------- Method switch

    const [nav,setNav] = useState("overview")

    function handleChange(event) {
        const newValue = event.target.value;

        submitValue(event)
        setNav(newValue)
    }

    return (
        <div className="container-fluid help">
            <div className="help-heading">
                <SectionHeading name="Help" icon="fas fa-question-circle icon"/>
            </div>

            <Row>
                <DropdownButton value={nav} variant="outline-primary" className="help-dropdown rent-payments" title={nav}>
                    <Dropdown.Item as="button" value="overview" onClick={handleChange}>Overview</Dropdown.Item>
                    <Dropdown.Item as="button" value="account" onClick={handleChange}>Account</Dropdown.Item>
                    <Dropdown.Item as="button" value="dates" onClick={handleChange}>Dates</Dropdown.Item>
                    <Dropdown.Item as="button" value="income" onClick={handleChange}>Income</Dropdown.Item>
                    <Dropdown.Item as="button" value="rent" onClick={handleChange}>Rent</Dropdown.Item>
                    <Dropdown.Item as="button" value="groceries" onClick={handleChange}>Groceries</Dropdown.Item>
                    <Dropdown.Item as="button" value="expenses" onClick={handleChange}>Expenses</Dropdown.Item>
                    <Dropdown.Item as="button" value="results" onClick={handleChange}>Results</Dropdown.Item>
                </DropdownButton>
            </Row>

            <Row>
                <div className="help-body">
                {nav === "overview" &&
                    <div>
                        <p>The purpose of this app is to find you a weekly budget to spend on non-essentials - that will result in an end bank balance you are happy with. This is called your 'Weekly Cash to Splash'. This may be used for such things as a night out or a new item of clothing.</p>
                    </div>
                }
                {nav === "account" &&
                    <div>
                        <p>Login if you wish to unlock the save feature or load previously saved data.</p>
                    </div>
                }
                {nav === "dates" &&
                    <div>
                        <p>Specify the date range that your budgeting will last - this will be used for calculations.</p>
                    </div>
                }
                {nav === "income" &&
                    <div>
                        <p>Specify any income you are expecting to receive within your specified date range.</p>
                    </div>
                }
                  {nav === "rent" &&
                    <div>
                    
                        <p>Specify rent costs to you as an individual, then select your rent payment method. If applicable also include any household bills costs such as water, gas, electric and broadband. If this amount changes throughout the year, use an upper estimate of the average value.</p>
                    </div>
                }
                  {nav === "groceries" &&
                    <div>
                        <p>Specify the amount you usually spend per week (upper estimate) on your household essentials such as food and toiletries.</p>
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
                </div>
            </Row>
        </div>
        
    )
}

export default Help