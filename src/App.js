import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {Card, Alert, Button, Row, Col, Container} from "react-bootstrap"
import Logo from './icon-512.png';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {authChange, signOut, db, uiConfig, firebase} from "./firebaseConfig"
import 'firebase/analytics'
import CookieConsent from "react-cookie-consent";

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

const App = () => {

    firebase.analytics();

//-------------------------------------------------- Object of User Inputs

   const today = new Date();
    const firstDayNextMonth = (new Date(today.getFullYear(), today.getMonth()+1, 1))

    // Computer string formatted date
    function formatDateComp(date) {
        const dt = new Date(date)
        let day = dt.getDate()
        if (day < 10) day = '0' + day.toString()
        let month = dt.getMonth() + 1
        if (month < 10) month = '0' + month.toString()
        const year = dt.getFullYear().toString()
        return year + '-' + month + '-' + day  
    }

    // UK string formatted date
    function formatDateUk(date) {
        const dt = new Date(date)
        const day = dt.getDate()
        const month = dt.getMonth() + 1
        const year = dt.getFullYear()
        return (
            `${day}/${month}/${year}`
        )
    }

    

    const defaultInputObject = ({
        //Dates
        start_date: "2020-09-28",
        end_date: "2021-06-01",
        //Income
        maintenance_loan: "",
        additional_income: "",
        //Rent
        include_rent: "yes",
        rent_cost: "",
        rent_cost_MonthlyWeekly: "monthly",
        rent_payment_period: "",
        next_rent_payment: formatDateComp(firstDayNextMonth),
        last_rent_payment: "2021-06-01",
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

    // -------------------------------------------- Main Input Object

    const [inputObject, setInputObject] = useState( JSON.parse(localStorage.getItem('inputObject')) || defaultInputObject );
    
        function submitValue(event) {
            const inputName = event.target.name
            const value = event.target.value
            setInputObject( (prevObject) => ({...prevObject, [inputName]: value }) )  
        }
   
// ------------------------------------------------ Additional Income Array

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

//-------------------------------------------------- Recurring Expenses Array

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

//--------------------------------------------------One-Off Expenses Array

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

//------------------------------------------------------- Results Calculations 
    
    //Find weeks between two dates
    const weeks = (start, end) => {
            const d1 = new Date(start)
            const d2 = new Date(end)
            const diff = Math.abs(d2 - d1)
            const weeks = diff/(1000*60*60*24*7)
            return Math.round(weeks)
    }
    // Total number of weeks user has selected
    const total_weeks = weeks(inputObject.start_date, inputObject.end_date)

    // Convert additonal income array into array of total income amounts
    const additional_income_array = incomeArray.map(
    function (element) {
        if (element.period === "total") {
            return +element.value
        } else if (element.period === "monthly") {
            return +element.value * total_weeks/4.345;
        } else if (element.period === "weekly") {
            return +element.value * total_weeks;
        }
    } 
    )
    // Reduce total additonal income array to single value
    const additional_income_total = additional_income_array.reduce((sum, currentValue) => sum + +currentValue, 0)

    const total_income = (+inputObject.maintenance_loan) + (+additional_income_total)
    // ---------- Rent Calcs
    // Total weeks rent is being paid
    const rent_weeks = inputObject.rent_payment_period &&
                        (inputObject.rent_payment_period === "monthly" ?
                        weeks(inputObject.next_rent_payment, inputObject.last_rent_payment) 
                    :   weeks(inputObject.contract_start, inputObject.contract_end));
    // Weekly cost of rent 
    const weekly_rent = inputObject.rent_cost_MonthlyWeekly === "monthly" ? (+inputObject.rent_cost / 4.345) : (+inputObject.rent_cost)
    // Weekly cost of bills
    const weekly_bills = inputObject.bills_included === "no" ? 
                            (inputObject.bills_cost_MonthlyWeekly === "monthly" ? (+inputObject.bills_cost / 4.345) : (+inputObject.bills_cost))
                        : 0
    // Combine rent and bills multiplied by total weeks
    const total_rent_bills = inputObject.include_rent === "yes" ? 
                        (inputObject.rent_payment_period === "monthly" ? (weekly_rent + weekly_bills) * 4.345 * Math.round(1 + (rent_weeks/4.345)) : (((weekly_rent + weekly_bills) * rent_weeks) / +inputObject.total_payments) * +inputObject.payments_left)
                    :   (weekly_bills * total_weeks)

    // ---------- Groceries Calcs
    // Weekly groceries cost
    const weekly_groceries = (+inputObject.groceries_cost) 
    // Total groceries cost usign weekly cost x total weeks
    const total_groceries = weekly_groceries * total_weeks
    // ---------- Expense Calcs
    const weekly_recurring_expenses = recurringExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)

    const total_recurring_expenses = weekly_recurring_expenses*total_weeks

    const total_one_off_expenses = oneOffExpenseArray.reduce((sum, currentValue) => sum + +currentValue.cost, 0)

    const total_expenses = total_recurring_expenses + total_one_off_expenses

    // Results Calcs
    const disposable_cash = +inputObject.disposable_cash

    const start_balance = +inputObject.start_balance

    const end_balance = Math.round(total_income + start_balance - total_rent_bills - total_groceries - total_recurring_expenses - total_one_off_expenses - disposable_cash*total_weeks)

// ----------------------------------------------------------- Results State

    const [endBalance, setEndBalance] = useState()

    // Set start balance and end balance equal by changing weekly cash to splash to spend all income
    function endEqualStartBalance() {
        const default_disposable = (total_income + start_balance - total_rent_bills - total_groceries - total_recurring_expenses - total_one_off_expenses - start_balance)/total_weeks
        setInputObject( (prevObject) => ({...prevObject, "disposable_cash": +default_disposable }) )
    }

    // --------------------------------------------- On user input updates store in localStorage and update end balance
    
    useEffect(() => {
        setEndBalance(end_balance)
        localStorage.setItem('inputObject', JSON.stringify(inputObject))
        localStorage.setItem('incomeArray', JSON.stringify(incomeArray))
        localStorage.setItem('recurringExpenseArray', JSON.stringify(recurringExpenseArray))
        localStorage.setItem('oneOffExpenseArray', JSON.stringify(oneOffExpenseArray))
    }, [inputObject, recurringExpenseArray, oneOffExpenseArray, incomeArray, end_balance])

//--------------------------------------- Fire Base Sign In/Out

    // Signed-in State
    const [signedIn, setSignedIn] = useState(false)

    // What to do when user signs in/out
       useEffect(() => {
           authChange( user =>
               {
                   setSignedIn(!!user);
                   if (user) {
                       db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                           if (doc.exists) {
                               setLastSaved(doc.data().last_saved)
                           }})
                   } else if (!user) {
                       setLastSaved()
                       setLastLoad()
                   }
           }
           )
       }, [signedIn])

