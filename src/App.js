import React, {useState, useEffect} from 'react'

import { v4 as uuidv4 } from 'uuid';

import {Card, Alert, Button} from "react-bootstrap"


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
import InputName from './components/InputName';
import EndBalance from "./components/EndBalance"
import DisposableCash from "./components/DisposableCash"
//Delete intro and results card
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import * as firebase from 'firebase'
// import * as firebaseui from 'firebaseui'
// Required for side-effects
require("firebase/firestore");

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
        //Food
        food_cost: "",
        start_balance: "0",
        disposable_cash: "0"
    })

    const [inputObject, setInputObject] = useState(defaultInputObject);
    
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
        const weekly_rent = inputObject.rent_cost_MonthlyWeekly === "monthly" ? (+inputObject.rent_cost / 4.345) : (+inputObject.rent_cost)
        const total_rent = showRent === true ? 
                            (inputObject.rent_payment_period === "monthly" ? weekly_rent * rent_weeks : ((weekly_rent * rent_weeks) / +inputObject.total_payments) * +inputObject.payments_left)
                        :   0
        const total_bills = (inputObject.bills_cost_MonthlyWeekly === "monthly" ? (+inputObject.bills_cost / 4.345) : (+inputObject.bills_cost)) * total_weeks()
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
        const start_balance = +inputObject.start_balance
        const end_balance = Math.round(total_income + start_balance - total_rent - total_bills - total_food - total_recurring_expenses - total_one_off_expenses - disposable_cash*total_weeks())
       
// ---------------------------------------------- End Balance

        const [endBalance, setEndBalance] = useState()

        function updateEndBalance() {
            setEndBalance(end_balance)
        }
 
//---------------------------------------------------------------- Fire Base


//------------------------ Firebase Authentication 

            const uiConfig = {
                callbacks: {
                  signInSuccessWithAuthResult: () => false
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                // signInSuccessUrl: ,
                signInOptions: [
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                  firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                credentialHelper: 'none',
                // Terms of service url.
                tosUrl: '<your-tos-url>',
                // Privacy policy url.
                privacyPolicyUrl: '<your-privacy-policy-url>'
              };


              //Signed-in status state
              const [signedIn, setSignedIn] = useState(false)

            //   whenever app refreshes handle state of user signed in
              useEffect(() => (
                firebase.auth().onAuthStateChanged( user =>
                    {
                        setSignedIn(!!user);
                        if (user) {
                            Load(user.uid)
                        } 
                    }
                  )
              ),[signedIn]) 

              const userAccount = firebase.auth().currentUser

              function signOut() {
                firebase.auth().signOut();
                setInputObject(defaultInputObject)
                setRecurringExpenseArray([])
                setOneOffExpenseArray([])
              }

//------------------------------ Firestore setup

    const db = firebase.firestore();
    // const docRef = db.collection("users").doc(userAccount.uid)

    const [saveStatus, setSaveStatus] = useState()
    const [lastSaved, setLastSaved] = useState()

    function Save (userID) {


        db.collection("users").doc(userID).set({
            inputObject, 
            last_saved: today.toString(),
            recurringExpenseArray,
            oneOffExpenseArray
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


// ----------------------------------------------------- Start of Rendered App
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
            inputObject,
            end_balance,
            oneOffExpenseArray,
            recurringExpenseArray
        }}
        >

        <div>

        <div className="row">


            {/* -------------------------------------Summary Div ----------------------------*/}
            <div className="summary col-md-4 col-lg-3">
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
                <NavBar 
                /> 
                
                {/* -------------------------------------Account Section -------------------------------------*/}


                <section id="account-section">

                        <SectionHeading name="Account" icon="fas fa-user icon"/>
                        <Card>
                            {signedIn ? 
                            <div>
                                <h3>You are signed in as {userAccount.displayName}</h3>
                                <img className="profile-picture" src={userAccount.photoURL} alt="profile_picture"></img>
                                {lastSaved ? <p className="save-status">Data was last saved on {lastSaved}</p> : 
                                <p className="save-status">You are yet to save any data</p>}
                                <Button variant="light" className="sign-out" onClick={signOut}>Sign Out</Button>
                            </div>
                            : 
                            <div>
                                <p className="input-description">If you wish to unlock the 'save' feature at the bottom of the page, please sign in.</p>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                            </div>
                            
                            }
                                
                        </Card>
                        <Alert className="card alert" variant="warning">
                            <p>
                            <strong>Mobile Users: </strong> 
                            For best performance and to enable login with Facebook and Google, open the web app in a dedicated browser rather than an in-app browser.
                            </p>
                        </Alert>


                </section>
               
               
                

                {/* ------------------------------------------Date input ------------------------------------------*/}
                   
                <section id="date-section">

                <div className="container-fluid"> 

                    <SectionHeading name="Dates" icon="fas fa-clock icon"/>
                     
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

                </div>


                </section>  
                    
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
                            userValue={inputObject.maintenance_loan}
                            /> 
                            
                        {/* Additional Income*/}
                        <InputCard
                            name="Additonal Income"
                            example="e.g Bursary, Part-Time Job"
                            inputType="money"
                            detail="Per Academic Year"
                            id="additional_income"
                            userValue={inputObject.additional_income}
                            /> 
                            

                    </div>

                </section>
                {/* -----------------------------------------Rent Section ------------------------------------------*/}
                <section id="rent-section">

                    <div className="container-fluid">

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
                                average="(usually ~£50 per month)"
                                inputType="money"
                                userMonthlyWeekly={inputObject.bills_cost_MonthlyWeekly}
                                id="bills_cost"
                                submitValue={submitValue}
                                updateEndBalance={updateEndBalance}
                                userValue={inputObject.bills_cost}/> 
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
                            userValue={inputObject.food_cost}
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
                            id="start_balance"
                            userValue={inputObject.start_balance}
                            />

                        <Card bg="secondary" text="white" className="results-card">
                            <Card.Body>

                                <DisposableCash 
                                id="disposable_cash"
                                userValue={inputObject.disposable_cash}/>

                                <EndBalance 
                                id="end_balance"
                                endBalance={endBalance} />

                            </Card.Body>
                        </Card>

                        {/* <ResultsCard endBalance={ endBalance }/> */}
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
                        

                        <Alert className="card alert" variant="primary">
                            <p>
                                It's recommended to create a weekly automatic payment to a seperate card for your disposable cash budget.
                            </p>
                        </Alert>

                    </div>
                </section>

                

            </div>
            
            </div>      

            <div className="footer">
                <p>Copyright © {today.getFullYear()} Ruben Engel</p>
            </div>

        </div>
        </SubmitContext.Provider>

    )

}

export default App;