import React, {useState} from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import Intro from "./components/Intro"
import SectionHeading from "./components/SectionHeading"
import {Card} from "react-bootstrap"
import ResultsCard from './components/ResultsCard'
import DateRangeInput from "./components/DateRangeInput"
import {Alert} from "react-bootstrap"
import InputCard from "./components/InputCard"
import RecurringExpenseTable from "./components/RecurringExpenseTable"
import Summary from './components/Summary'
import ExpenseInput from './components/ExpenseInput'
import OneOffExpenseTable from "./components/OneOffExpenseTable"
import SubmitContext from "./context/submit-context"
import YesNoRent from "./components/YesNoRent"
import YesNoBills from "./components/YesNoBills"
import RentPayments from "./components/RentPayments"
import InputName from './components/InputName';


const App = () => {

//-------------------------------------------------- Object of User Inputs

    const [inputObject, setInputObject] = useState(
        {   start_date: "2020-10-01",
            end_date: "2021-05-31",

            maintenance_loan: "",
            additional_income: "",

            rent_cost: "",
            rent_cost_MonthlyWeekly: "1",
            next_rent_payment: "",
            last_rent_payment: "2021-06-30",
            contract_start: "2020-07-01",
            contract_end: "2021-06-30",
            total_payments: "",
            payments_left: "",
            bills_cost: "",         
            bills_cost_MonthlyWeekly: "1",

            food_cost: "",
            current_balance: "",
            disposable_cash: ""
            }
    );
    
        function submitValue(event) {
            const inputName = event.target.name
            const value = event.target.value
            setInputObject( (prevObject) => ({...prevObject, [inputName]: value }) )
            }
   

//-------------------------------------------------- Recurring Expenses

    const [recurringExpenseArray, setRecurringExpenseArray] = useState([])

    function submitRecurringExpense(expenseName, weeklyCost) {
        setRecurringExpenseArray( (prevObject) => ([...prevObject, 
                {"key": uuidv4(),
                 "name": expenseName,
                 "cost": weeklyCost} 
        ]))
        }

    function deleteRecurringExpense(id) {
        setRecurringExpenseArray( prevArray => {
            return prevArray.filter( expense => {
                return expense.key !== id
            })
        })
        }


//--------------------------------------------------One-Off Expenses

    const [oneOffExpenseArray, setOneOffExpenseArray] = useState([])

    function submitOneOffExpense(expenseName, weeklyCost) {
        setOneOffExpenseArray( (prevObject) => ([...prevObject, 
                {"key": uuidv4(),
                "name": expenseName,
                "cost": weeklyCost} 
        ]))
        }

    function deleteOneOffExpense(id) {
        setOneOffExpenseArray( prevArray => {
            return prevArray.filter( expense => {
                return expense.key !== id
            })
        })


        }

//------------------------------------------------- Toggle show/hide rent and bills

const [showRent, setShowRent] = useState(true)

const [showBills, setShowBills] = useState(true)




//------------------------------------------------------- Results Calculations 

     

        const total_weeks = () => {
            const d1 = new Date(inputObject.start_date)
            const d2 = new Date(inputObject.end_date)
            const diff = Math.abs(d2 - d1)
            const weeks = diff/(1000*60*60*24*7)
            return Math.round(weeks)
        }

        const weeks = (start, end) => {
                const d1 = new Date(start)
                const d2 = new Date(end)
                const diff = Math.abs(d2 - d1)
                const weeks = diff/(1000*60*60*24*7)
                return Math.round(weeks)
        }

        // Income Calcs
        const total_income = (+inputObject.maintenance_loan) + (+inputObject.additional_income)
        // Rent Calcs
        const rent_weeks = inputObject.rent_payment_period &&
                            (inputObject.rent_payment_period === "monthly" ? weeks(inputObject.next_rent_payment, inputObject.last_rent_payment) 
                        :    weeks(inputObject.contract_start, inputObject.contract_end));
        const weekly_rent = inputObject.rent_cost_MonthlyWeekly === "1" ? (+inputObject.rent_cost / 4.345) : (+inputObject.rent_cost)
        const total_rent = showRent === true ? 
                            (inputObject.rent_payment_period === "monthly" ? weekly_rent * rent_weeks : ((weekly_rent * rent_weeks) / +inputObject.total_payments) * +inputObject.payments_left)
                        :   0
        const total_bills = (inputObject.bills_cost_MonthlyWeekly === "1" ? (+inputObject.bills_cost / 4.345) : (+inputObject.bills_cost)) * total_weeks()
        const total_rent_bills = Math.round(total_rent + total_bills)
        // Food Calcs
        const weekly_food = (+inputObject.food_cost) 
        const total_food = weekly_food * total_weeks()
        // Expense Calcs
        const weekly_recurring_expenses = recurringExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_recurring_expenses = weekly_recurring_expenses*total_weeks()
        const total_one_off_expenses = oneOffExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_expenses = total_recurring_expenses + total_one_off_expenses
        // Results Calcs
        const disposable_cash = +inputObject.disposable_cash
        const current_balance = +inputObject.current_balance
        const end_balance = Math.round(total_income + current_balance - total_rent - total_bills - total_food - total_recurring_expenses - total_one_off_expenses - disposable_cash*total_weeks())

// ---------------------------End Balance state

        const [endBalance, setEndBalance] = useState()

        function updateEndBalance() {
            setEndBalance(end_balance)
            // console.log(inputObject)
        }
 

// ------------------------------------- Start of main site body
    return (
    
        <SubmitContext.Provider 
        value={{
            setInputObject,
            submitValue, 
            updateEndBalance,
            submitRecurringExpense, 
            deleteRecurringExpense, 
            submitOneOffExpense, 
            deleteOneOffExpense,
            setShowBills,
            setShowRent,
            end_balance,
            oneOffExpenseArray,
            recurringExpenseArray
        }}
        >

        <div className="row">


            {/* -------------------------------------Summary Div ----------------------------*/}
            <div className="summary col-md-4">
                <Summary 
                    total_weeks={total_weeks} 
                    total_income={total_income}
                    total_rent_bills={total_rent_bills}
                    total_food={total_food} 
                    total_expenses = {total_expenses}
                    disposable_cash={disposable_cash}
                    end_balance={end_balance}
                />
            </div>

            {/*--------------------------------------- Main Div------------------------------*/}
            <div className="main col-md-8">

                {/* --------------------------------------------NavBar --------------------------------------------*/}
                <Navbar/> 
                
                {/* -------------------------------------Introduction Section -------------------------------------*/}
                <section id="introduction-section">
                    <Intro/>
                </section>

                {/* ------------------------------------------Date input ------------------------------------------*/}
                <div className="row">
                        <Card>
                            <InputName 
                            name="Select how long you want your budgeting to last"
                            />
                            <DateRangeInput 
                            date1_name="Start Date"
                            date2_name="End Date"
                            date1_id="start_date"
                            date2_id="end_date"
                            startDate={inputObject.start_date} 
                            endDate={inputObject.end_date}
                            />
                            <p className="date-range"> Date Range: {total_weeks()} Weeks</p>
                        </Card>

                        
                </div>

                {/* ----------------------------------------Income Section ----------------------------------------*/}
                <section id="income-section">

                    <div className="container-fluid">

                        <SectionHeading name="Income" icon="fas fa-money-check icon"/>

                        <Alert className="card alert" variant="warning">
                            <p>
                                If the academic year is underway, do
                                <strong> NOT </strong>
                                include any income that has already been paid to you.
                            </p>
                        </Alert>

                        {/* Maintenance Loan */}
                        <InputCard
                            name="Maintenance Loan"
                            inputType="money"
                            detail="Per Academic Year"
                            id="maintenance_loan"
                            /> 
                            
                        {/* Additional Income*/}
                        <InputCard
                            name="Additonal Income"
                            example="e.g Bursary, Part-Time Job"
                            inputType="money"
                            detail="Per Academic Year"
                            id="additional_income"
                            /> 
                            

                    </div>

                </section>
                {/* -----------------------------------------Rent Section ------------------------------------------*/}
                <section id="rent-section">

                    <div className="container-fluid">

                        <SectionHeading name="Rent & Bills" icon="fas fa-home icon"/> 
                        
                    {/* Paying own rent? */}
                    <YesNoRent />

                    {showRent === true && 
                    <div className="rent-div">

                    {/* Rent Cost */}
                    <InputCard 
                        name="Rent Cost (per student)"
                        inputType="money" 
                        monthlyWeeklyDefault={1}
                        id="rent_cost"
                        />

                    {/* Rent Payment Method */}
                    <RentPayments
                        defaultNextPayment={inputObject.next_rent_payment}
                        defaultLastPayment={inputObject.last_rent_payment}
                        defaultContractStartDate={inputObject.contract_start}
                        defaultContractEndDate={inputObject.contract_end}
                        />

                    </div>
                    }

                        {/* Bills Included in Rent? */}
                        <YesNoBills /> 
                        
                        {/* Household Bills Cost */}
                        
                        {(showBills === true && 
                            <div id="household-bills-div">
                            <InputCard
                                name="Average Household Bills (per student)"
                                example="i.e Energy, Water and Broadband"
                                average="(usually ~£50 per month)"
                                inputType="money"
                                monthlyWeeklyDefault={1}
                                id="bills_cost"
                                submitValue={submitValue}
                                updateEndBalance={updateEndBalance}/> 
                            </div>
                            )}

                    
                        {/* <Card>
                        <h3><i className="fas fa-home icon"></i>Section Summary:</h3> 
                        <p className="summary-money"><span className="pound">£</span>{total_rent_bills}</p>
                        </Card> */}

                    </div>


                </section>

                {/* -----------------------------------------Food Section ------------------------------------------*/}
                <section id="food-section">

                    <div className="container-fluid">

                        <SectionHeading name="Food" icon="fas fa-shopping-cart icon"/> 
                        
                        {/* Food Cost */}
                        <InputCard
                            name="How much do you typically spend on food in a week?"
                            inputType="money"
                            id="food_cost"
                            average="(usually ~£40 per week)"
                            detail="Per Week"
                            />

                    </div>
                </section>
                {/* -------------------------------------------Expenses Section----------------------------------------- */}
                <section id="expenses-section">

                    <div className="container-fluid">

                        <SectionHeading name="Expenses" icon="fas fa-receipt icon"/> 

                        {/* Monthly Expenses */}

                        <h3>Recurring Expenses</h3>
                        <p className="example">e.g Haircut, Mobile Contract, Gym</p>

                        <ExpenseInput 
                            id="recurring_expense" 
                            monthlyWeeklyDefault={1} 
                            />

                        <RecurringExpenseTable />

                        {/* One-Off Expenses */}

                        <h3>One-Off Expenses</h3>
                        <p className="example">e.g Christmas, Term-time Holiday</p>

                        <ExpenseInput 
                            id="one_off_expense" 
                            />

                        <OneOffExpenseTable />

                    </div>
                </section>

                {/* -------------------------------------------Results Section------------------------------------------- */}
                <section id="results-section">

                    <div className="container-fluid">

                        <SectionHeading 
                            name="Results" 
                            icon="fas fa-piggy-bank icon"
                            />

                        <InputCard 
                            name="Start Balance" 
                            inputType="money"
                            id="current_balance"
                            />

                        <ResultsCard endBalance={ endBalance }/>

                        <Alert className="card alert" variant="primary">
                            <p>
                                It's recommended to create a weekly automatic payment to a seperate card for your disposable cash budget.
                            </p>
                        </Alert>

                    </div>
                </section>

            </div>
            
                        

        </div>
        </SubmitContext.Provider>

    )
}

export default App;