//------------------------------------------ Firestore Data Management

    const [saveStatus, setSaveStatus] = useState()
    const [lastSaved, setLastSaved] = useState()
    const [lastLoad, setLastLoad] = useState()


    // Save Data to Firestore
    function save (userID) {
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
            console.error("Error adding user data: ", error);
        });
    }

    // Load Data from Firestore
    function load (userID) {
        db.collection("users").doc(userID).get().then(function(doc) {
            if (doc.exists) {
                setInputObject(doc.data().inputObject)
                setIncomeArray(doc.data().incomeArray)
                setRecurringExpenseArray(doc.data().recurringExpenseArray)
                setOneOffExpenseArray(doc.data().oneOffExpenseArray)
                setLastSaved(doc.data().last_saved)
                setLastLoad("Data Loaded Successfully")
            } else {
                console.log("No user data!");
            }
        }).catch(function(error) {
            console.log("Error getting user data:", error);
        });
       
        };

    // Reset Data
    function resetData() {
        setInputObject(defaultInputObject)
        setIncomeArray([])
        setRecurringExpenseArray([])
        setOneOffExpenseArray([])
        setLastLoad()
      }

    // ----------------------------------------------------- Show/Hide States

    const [showHelp, setShowHelp] = useState(false)

    const [showSummary, setShowSummary] = useState(false)

    const [showRent, setShowRent] = useState(true)

    const [showBills, setShowBills] = useState(true)

    // ----------------------------------------------------- Viewport State
    
    //State of Screen width
    const [width, setWidth] = useState(window.innerWidth)
    
    // Screen width pixels for tablets
    const tabletBreakpoint = 767
    
    // When screen is resized
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

    // -------------------------------------- JavaScript Navigation (prevent URL change on link press)

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
            endBalance,
            incomeArray,
            oneOffExpenseArray,
            recurringExpenseArray
        }}
        >

        <Row>

                {/* Help and summary indicators */}
                <div>
                        <p className="button-description-help fade-in">Help</p>
                        {(width < tabletBreakpoint) ? <p className="button-description-summary fade-in">Summary</p> : null}
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
                    <button onClick={() => setShowSummary(!showSummary)} className="show-summary overlay-button fade-in">
                    {showSummary === false ? 
                    <i className="far fa-chart-bar icon"></i> 
                    : <i className="fas fa-times icon close-summary"></i>}
                    </button>
                : null}
                

                {/* Show Help Button */}
                <button onClick={() => setShowHelp(!showHelp)} className="show-help overlay-button fade-in">
                    {showHelp === false ? 
                    <i className="fas fa-question-circle icon"></i> 
                    : <i className="fas fa-times icon close-help"></i>}
                </button>

                {/* --------------------------------------------NavBar --------------------------------------------*/}
                <NavBar
                /> 
                
                {/* Cookie Consent */}
                <CookieConsent
                acceptOnScroll={true}
                buttonClasses="cookie-accept"
                contentClasses="cookie-text"
                >
                    This website uses cookies to enhance the user experience.
                </CookieConsent>

                {/* ------------------------------------- Intro --------------------------------------*/}
                <section id="intro-section">

                    <div className="intro fade-in">
                    <button><img className="logo grow" src={Logo} alt="logo" onClick={(e) => navigate(e, "get-started-section")}></img></button>
                        <h3 >The Flexible Student Budget App</h3>
                        <h3>How much <span className="gold">cash</span> do you want to <span className="blue">splash</span>?</h3>
                    </div>
                    

                </section>

                {/* ---------------------------------- Get Started ----------------------------------------- */}

                <section id="get-started-section">

                <SectionHeading
                    name="Get Started"
                    icon="fas fa-rocket icon"
                />

                <Container fluid>
                    <div className="card-section">
                        <Card>
                            <Card.Body>
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
                                
                            </Card.Body>
                        </Card>
                    </div>

                    {(width < tabletBreakpoint) &&

                    <div className="card-section">
                    <Alert className="card alert" variant="primary" >
                        <h3>Try saving this web app to your mobile's homescreen for quick access and a native (app store) app experience.</h3>
                    </Alert>
                    </div>}

                </Container>

                

                </section>
                    
                        
                {/* -------------------------------------Account Section -------------------------------------*/}


                <section id="account-section">


                <Container fluid>
                    <SectionHeading name="Account" icon="fas fa-user icon"/>

                    <div className="card-section">
                        <Card>
                            {signedIn ? 
                            <div>

                                <Card.Body>
                                <div className="account-details">
                                    <h3 className="blue">Signed in as {firebase.auth().currentUser.displayName}</h3>
                                    {firebase.auth().currentUser.photoURL && 
                                        <img className="profile-picture" src={firebase.auth().currentUser.photoURL} alt=""/>}
                                    <Button variant="secondary" onClick={signOut}>Sign Out</Button>  
                                </div>
                                
                                
                                    <h3>Save Status</h3>
                                    {lastSaved ? <p className="save-status blue">Last saved on {(new Date(lastSaved)).toLocaleString()}</p> : 
                                <p className="save-status gold">You are yet to save any data</p>}
                                <h3>Load Status</h3>
                                {lastLoad ? <p className="green">{lastLoad}</p> : <p className="gold">Data not yet loaded</p>}
                                
                            </Card.Body>
                            </div>
                                
                            : 
                            
                            <div className="firebase-auth">
                            <p className="input-description">Sign in to unlock the 'Save' and 'Load' features</p>  
                            <Card.Body>      
                                <p>Data saves in your local browser. To access from a different device/browser, create an account.</p>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                            </Card.Body>
                            </div>  

                            }
                                <Row>
                                    <Col><Button disabled={!signedIn} variant="secondary" onClick={() => save(firebase.auth().currentUser.uid)}>Save</Button></Col>
                                    <Col><Button disabled={!signedIn} variant="secondary" onClick={() => load(firebase.auth().currentUser.uid)}>Load</Button></Col>
                                    <Col><Button variant="secondary" onClick={() => resetData()}>Reset</Button></Col>
                                </Row>

                        </Card>
                    </div>
                    
                </Container>

                </section>
               
               
                {/* ------------------------------------------Date input ------------------------------------------*/}
                   
                <section id="date-section">

                <Container fluid>
                    <SectionHeading name="Dates" icon="fas fa-clock icon"/>
                    <div className="card-section">
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
                            <p className="date-range"> Date Range: {total_weeks} Weeks</p>
                        </Card>
                    </div>
                </Container>

                </section>  
                    
                {/* ----------------------------------------Income Section ----------------------------------------*/}
                <section id="income-section">

                    <Container fluid>

                        <SectionHeading name="Income" icon="fas fa-money-check icon"/>

                        <div className="card-section">
                        <Alert className="card alert" variant="warning">
                            <p>
                                <strong>ONLY </strong>
                                include income that you will receive within your specified date period. 
                                <br/>
                                <strong>DO NOT </strong>
                                include any income that you have already received.
                            </p>
                        </Alert>
                        </div>
                        

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
                        name="Rent Cost"
                        perStudent={true}
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
                                name="Average Household Bills"
                                perStudent={true}
                                example="i.e Energy, Water and Broadband"
                                average="(Usually ~£50 per month)"
                                inputType="money"
                                userMonthlyWeekly={inputObject.bills_cost_MonthlyWeekly}
                                id="bills_cost"
                                submitValue={submitValue}
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
                            average="(Usually ~£30 per week)"
                            detail="Per Week"
                            userValue={inputObject.groceries_cost}
                            />

                        <Alert className="card alert" variant="primary" >
                            <h2>Tip!</h2>
                            <p>Get a starter credit card and only use it for your weekly food shop to build your credit rating.</p>
                        </Alert>

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

                        <div className="card-section">
                            <Card bg="dark" text="white" className="results-card">
                                <Card.Body>
                                    <div className="results-card-section">
                                        <DisposableCash 
                                        id="disposable_cash"/>
                                    </div>
                                    
                                    <div className="results-card-section">
                                        <EndBalance 
                                        id="end_balance"
                                        />
                                    </div>
                                </Card.Body>

                                <Button disabled={isNaN(endBalance)} onClick={() => endEqualStartBalance()} className="setBalance" variant="primary">Set 'End Balance' equal to 'Start Balance'</Button>

                            </Card>
                        </div>
                        

                        {(disposable_cash < 0) &&
                            <div className="card-section">
                                <Alert className="card alert" variant="danger">
                                    {`It looks like your 'Weekly Cash to Splash' budget is negative. This means that unless you find another income source equivalent to at least £${Math.round(disposable_cash)*-1} per week, or cut expenditure, you will finish your budgeting period with less than you started with regardless.`} <p><strong>Update your 'Weekly Cash to Splash' budget with a positive number.</strong></p>
                                </Alert>
                            </div>
                            }

                        {
                        signedIn ? 
                        <div>
                                <Button variant="outline-primary" className="card-body save" onClick={() => save(firebase.auth().currentUser.uid)}>Save</Button>
                                <p className="save-status">{saveStatus}</p>
                        </div> :
                        <div>
                            <button className="save-unlock blue-hover" onClick={(e) => navigate(e, "account-section")}><h3 ><span className="blue">Sign-In</span> to unlock the 'Save' feature.</h3></button>
                        </div>
                        }
                        
                        {(!isNaN(end_balance) && disposable_cash >= 0) ?
                        <div className="card-section now-what">
                            <Alert className="card alert" variant="primary">
                                <h2>Now what?</h2>
                                <p>
                                    {`Assuming you start budgeting on ${formatDateUk(inputObject.start_date)} with a starting bank balance of £${inputObject.start_balance}; If you stick to a weekly non-essentials budget of £${Math.round(disposable_cash)}, you should have a bank balance of £${end_balance} on ${formatDateUk(inputObject.end_date)}.`}
                                </p>
                                <p>
                                    The best way to stick to your budget is to set up a weekly standing order to a secondary bank account that will only be used for non-essentials. A good day for your standing order is a Monday, to avoid spending all of your weekly budget on the weekend!
                                </p>
                            </Alert>
                        </div>
                         : null}

                    </Container>
                </section>

                {/* ------------------------ Recommended deals section --------- */}
                {/* <section id="recommended-section">
                    <Container fluid>

                        <SectionHeading 
                            name="Recommended"
                            icon="fas fa-graduation-cap icon" />

                            <div className="card-section">
                                <Card>
                                    <h3>Make Easy Money with Risk Free Matched betting</h3>
                                    <Card.Body>
                                        <div className="profit-accum">
                                        <img src="data:image/jpeg;base64,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" alt=""/>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        
                            <div className="card-section">
                                <Card>
                                    <h3>6 Months Free Amazon Prime then half price</h3>
                                    <Card.Body>
                                        <div className="amazonAd">
                                    <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=12&l=ur1&category=amazon_student&banner=1MPKS9R97RJNF16VHS02&f=ifr&linkID=c93d258e9d0733040135dc6a65625d48&t=uniclarity-21&tracking_id=uniclarity-21" width="300" height="250" scrolling="no" border="0" marginwidth="0" frameborder="0"></iframe>
                                    </div>
                                    </Card.Body>
                                    
                                </Card>
                            </div>
                                

                            <div className="card-section">
                                <Card>
                                    <h3>Get a Free Book with an Audible Trial</h3>
                                    <Card.Body>
                                        <div className="audible-ad">
                                            <iframe src="https://rcm-eu.amazon-adsystem.com/e/cm?o=2&p=12&l=ur1&category=audible&banner=1P1953W62EJ3357X7V82&f=ifr&linkID=e0652dda944f118a8d26f0ab3b8e095e&t=uniclarity-21&tracking_id=uniclarity-21" width="300" height="250" scrolling="no" border="0" marginwidth="0" style={{border:"none"}} frameborder="0"></iframe>
                                        </div>
                                    </Card.Body>        
                                </Card>
                            </div>

                    </Container>
                    </section> */}
                
                    <Footer/>
                
            </Col>
                        

                        
           </Row>
          </SubmitContext.Provider>
        
    )

}

export default App;