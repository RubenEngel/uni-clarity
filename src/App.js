import React, {useState, useEffect} from 'react'

import { v4 as uuidv4 } from 'uuid';

import {Card, Alert, Button, Row, Col, Container} from "react-bootstrap"

import Logo from './graduation-hat.png';

//Components
import NavBar from "./components/NavBar.jsx"
import Summary from './components/Summary'
import SectionHeading from "./components/SectionHeading"
import DateRangeInput from "./components/DateRangeInput"
import InputCard from "./components/InputCard"
import RecurringExpenseTable from "./components/RecurringExpenseTable"
import ExpenseInput from './components/ExpenseInput'
import OneOffExpenseTable from "./components/OneOffExpenseTable"
import SubmitContext from "./context/submit-context"
import RentIncluded from "./components/RentIncluded"
import BillsIncluded from "./components/BillsIncluded"
import RentPayments from "./components/RentPayments"
import AdditionalIncome from './components/AdditionalIncome'
import InputName from './components/InputName';
import EndBalance from "./components/EndBalance"
import DisposableCash from "./components/DisposableCash"
import Help from "./components/Help"
import Footer from "./components/Footer"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics'

// require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBybnFKJ8XidoCYIb1EPyUUi93evWSKo_g",
    authDomain: "uniclarity-880cf.firebaseapp.com",
    databaseURL: "https://uniclarity-880cf.firebaseio.com",
    projectId: "uniclarity-880cf",
    storageBucket: "uniclarity-880cf.appspot.com",
    messagingSenderId: "333121435549",
    appId: "1:333121435549:web:7b03eb8018ede6fa212174",
    measurementId: "G-8BTZEKCDVE"
});

firebase.analytics()


const App = () => {

//-------------------------------------------------- Object of User Inputs

    const today = new Date();

    const lastDayMonth = (new Date(today.getFullYear(), today.getMonth()+1, 0)).toISOString().split('T')[0]

    const defaultInputObject = ({
        //Dates
        start_date: "2020-10-01",
        end_date: "2021-05-31",
        //Income
        maintenance_loan: "",
        additional_income: "",
        //Rent
        include_rent: "yes",
        rent_cost: "",
        rent_cost_MonthlyWeekly: "monthly",
        rent_payment_period: "",
        next_rent_payment: lastDayMonth,
        last_rent_payment: "2021-05-30",
        contract_start: "2020-07-01",
        contract_end: "2021-06-30",
        total_payments: "",
        payments_left: "",
        bills_included: "no",
        bills_cost: "",         
        bills_cost_MonthlyWeekly: "monthly",
        //Groceries
        groceries_cost: "",
        start_balance: "0",
        input_choice: "range",
        disposable_cash: "0"
    })

    const [inputObject, setInputObject] = useState(
        JSON.parse(localStorage.getItem('inputObject')) || defaultInputObject );
    
        function submitValue(event) {
            const inputName = event.target.name
            const value = event.target.value
            setInputObject( (prevObject) => ({...prevObject, [inputName]: value }) )  
        }
   
// ------------------------------------------------ Additional Income

    const [incomeArray, setIncomeArray] = useState(JSON.parse(localStorage.getItem('incomeArray')) || [])

    function submitIncomeSource(name, value, period) {
        setIncomeArray((prevObject) => ([
                ...prevObject,
                    {
                    "key": uuidv4(),
                    "name": name,
                    "value": value,
                    "period": period
                    }
            ])
        )
    }

    function deleteIncomeSource(id) {
        setIncomeArray( prevArray => {
            return prevArray.filter( expense => {
                return expense.key !== id
            })
        })
        }

//-------------------------------------------------- Recurring Expenses

    const [recurringExpenseArray, setRecurringExpenseArray] = useState(JSON.parse(localStorage.getItem('recurringExpenseArray')) || [])

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

    const [oneOffExpenseArray, setOneOffExpenseArray] = useState(JSON.parse(localStorage.getItem('oneOffExpenseArray')) || [])

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
            const additional_income_array = incomeArray.map(
            function (element) {
                if (element.period === "total") {
                    return +element.value
                } else if (element.period === "monthly") {
                    return +element.value * total_weeks()/4.35;
                } else if (element.period === "weekly") {
                    return +element.value * total_weeks();
                }
            } 
        )
        const additional_income_total = additional_income_array.reduce((sum, currentValue) => sum + +currentValue, 0)
        const total_income = (+inputObject.maintenance_loan) + (+additional_income_total)
        // Rent Calcs
        const rent_weeks = inputObject.rent_payment_period &&
                            (inputObject.rent_payment_period === "monthly" ? weeks(inputObject.next_rent_payment, inputObject.last_rent_payment) 
                        :    weeks(inputObject.contract_start, inputObject.contract_end));
        const weekly_rent = inputObject.rent_cost_MonthlyWeekly === "monthly" ? (+inputObject.rent_cost / 4.345) : (+inputObject.rent_cost)
        const weekly_bills = inputObject.bills_included === "no" ?
                            (inputObject.bills_cost_MonthlyWeekly === "monthly" ? (+inputObject.bills_cost / 4.345) : (+inputObject.bills_cost))
                            : 0
        const total_rent_bills = inputObject.include_rent === "yes" ? 
                            (inputObject.rent_payment_period === "monthly" ? (weekly_rent + weekly_bills) * 4.345 * Math.round(1 + (rent_weeks/4.345)) : (((weekly_rent + weekly_bills) * rent_weeks) / +inputObject.total_payments) * +inputObject.payments_left)
                        :   (weekly_bills * total_weeks())
        // Groceries Calcs
        const weekly_groceries = (+inputObject.groceries_cost) 
        const total_groceries = weekly_groceries * total_weeks()
        // Expense Calcs
        const weekly_recurring_expenses = recurringExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_recurring_expenses = weekly_recurring_expenses*total_weeks()
        const total_one_off_expenses = oneOffExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)
        const total_expenses = total_recurring_expenses + total_one_off_expenses
        // Results Calcs
        const disposable_cash = +inputObject.disposable_cash
        const start_balance = +inputObject.start_balance
        const end_balance = Math.round(total_income + start_balance - total_rent_bills - total_groceries - total_recurring_expenses - total_one_off_expenses - disposable_cash*total_weeks())
       
        

