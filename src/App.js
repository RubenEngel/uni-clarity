import React, {useState} from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';
import Intro from "./components/Intro"
import SectionHeading from "./components/SectionHeading"
import {Card} from "react-bootstrap"
import ResultsCard from './components/ResultsCard'
import DateInput from "./components/DateInput"
import {Alert} from "react-bootstrap"
import InputCard from "./components/InputCard"
import RecurringExpenseTable from "./components/RecurringExpenseTable"
import Summary from './components/Summary'
import ExpenseInput from './components/ExpenseInput'
import OneOffExpenseTable from "./components/OneOffExpenseTable"
import SubmitContext from "./context/submit-context"


const App = () => {

//-------------------------------------------------- Object of User Inputs

    const [inputObject, setInputObject] = useState(
        {   start_date: "2020-10-01",
            end_date: "2021-05-31",
            maintenance_loan: "0",
            additional_income: "0",
            rent_cost: "0",
            rent_payments: "0",
            bills_cost: "0",
            bills_cost_MonthlyWeekly: "1",
            food_cost: "0",
            current_balance: "0",
            disposable_cash: "0"
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
        console.log(recurringExpenseArray)

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

//------------------------------------------------------- Results Calculations 

        const [endBalance, setEndBalance] = useState("0")

        const total_weeks = () => {
            const d1 = new Date(inputObject.start_date)
            const d2 = new Date(inputObject.end_date)
            const diff = Math.abs(d2 - d1)
            const weeks = diff/(1000*60*60*24*7)
            return Math.round(weeks)
        }

        const total_income = (+inputObject.maintenance_loan) + (+inputObject.additional_income)
        const total_rent = (+inputObject.rent_cost) * (+inputObject.rent_payments)
        const total_bills = (inputObject.bills_cost_MonthlyWeekly === "1" ? (+inputObject.bills_cost / 4.35) : (+inputObject.bills_cost)) * total_weeks()
        const total_rent_bills = Math.round(total_rent + total_bills)
        const weekly_food = (+inputObject.food_cost) 
        const total_food = weekly_food * total_weeks()
        const weekly_recurring_expenses = recurringExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_recurring_expenses = weekly_recurring_expenses*total_weeks()
        const total_one_off_expenses = oneOffExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_expenses = total_recurring_expenses + total_one_off_expenses
        const disposable_cash = +inputObject.disposable_cash
        const current_balance = +inputObject.current_balance
        const end_balance = Math.round(total_income + current_balance - total_rent - total_bills - total_food - total_recurring_expenses - total_one_off_expenses - disposable_cash*total_weeks())


        function updateEndBalance() {
            setEndBalance(end_balance)
        }
 

//------------------------------------------------- Toggle show/hide household bills

        const [showBills, setShowBills] = useState(true)

        function toggleShowBills(event) {
            if (event.target.value === "1") {
                setShowBills(false)
                setInputObject( (prevObject) => ({...prevObject, bills_cost: 0 }) )
            } else if (event.target.value === "2") {
                setShowBills(true)
            }
        }


// ------------------------------------- Start of main site body
    return (
    
        <SubmitContext.Provider 
        value={{
            submitValue, 
            updateEndBalance, 
            toggleShowBills, 
            submitRecurringExpense, 
            deleteRecurringExpense, 
            submitOneOffExpense, 
            deleteOneOffExpense, 
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
            <div className="col-md-8">

                {/* --------------------------------------------NavBar --------------------------------------------*/}
                <Navbar/> 
                
                {/* -------------------------------------Introduction Section -------------------------------------*/}
                <section id="introduction-section">
                    <Intro/>
                </section>

                {/* ------------------------------------------Date input ------------------------------------------*/}
                <div className="row">
                        <Card>
                            <DateInput 
                            defaultStartDate={inputObject.start_date} 
                            defaultEndDate={inputObject.end_date}/>
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
                        

                        {/* Rent Cost */}
                        <InputCard 
                            name="Personal Rental Cost"
                            example="i.e. not including parental contribution"
                            detail="Each Payment"
                            inputType="money" 
                            id="rent_cost"
                            /> 

                        {/* Remaining Months Rent to Pay */}
                        <InputCard name="Remaining Rental Payments" 
                            inputType="length"
                            id="rent_payments"
                            /> 
                        
                        {/* Bills Included in Rent? */}
                        <InputCard 
                            name="Bills Included in Rent?" 
                            yesNoDefault={2}
                            id="bills_included"
                            /> 
                        
                        {/* Household Bills Cost */}
                        
                        {(showBills && 
                            <div id="household-bills-div">
                            <InputCard
                                name="Average Household Bills"
                                example="i.e Energy, Water and Broadband"
                                average="(usually ~£50 per month)"
                                inputType="money"
                                monthlyWeeklyDefault={1}
                                id="bills_cost"
                                submitValue={submitValue}
                                updateEndBalance={updateEndBalance}/> 
                            </div>
                            )}


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
                            average="(usually ~£40 a week)"
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