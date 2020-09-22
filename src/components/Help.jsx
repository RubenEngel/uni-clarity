import React, {useState, useContext} from "react"
import {Dropdown, DropdownButton, Container} from "react-bootstrap"
import SubmitContext from "../context/submit-context"
import SectionHeading from "./SectionHeading"


const Help = () => {

    const {submitValue} = useContext(SubmitContext)

    // -------------------------------------------- Method switch

    const [nav,setNav] = useState("Overview")

    function handleChange(event) {
        const newValue = event.target.value;

        submitValue(event)
        setNav(newValue)
    }

    return (
        <Container fluid className="help">
            <div className="help-heading">
                <SectionHeading name="Help" icon="fas fa-question-circle icon"/>
            </div>

                <DropdownButton value={nav} variant="outline-primary" className="help-dropdown" title={nav}>
                    <Dropdown.Item className="dropdown-item" as="button" value="Overview" onClick={handleChange}>Overview</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Account" onClick={handleChange}>Account</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Dates" onClick={handleChange}>Dates</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Income" onClick={handleChange}>Income</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Rent" onClick={handleChange}>Rent</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Food" onClick={handleChange}>Food</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Expenses" onClick={handleChange}>Expenses</Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" as="button" value="Results" onClick={handleChange}>Results</Dropdown.Item>
                </DropdownButton>

                <Container fluid className="help-body">
                {nav === "Overview" &&
                    <div>
                        <p>
                            We'll help you find a 'Weekly Cash to Splash' allowance. An amount you can spend on whatever you want, every week. After filling in all of the sections, you'll settle on an amount when you are happy with your end bank balance.
                        </p>
                        <p>
                           With your 'Weekly Cash to Splash', just set up a weekly standing order to another account and you've got yourself a weekly pay day with guilt free spending.
                        </p>
                        <p>
                            Use <strong>Summary</strong> (top right button on mobile) for an overview of the amounts you have entered so far. 
                        </p>    
                        <p>
                            Use <strong>Help</strong> (top left button) for more details if you get stuck. 
                        </p>
                    </div>
                }
                {nav === "Account" &&
                    <div>
                        <p>Login if you wish to unlock the save feature or load previously saved data.
                            <br/>If you want to start a new subscription or have just booked a holiday, simply come back to update your expenses.
                            <br/>Or if you haven't been sticking to your original plan and want to see an updated view of your end balance, just come back and change your budget start date, next rent payment and starting bank balance.
                        </p>
                    </div>
                }
                {nav === "Dates" &&
                    <div>
                        <p>Specify the date range that your budgeting will last - this will be used for calculations.
                            <br/>Say you move into your university house/halls on the 15th of September and are planning on moving back home at the beginning of June. You may want to choose a date range from 15th September - 1st June.
                            <br/>Or you may want to see how much money you will have by the christmas holidays, so you would set it from the 15th September - 15th December. In this case just remember to make sure your income, as well as rent payment details match up with whatever budgeting time period you choose  - see 'Income' and 'Rent' help for more details.
                        </p>
                    </div>
                }
                {nav === "Income" &&
                    <div>
                        <p>Specify any income you are expecting to receive within your specified date range.
                            <br/>If you only want to see your end balance at christmas for example, remember to only include income you will receive in this time period. For example, this may be your first loan installment of £2000 rather than the full £6000.
                            <br/>Also, make sure not to include any income that has already been paid to you. For example, if you want to see your bank balance at the end of the year and your total loan amount is £6000; If you have already received £2000, enter £4000. This is also the case for additional income such as a bursary or a scholarship. 
                        </p>
                    </div>
                }
                  {nav === "Rent" &&
                    <div>
                    
                        <p>Specify rent costs to you as an individual, then select your rent payment method.</p>
                            <h3>'Monthly'</h3>
                            <p>For rent that is paid every month to the landlord, choose 'Monthly'. Let the app know when your next rent payment is, along with when your last payment will be. As an example: If you only want to get a picture of your finances from Mid September to Mid December, you would likely input your next rent payment at a date in late September and your last payment as the correspending date in November.</p>
                            <h3>'Installments'</h3>
                            <p>For rent that is paid in larger installments, e.g once a term; The total amount payable is worked out using the rent cost and the total amount of weeks the contract lasts. Tell the app how many instalments need to be paid overall and then how many you have left to be paid. As an example: If you pay in 4 installments but have already paid your first. You would input 4 total payments, with 3 payments left to pay. NOTE: If you have selected a shorter budgeting period, but you don't pay any rent installments in this time period, you may want to enter 0 for 'Number of Payments Still to Make'.</p>
                            <h3>Household Bills</h3>
                            <p>If they are not included in your cost of rent, tell the app your costs for household bills. As a student, these are usually the costs of water, gas, electricity and broadband. This amount will likely change throughout the year, so use an upper estimate of the average value. If you are unsure of what number to put in, use the provided average estimate. The value you choose will be added onto the rent cost and assumed to be paid for the same amount of time as rent is being paid.</p>
                            <p>NOTE: If you do not pay your own rent but pay your own bills, the total bills cost will be calculated slightly differently by using the total length of time you have selected for your budgeting period.</p>
                    </div>
                }
                  {nav === "Food" &&
                    <div>
                        <p>Specify the amount you usually spend per week (upper estimate) on food.</p>
                        <p>These purchases should usually be your essential foods only. It's not wise to include takeaway costs into this as you can save a lot cooking at home.</p>
                    </div>
                }
                  {nav === "Expenses" &&
                    <div>
                        <h3>Recurring Expenses</h3>
                        <p>Specify any fixed recurring costs, such as a mobile contract, gym membership or a streaming subscription. A trip to the pub/club may be a recurring cost, however, this is what your 'weekly cash to splash' budget is intended for. To keep the app streamlined; rather than ask for payment dates, a weekly value of your recurring expenses is calculated and multiplied by the total amount of weeks you have selected. Keep this in mind when you are relying on a very accurate end bank balance.</p>
                        <h3>One-off Expenses</h3>
                        <p>Specify any large one-off expenses that you want to take into account when calculating your end bank balance, such as a term-time holiday. If you have any large expenses after your budgeting period, such as a summer holiday, just ensure your end bank balance is enough to pay for this.</p>
                    </div>
                }
                  {nav === "Results" &&
                    <div>
                        <h3>Weekly Cash to Splash</h3>
                        <p>This is the amount you will spend per week on non-essential purchases that have not been taken into account in recurring expenses. It is recommended to transfer this amount to a seperate card. This makes it much easier to keep track of your spending and know when you can't afford that extra trip to the pub.</p>
                        <h3>End Balance</h3>
                        <p>The best estimate of what your bank balance will be at the end of your specified date range based on all of the information you have given.</p>
                    </div>
                }
                </Container>
        </Container>
        
    )
}

export default Help