// ---------------------------------------------- Results State

        const [endBalance, setEndBalance] = useState()

        function updateEndBalance() {
            setEndBalance(end_balance)
        }

        function endEqualStartBalance() {
            const default_disposable = (total_income + start_balance - total_rent_bills - total_groceries - total_recurring_expenses - total_one_off_expenses - start_balance)/total_weeks()
            setInputObject( (prevObject) => ({...prevObject, "disposable_cash": +default_disposable }) )
        }

        // ---------------- Formated end date *Now What?*

        function formatDate(date) {
            const dt = new Date(date)
            const day = dt.getDate()
            const month = dt.getMonth() + 1
            const year = dt.getFullYear()
            return (
                `${day}/${month}/${year}`
            )
        }
 

//---------------------------------------------------------------- Fire Base


//------------------------ Firebase Authentication 

            const uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: () => false
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'redirect',
                // signInSuccessUrl: ,
                signInOptions: [
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                  firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                credentialHelper: 'none',
                // Terms of service url.
                tosUrl: 'terms-of-service',
                // Privacy policy url.
                privacyPolicyUrl: 'privacy-policy'
              };


              //Signed-in status state
              const [signedIn, setSignedIn] = useState(false)

              const authChange = (user) => firebase.auth().onAuthStateChanged(user)

            //   whenever app refreshes handle state of user signed in

              const userAccount = firebase.auth().currentUser


              function resetData() {
                setInputObject(defaultInputObject)
                setIncomeArray([])
                setRecurringExpenseArray([])
                setOneOffExpenseArray([])
              }

              function signOut() {
                firebase.auth().signOut()
              }

              

