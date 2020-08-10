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
                <DropdownButton value={nav} variant="outline-primary" className="help-dropdown" title={nav}>
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
                <div className="container-fluid help-body">
                {nav === "overview" &&
                    <div>
                        <p>The purpose of this app is to find you a weekly budget to spend on non-essentials - that will result in an end bank balance you are happy with. This is called your 'Weekly Cash to Splash'. This may be used for such things as a night out or a new item of clothing.
                            <br/>Just tell the app your dates of interest, income, rent, known expenses and starting bank balance. You can then play with your 'Weekly Cash to Splash' until you are happy with your end bank balance.
                        </p>
                    </div>
                }
                {nav === "account" &&
                    <div>
                        <p>Login if you wish to unlock the save feature or load previously saved data.
                            <br/>If you want to start a new subscription or have just booked a holiday, simply come back to update your expenses.
                            <br/>Or if you haven't been sticking to your original plan and want to see an updated view of your end balance, just come back and change your budget start date, next rent payment and starting bank balance.
                        </p>
                    </div>
                }
                {nav === "dates" &&
                    <div>
                        <p>Specify the date range that your budgeting will last - this will be used for calculations.
                            <br/>Say you move into your university house/halls on the 15th of September and are planning on moving back home at the beginning of June. You may want to choose a date range from 15th September - 1st June.
                            <br/>Or you may want to see how much money you will have by the christams holidays, so you would set it from the 15th September - 15th December. In this case just remember to make sure your income as well rent payment dates match up with this time period - see 'Income' and 'Rent' help for more details.
                        </p>
                    </div>
                }
                {nav === "income" &&
                    <div>
                        <p>Specify any income you are expecting to receive within your specified date range.
                            <br/>If you only want to see your end balance at christmas for example, remember to only include income you will receive in this time period. For example, this may be your first loan installment of £2500 and £500 of a bursary
                            <br/>Also, make sure not to include any income that has already been paid to you. For example, if your total loan amount is £6000 and you have already received £2000, enter £4000. This is also the case for additional income such as a Bursary. 
                        </p>
                    </div>
                }
                  {nav === "rent" &&
                    <div>
                    
                        <p>Specify rent costs to you as an individual, then select your rent payment method.</p>
                            <h3>'Every Month'</h3>
                            <p>For rent that is paid every month to the landlord, choose 'Monthly'. Let the app know when your next rent payment is, along with when your last payment will be. (EXAMPLE: If you only want to get a picture of your finances from Mid September to Mid December, you would likely input your next rent payment at a date in late September and your last payment as the correspending date in November.)</p>
                            <h3>'Every Term/Quarter'</h3>
                            <p>For rent that is paid in larger installments, choose 'Every Term/Quarter'. The total amount payable is worked out using the rent cost and the total amount of weeks the contract lasts. If you pay in 4 installments but have already paid your first. You would input 4 total payments, with 3 payments left to pay.</p>
                            <h3>Household Bills</h3>
                            <p>If they are not included in your cost of rent, tell the app your costs for household bills. These are usually such as water, gas, electric and broadband. If this amount changes throughout the year, use an upper estimate of the average value. This amount will be added onto the rent cost and assumed to be paid for the same amount of time as rent is being paid.</p>
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
                        <p>Specify any fixed recurring costs such a mobile contract, gym membership or a streaming subscription. To keep the app streamlined, rather than ask for payment dates; a weekly value of your recurring expenses is calculated and multiplied by the total amount of weeks you have selected.</p>
                        <h3>One-off Expenses</h3>
                        <p>Specify any large one-off expenses that you want to take into account when calculating your end bank balance, such as a winter holiday. If you have any large expenses after your budgeting date selection, just ensure your end bank balance is enough to pay for this.</p>
                    </div>
                }
                  {nav === "results" &&
                    <div>
                        <h3>Weekly Cash to Splash</h3>
                        <p>This is the amount you will spend per week on non-essential purchases that have not been taken into account in recurring expenses. It is recommended to transfer this amount to a seperate card. This makes it much easier to keep track of your spending and know when you can't afford that extra trip to the pub.</p>
                        <h3>End Balance</h3>
                        <p>The best estimate of what your bank balance will be at the end of your specified date range based on all of the information you have given.</p>
                    </div>
                }
                </div>
            </Row>
        </div>
        
    )
}

export default Help