//------------------------------ Firestore setup

    const db = firebase.firestore();

    const [saveStatus, setSaveStatus] = useState()
    const [lastSaved, setLastSaved] = useState()

    function Save (userID) {
        db.collection("users").doc(userID).set({
            inputObject, 
            incomeArray,
            recurringExpenseArray,
            oneOffExpenseArray,
            last_saved: today.toString()
        })
        .then(function() {
            setLastSaved(today.toString()) 
            setSaveStatus(`Save Succesful on ${today}`);
            })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    function Load (userID) {
        db.collection("users").doc(userID).get().then(function(doc) {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                setInputObject(doc.data().inputObject)
                setIncomeArray(doc.data().incomeArray)
                setRecurringExpenseArray(doc.data().recurringExpenseArray)
                setOneOffExpenseArray(doc.data().oneOffExpenseArray)
                setLastSaved(doc.data().last_saved)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
       
        };


    // --------------------- What to do when user signs in/out
    useEffect(() => {

        authChange( user =>
            {
                setSignedIn(!!user);
                if (user) {
                    Load(user.uid)
                }
          })
        }

        , [signedIn])

    

// ----------------------------------------------------- Local Storage

useEffect(() => {
    localStorage.setItem('inputObject', JSON.stringify(inputObject))
    localStorage.setItem('incomeArray', JSON.stringify(incomeArray))
    localStorage.setItem('recurringExpenseArray', JSON.stringify(recurringExpenseArray))
    localStorage.setItem('oneOffExpenseArray', JSON.stringify(oneOffExpenseArray))
}, [inputObject, recurringExpenseArray, oneOffExpenseArray, incomeArray])


// ----------------------------------------------------- Show Help

const [showHelp, setShowHelp] = useState(false)

// ----------------------------------------------------- Show Summary

const [showSummary, setShowSummary] = useState(false)

// ----------------------------------------------------- Viewport State

const [width, setWidth] = useState(window.innerWidth)

const tabletBreakpoint = 767

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

// ----------------------------------------------------- JavaScript Navigation

    function navigate(e, section) {
        e && e.preventDefault(); // to avoid the link from redirecting
        document.getElementById(section).scrollIntoView();
    }


// --------------------------------------------------------------------------------------------------Start of Rendered App
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
            submitIncomeSource,
            deleteIncomeSource,
            setShowBills,
            setShowRent,
            setShowSummary,
            inputObject,
            end_balance,
            incomeArray,
            oneOffExpenseArray,
            recurringExpenseArray
        }}
        >

        <Row>

                {/* Help and summary indicators */}
                    <div>
                        <p className="button-description-help">Help</p>
                        {(width < tabletBreakpoint) ? <p className="button-description-summary">Summary</p> : null}
                    </div>

            {/* ------------------------------------ Help Section ------------------------------------ */}
                
                {showHelp ? <Help/> : null}

            {/* -------------------------------------Summary Div ----------------------------*/}
            
            {(width > tabletBreakpoint || showSummary ?
                <Col className="summary" sm={12} md={4}>
                    <Summary 
                        total_weeks={total_weeks} 
                        total_income={total_income}
                        total_rent_bills={total_rent_bills}
                        total_groceries={total_groceries} 
                        total_expenses = {total_expenses}
                        disposable_cash={disposable_cash}
                        end_balance={end_balance}
                    />
                </Col>
                :
                null
            )}
            

            {/*--------------------------------------- Main Div------------------------------*/}
            <Col className="main" md={8}>
            {/* Show Summary Button */}
            {(width < tabletBreakpoint) ? 
                    <button onClick={() => setShowSummary(!showSummary)} className="show-summary overlay-button">
                    {showSummary === false ? 
                    <i className="far fa-chart-bar icon"></i> 
                    : <i className="fas fa-times icon close-summary"></i>}
                    </button>
                : null}
                

                {/* Show Help Button */}
                <button onClick={() => setShowHelp(!showHelp)} className="show-help overlay-button">
                    {showHelp === false ? 
                    <i className="fas fa-question-circle icon"></i> 
                    : <i className="fas fa-times icon close-help"></i>}
                </button>

                {/* --------------------------------------------NavBar --------------------------------------------*/}
                <NavBar
                /> 
                
                {/* ------------------------------------- Intro --------------------------------------*/}
                <section id="intro-section">

                    <div className="intro">
                        {/* <h1>Don't stu<span className="dent">dent</span> the bank.</h1> */}
                        <h1>
                        Uni<span className="blue">Clarity</span>
                        <img className="title-icon" src={Logo} alt="logo"></img>
                        </h1>
                        <h3>The fast, flexible and personalised student budgeting web app.</h3>

                        <h3>How much <span className="gold">cash</span> do you want to <span className="blue">splash</span>?</h3>
                    </div>

                    <div className="continue">
                        <button onClick={(e) => navigate(e, "account-section")}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    

                </section>


                {/* -------------------------------------Account Section -------------------------------------*/}


                <section id="account-section">


                <Container fluid>
                    <SectionHeading name="Account" icon="fas fa-user icon"/>
                    <Card>
                        {signedIn ? 
                        <Card.Body>
                            <h3>You are signed in as {userAccount.displayName}</h3>
                            {lastSaved ? <p className="save-status">Data was last saved on {lastSaved}</p> : 
                            <p className="save-status">You are yet to save any data</p>}
                            <Button variant="secondary" className="sign-out" onClick={signOut}>Sign Out</Button>
                        </Card.Body>
                        : 
                        <div className="firebase-auth">
                            <p className="input-description">Sign in to unlock the 'save' feature or load previous data.</p>
                            <Alert className="card alert" variant="warning">
                            <p>
                                <strong>WARNING: </strong>
                                Some in-app browsers such as Facebook Messenger's will not allow sign-in with Google or Facebook. <br/><strong>Open the web app in a dedicated browser such as Safari or Chrome.</strong>
                            </p>
                        </Alert>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                        </div>
                        }
                            <Row>
                                <Col><Button disabled={!signedIn} variant="secondary" onClick={() => Save(firebase.auth().currentUser.uid)}>Save</Button></Col>
                                <Col><Button disabled={!signedIn} variant="secondary" onClick={() => Load(firebase.auth().currentUser.uid)}>Load</Button></Col>
                                <Col><Button variant="secondary" onClick={() => resetData()}>Reset</Button></Col>
                            </Row>

                    </Card>
                </Container>

                </section>
               
               
                {/* ------------------------------------------Date input ------------------------------------------*/}
                   
                <section id="date-section">

                <Container fluid>
                    <SectionHeading name="Dates" icon="fas fa-clock icon"/>
                    <div className="input-section">
                        <Card>
                            <InputName 
                            name="Select budgeting period"
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
                </Container>

                </section>  
                    
                {/* ----------------------------------------Income Section ----------------------------------------*/}
                <section id="income-section">

                    <Container fluid>

                        <SectionHeading name="Income" icon="fas fa-money-check icon"/>

                        <Alert className="card alert" variant="warning">
                            <p>
                                <strong>ONLY </strong>
                                include income that you will receive within your specified date period. 
                                <br/>
                                <strong>DO NOT </strong>
                                include any income that you have already received.
                            </p>
                        </Alert>

                        {/* Maintenance Loan */}
                        <InputCard
                            name="Maintenance Loan"
                            inputType="money"
                            detail="Left to Receive"
                            id="maintenance_loan"
                            userValue={inputObject.maintenance_loan}
                            /> 
                            
                        <AdditionalIncome/>
                            
                    </Container>

                </section>
                {/* -----------------------------------------Rent Section ------------------------------------------*/}
                <section id="rent-section">

                    <Container fluid>

                        <SectionHeading name="Rent & Bills" icon="fas fa-home icon"/> 
                        
                    {/* Paying own rent? */}
                    <RentIncluded />

                    {showRent && 
                    <div className="rent-div">

                    {/* Rent Cost */}
                    <InputCard 
                        name="Rent Cost (per student)"
                        inputType="money" 
                        userMonthlyWeekly={inputObject.rent_cost_MonthlyWeekly}
                        id="rent_cost"
                        userValue={inputObject.rent_cost}
                        />

                    {/* Rent Payment Method */}
                    <RentPayments
                        userMethod={inputObject.rent_payment_period}
                        initialNextPayment={inputObject.next_rent_payment}
                        initialLastPayment={inputObject.last_rent_payment}
                        initialContractStart={inputObject.contract_start}
                        initialContractEndDate={inputObject.contract_end}
                        />

                    </div>
                    }

                        {/* Bills Included in Rent? */}
                        <BillsIncluded /> 
                        
                        {/* Household Bills Cost */}
                        
                        {(showBills && 
                            <div id="household-bills-div">
                            <InputCard
                                name="Average Household Bills (per student)"
                                example="i.e Energy, Water and Broadband"
                                average="(Average ~£50 per month)"
                                inputType="money"
                                userMonthlyWeekly={inputObject.bills_cost_MonthlyWeekly}
                                id="bills_cost"
                                submitValue={submitValue}
                                updateEndBalance={updateEndBalance}
                                userValue={inputObject.bills_cost}/> 
                            </div>
                            )}


                    </Container>

                </section>

                {/* -----------------------------------------Groceries Section ------------------------------------------*/}
                <section id="groceries-section">

                    <Container fluid>

                        <SectionHeading name="Groceries" icon="fas fa-shopping-cart icon"/> 
                        
                        {/* Groceries Cost */}
                        <InputCard
                            name="How much do you typically spend on groceries in a week?"
                            inputType="money"
                            id="groceries_cost"
                            average="(Average ~£30 per week)"
                            detail="Per Week"
                            userValue={inputObject.groceries_cost}
                            />

                    </Container>

                </section>
                {/* -------------------------------------------Expenses Section----------------------------------------- */}
                <section id="expenses-section">

                    <Container fluid>

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

                    </Container>

                </section>

                {/* -------------------------------------------Results Section------------------------------------------- */}
                <section id="results-section">

                    <Container fluid>

                        <SectionHeading 
                            name="Results" 
                            icon="fas fa-piggy-bank icon"
                            />

                        <InputCard 
                            name="Start Balance" 
                            inputType="money"
                            id="start_balance"
                            userValue={inputObject.start_balance}
                            />

                        <Card bg="secondary" text="white" className="results-card">
                            <Card.Body>
                                <div className="results-section">
                                    <DisposableCash 
                                    id="disposable_cash"/>
                                </div>
                                
                                <div className="results-section">
                                    <EndBalance 
                                    id="end_balance"
                                    endBalance={endBalance} />
                                </div>
                            </Card.Body>

                            <Button disabled={isNaN(endBalance)} onClick={() => endEqualStartBalance()} className="setBalance" variant="primary">Set 'End Balance' equal to 'Start Balance'</Button>

                        </Card>

                        {(disposable_cash < 0) &&
                            <Alert className="card alert" variant="danger">
                                {`It looks like your 'Weekly Cash to Splash' budget is negative. This means that unless you find another income source equivalent to at least £${Math.round(disposable_cash)*-1} per week, or cut expenditure, you will finish your budgeting period with less than you started with regardless.`} <p><strong>Update your 'Weekly Cash to Splash' budget with a positive number.</strong></p>
                            </Alert>}

                        {
                        signedIn ? 
                        <div>
                                <Button variant="outline-primary" className="card-body save" onClick={() => Save(firebase.auth().currentUser.uid)}>Save</Button>
                                <p className="save-status">{saveStatus}</p>
                        </div> :
                        <div>
                            <h3 className="save-unlock"><a href="#account-section">Sign-In</a> to unlock the 'Save' feature.</h3>
                        </div>
                        }
                        
                        {(!isNaN(end_balance) && disposable_cash >= 0) ?
                        <Alert className="card alert" variant="primary">
                            <h2>Now what?</h2>
                            <p>
                                {`Assuming you start budgeting on ${formatDate(inputObject.start_date)} with a starting bank balance of £${inputObject.start_balance}; If you stick to a weekly non-essentials budget of £${Math.round(disposable_cash)}, you should have a bank balance of £${end_balance} on ${formatDate(inputObject.end_date)}.`}
                            </p>
                            <p>
                                The best way to stick to your budget is to set up a weekly standing order to a secondary bank account that will only be used for non-essentials. A good day for your standing order is a Monday to avoid spending all of your weekly budget on the weekend!
                            </p>
                        </Alert> : null}

                    </Container>
                </section>

                <Footer/>
                
            </Col>
                        

                        
           </Row>
          </SubmitContext.Provider>
        
    )

}

export default App;