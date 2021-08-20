import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Alert, Button, Row, Col, Container } from 'react-bootstrap';
import Logo from './icon-512.png';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { authChange, signOut, db, uiConfig, firebase } from './firebaseConfig';
import 'firebase/analytics';
import CookieConsent from 'react-cookie-consent';

//Components
import NavBar from './components/Navbar';
import Summary from './components/Summary';
import SectionHeading from './components/SectionHeading';
import DateRangeInput from './components/DateRangeInput';
import InputCard from './components/InputCard';
import RecurringExpenseTable from './components/RecurringExpenseTable';
import ExpenseInput from './components/ExpenseInput';
import OneOffExpenseTable from './components/OneOffExpenseTable';
import SubmitContext from './context/submit-context';
import RentIncluded from './components/RentIncluded';
import BillsIncluded from './components/BillsIncluded';
import RentPayments from './components/RentPayments';
import AdditionalIncome from './components/AdditionalIncome';
import InputName from './components/InputName';
import EndBalance from './components/EndBalance';
import DisposableCash from './components/DisposableCash';
import Help from './components/Help';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';

const App = () => {
  firebase.analytics();

  const today = new Date();
  const firstDayNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  // Computer string formatted date - yyyy-mm-dd
  function formatDateComp(date) {
    const dt = new Date(date);
    let day = dt.getDate();
    if (day < 10) day = '0' + day.toString();
    let month = dt.getMonth() + 1;
    if (month < 10) month = '0' + month.toString();
    const year = dt.getFullYear().toString();
    return year + '-' + month + '-' + day;
  }

  // UK string formatted date - dd/mm/yyyy
  function formatDateUk(date) {
    const dt = new Date(date);
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    return `${day}/${month}/${year}`;
  }

  //-------------------------------------------------- Object of User Inputs

  const defaultInputObject = {
    //Dates
    start_date: '2020-09-28',
    end_date: '2021-06-01',
    //Income
    maintenance_loan: '',
    additional_income: '',
    //Rent
    include_rent: 'yes',
    rent_cost: '',
    rent_cost_MonthlyWeekly: 'monthly',
    rent_payment_period: '',
    next_rent_payment: formatDateComp(firstDayNextMonth),
    last_rent_payment: '2021-06-01',
    contract_start: '2020-07-01',
    contract_end: '2021-06-30',
    total_payments: '',
    payments_left: '',
    bills_included: 'no',
    bills_cost: '',
    bills_cost_MonthlyWeekly: 'monthly',
    //Groceries
    groceries_cost: '',
    start_balance: '0',
    input_choice: 'range',
    disposable_cash: '0',
  };

  // -------------------------------------------- Main Input Object

  const [inputObject, setInputObject] = useState(defaultInputObject);
  //   JSON.parse(localStorage.getItem('inputObject')) || defaultInputObject;

  function submitValue(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    setInputObject((prevObject) => ({ ...prevObject, [inputName]: value }));
  }

  // ------------------------------------------------ Additional Income Array

  const [incomeArray, setIncomeArray] = useState(
    JSON.parse(localStorage.getItem('incomeArray')) || []
  );

  function submitIncomeSource(name, value, period) {
    setIncomeArray((prevObject) => [
      ...prevObject,
      {
        key: uuidv4(),
        name: name,
        value: value,
        period: period,
      },
    ]);
  }

  function deleteIncomeSource(id) {
    setIncomeArray((prevArray) => {
      return prevArray.filter((expense) => {
        return expense.key !== id;
      });
    });
  }

  //-------------------------------------------------- Recurring Expenses Array

  const [recurringExpenseArray, setRecurringExpenseArray] = useState(
    JSON.parse(localStorage.getItem('recurringExpenseArray')) || []
  );

  function submitRecurringExpense(expenseName, weeklyCost) {
    setRecurringExpenseArray((prevObject) => [
      ...prevObject,
      { key: uuidv4(), name: expenseName, cost: weeklyCost },
    ]);
  }

  function deleteRecurringExpense(id) {
    setRecurringExpenseArray((prevArray) => {
      return prevArray.filter((expense) => {
        return expense.key !== id;
      });
    });
  }

  //--------------------------------------------------One-Off Expenses Array

  const [oneOffExpenseArray, setOneOffExpenseArray] = useState(
    JSON.parse(localStorage.getItem('oneOffExpenseArray')) || []
  );

  function submitOneOffExpense(expenseName, weeklyCost) {
    setOneOffExpenseArray((prevObject) => [
      ...prevObject,
      { key: uuidv4(), name: expenseName, cost: weeklyCost },
    ]);
  }

  function deleteOneOffExpense(id) {
    setOneOffExpenseArray((prevArray) => {
      return prevArray.filter((expense) => {
        return expense.key !== id;
      });
    });
  }

  //------------------------------------------------------- Results Calculations

  //Find weeks between two dates
  const weeks = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.abs(d2 - d1);
    const weeks = diff / (1000 * 60 * 60 * 24 * 7);
    return Math.round(weeks);
  };
  // Total number of weeks user has selected
  const total_weeks = weeks(inputObject.start_date, inputObject.end_date);

  // Convert additonal income array into array of total income amounts
  const additional_income_array = incomeArray?.map(function (element) {
    if (element.period === 'total') {
      return +element.value;
    } else if (element.period === 'monthly') {
      return (+element.value * total_weeks) / 4.345;
    } else if (element.period === 'weekly') {
      return +element.value * total_weeks;
    } else return 0;
  });
  // Reduce total additonal income array to single value
  const additional_income_total = additional_income_array.reduce(
    (sum, currentValue) => sum + +currentValue,
    0
  );

  const total_income = +inputObject.maintenance_loan + +additional_income_total;
  // ---------- Rent Calcs
  // Total weeks rent is being paid
  const rent_weeks =
    inputObject.rent_payment_period &&
    (inputObject.rent_payment_period === 'monthly'
      ? weeks(inputObject.next_rent_payment, inputObject.last_rent_payment)
      : weeks(inputObject.contract_start, inputObject.contract_end));
  // Weekly cost of rent
  const weekly_rent =
    inputObject.rent_cost_MonthlyWeekly === 'monthly'
      ? +inputObject.rent_cost / 4.345
      : +inputObject.rent_cost;
  // Weekly cost of bills
  const weekly_bills =
    inputObject.bills_included === 'no'
      ? inputObject.bills_cost_MonthlyWeekly === 'monthly'
        ? +inputObject.bills_cost / 4.345
        : +inputObject.bills_cost
      : 0;
  // Combine rent and bills multiplied by total weeks
  const total_rent_bills =
    inputObject.include_rent === 'yes'
      ? inputObject.rent_payment_period === 'monthly'
        ? (weekly_rent + weekly_bills) *
          4.345 *
          Math.round(1 + rent_weeks / 4.345)
        : (((weekly_rent + weekly_bills) * rent_weeks) /
            +inputObject.total_payments) *
          +inputObject.payments_left
      : weekly_bills * total_weeks;

  // ---------- Groceries Calcs
  // Weekly groceries cost
  const weekly_groceries = +inputObject.groceries_cost;
  // Total groceries cost usign weekly cost x total weeks
  const total_groceries = weekly_groceries * total_weeks;
  // ---------- Expense Calcs
  const weekly_recurring_expenses = recurringExpenseArray.reduce(
    (sum, currentValue) => sum + +currentValue.cost,
    0
  );

  const total_recurring_expenses = weekly_recurring_expenses * total_weeks;

  const total_one_off_expenses = oneOffExpenseArray.reduce(
    (sum, currentValue) => sum + +currentValue.cost,
    0
  );

  const total_expenses = total_recurring_expenses + total_one_off_expenses;

  // Results Calcs
  const disposable_cash = +inputObject.disposable_cash;

  const start_balance = +inputObject.start_balance;

  const end_balance = Math.round(
    total_income +
      start_balance -
      total_rent_bills -
      total_groceries -
      total_recurring_expenses -
      total_one_off_expenses -
      disposable_cash * total_weeks
  );

  // ----------------------------------------------------------- Results State

  const [endBalance, setEndBalance] = useState();

  // Set start balance and end balance equal by changing weekly cash to splash to spend all income
  function endEqualStartBalance() {
    const default_disposable =
      (total_income +
        start_balance -
        total_rent_bills -
        total_groceries -
        total_recurring_expenses -
        total_one_off_expenses -
        start_balance) /
      total_weeks;
    setInputObject((prevObject) => ({
      ...prevObject,
      disposable_cash: +default_disposable,
    }));
  }

  // --------------------------------------------- On user input updates store in localStorage and update end balance

  useEffect(() => {
    setEndBalance(end_balance);
    localStorage.setItem('inputObject', JSON.stringify(inputObject));
    localStorage.setItem('incomeArray', JSON.stringify(incomeArray));
    localStorage.setItem(
      'recurringExpenseArray',
      JSON.stringify(recurringExpenseArray)
    );
    localStorage.setItem(
      'oneOffExpenseArray',
      JSON.stringify(oneOffExpenseArray)
    );
  }, [
    inputObject,
    recurringExpenseArray,
    oneOffExpenseArray,
    incomeArray,
    end_balance,
  ]);

  //--------------------------------------- Fire Base Sign In/Out

  // Signed-in State
  const [signedIn, setSignedIn] = useState(false);

  // What to do when user signs in/out
  useEffect(() => {
    authChange((user) => {
      setSignedIn(!!user);
      if (user) {
        db.collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setLastSaved(doc.data().last_saved);
            }
          });
      } else if (!user) {
        setLastSaved();
        setLastLoad();
      }
    });
  }, [signedIn]);

  //------------------------------------------ Firestore Data Management

  const [saveStatus, setSaveStatus] = useState();
  const [lastSaved, setLastSaved] = useState();
  const [lastLoad, setLastLoad] = useState();

  // Save Data to Firestore
  function save(userID) {
    db.collection('users')
      .doc(userID)
      .set({
        inputObject,
        incomeArray,
        recurringExpenseArray,
        oneOffExpenseArray,
        last_saved: today.toString(),
      })
      .then(function () {
        setLastSaved(today.toString());
        setSaveStatus(`Save Successful on ${today}`);
      })
      .catch(function (error) {
        console.error('Error adding user data: ', error);
      });
  }

  // Load Data from Firestore
  function load(userID) {
    db.collection('users')
      .doc(userID)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setInputObject(doc.data().inputObject);
          setIncomeArray(doc.data().incomeArray);
          setRecurringExpenseArray(doc.data().recurringExpenseArray);
          setOneOffExpenseArray(doc.data().oneOffExpenseArray);
          setLastSaved(doc.data().last_saved);
          setLastLoad('Data Loaded Successfully');
        } else {
          console.log('No user data!');
        }
      })
      .catch(function (error) {
        console.log('Error getting user data:', error);
      });
  }

  // Reset Data
  function resetData() {
    setInputObject(defaultInputObject);
    setIncomeArray([]);
    setRecurringExpenseArray([]);
    setOneOffExpenseArray([]);
    setLastLoad();
  }

  // ----------------------------------------------------- Show/Hide State

  const [welcome, setWelcome] = useState(true);

  const [showHelp, setShowHelp] = useState(false);

  const [showSummary, setShowSummary] = useState(false);

  // ----------------------------------------------------- Show/Hide Rent/Bills

  const [showRent, setShowRent] = useState();

  useEffect(() => {
    if (inputObject.include_rent === 'yes') {
      setShowRent(true);
    } else if (inputObject.include_rent === 'no') {
      setShowRent(false);
    }
  }, [inputObject.include_rent]);

  const [showBills, setShowBills] = useState();

  useEffect(() => {
    if (inputObject.bills_included === 'yes') {
      setShowBills(false);
    } else if (inputObject.bills_included === 'no') {
      setShowBills(true);
    }
  }, [inputObject.bills_included]);

  // ----------------------------------------------------- Viewport State

  //State of Screen width
  const [width, setWidth] = useState(window.innerWidth);

  // Screen width pixels for tablets
  const tabletBreakpoint = 767;

  // When screen is resized
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Fix instagram window.innerwidth issue
  useEffect(() => {
    if (window.screen.width < window.innerWidth) {
      setWidth(window.screen.width);
    }
  }, []);

  // -------------------------------------- JavaScript Navigation (prevent URL change on link press)

  function navigate(e, section) {
    e && e.preventDefault(); // to avoid the link from redirecting
    document.getElementById(section).scrollIntoView();
  }

  // --------------------------------------------------------------------------Start of Rendered App
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
        setShowSummary,
        inputObject,
        endBalance,
        incomeArray,
        oneOffExpenseArray,
        recurringExpenseArray,
        welcome,
        setWelcome,
      }}
    >
      {welcome ? (
        <WelcomeScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', duration: 1.5 }}
        >
          {/* --------------------------------------------Navbar --------------------------------------------*/}
          <NavBar />

          <Row>
            {/* Help and summary descriptions */}
            <div>
              <p className="button-description-help">Help</p>
              {width < tabletBreakpoint ? (
                <p className="button-description-summary">Summary</p>
              ) : null}
            </div>

            {/* ------------------------------------ Help Section ------------------------------------ */}

            {showHelp ? <Help /> : null}

            {/* -------------------------------------Summary Div ----------------------------*/}

            {showSummary === true || width > tabletBreakpoint ? (
              <Col className="summary" md={4}>
                <Summary
                  total_weeks={total_weeks}
                  total_income={total_income}
                  total_rent_bills={total_rent_bills}
                  total_groceries={total_groceries}
                  total_expenses={total_expenses}
                  disposable_cash={disposable_cash}
                  end_balance={end_balance}
                />
              </Col>
            ) : null}

            {/*--------------------------------------- Main Div------------------------------*/}
            <Col className="main" md={8}>
              {/* Show Summary Button */}
              {width < tabletBreakpoint ? (
                <button
                  onClick={() => setShowSummary(!showSummary)}
                  className="show-summary overlay-button"
                >
                  {showSummary === false ? (
                    <i className="far fa-chart-bar icon"></i>
                  ) : (
                    <i className="fas fa-times icon close-summary"></i>
                  )}
                </button>
              ) : null}

              {/* Show Help Button */}
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="show-help overlay-button"
              >
                {showHelp === false ? (
                  <i className="fas fa-question-circle icon"></i>
                ) : (
                  <i className="fas fa-times icon close-help"></i>
                )}
              </button>

              {/* Cookie Consent */}
              <CookieConsent
                acceptOnScroll={true}
                buttonClasses="cookie-accept"
                contentClasses="cookie-text"
              >
                This website uses cookies to enhance the user experience.
              </CookieConsent>

              {/* ------------------------------------- Intro --------------------------------------*/}
              {/* <section id="intro-section">
            <div className="intro fade-in">
              <button>
                <img
                  className="logo grow"
                  src={Logo}
                  alt="logo"
                  onClick={(e) => navigate(e, 'get-started-section')}
                ></img>
              </button>
              <h3>The Flexible Student Budget Calculator</h3>
              <h3>
                How much <span className="gold">cash</span> can you
                <span className="blue"> splash</span>?
              </h3>
            </div>
          </section> */}

              {/* ---------------------------------- Get Started ----------------------------------------- */}

              <section className="get-started" id="get-started-section">
                <SectionHeading name="Get Started" icon="fas fa-rocket icon" />

                <Container fluid>
                  <div className="card-section">
                    <Card>
                      <Card.Body>
                        <p>
                          We'll help you find a 'Weekly Cash to Splash'
                          allowance. An amount you can spend on whatever you
                          want, every week. After filling in all of the
                          sections, you'll settle on an amount when you are
                          happy with your end bank balance.
                        </p>
                        <p>
                          With your 'Weekly Cash to Splash', just set up a
                          weekly standing order to another account and you've
                          got yourself a weekly pay day with guilt free
                          spending.
                        </p>
                        <p>
                          Use <strong>Summary</strong> (top right button on
                          mobile) for an overview of the amounts you have
                          entered so far.
                        </p>
                        <p>
                          Use <strong>Help</strong> (top left button) for more
                          details if you get stuck.
                        </p>
                      </Card.Body>
                    </Card>
                  </div>

                  {width < tabletBreakpoint && (
                    <div className="card-section">
                      <Alert className="card alert" variant="primary">
                        <h3>
                          To install this app, save it to your mobile's
                          homescreen.
                        </h3>
                      </Alert>
                    </div>
                  )}
                </Container>
              </section>

              {/* -------------------------------------Account Section -------------------------------------*/}

              <section id="account-section">
                <Container fluid>
                  <SectionHeading name="Account" icon="fas fa-user icon" />

                  <div className="card-section">
                    <Card>
                      {signedIn ? (
                        <div>
                          <Card.Body>
                            <div className="account-details">
                              <h3 className="blue">
                                Signed in as{' '}
                                {firebase.auth().currentUser.displayName ||
                                  firebase.auth().currentUser.email}
                              </h3>
                              {firebase.auth().currentUser.photoURL && (
                                <img
                                  className="profile-picture"
                                  src={firebase.auth().currentUser.photoURL}
                                  alt=""
                                />
                              )}
                              <Button variant="secondary" onClick={signOut}>
                                Sign Out
                              </Button>
                            </div>

                            <h3>Save Status</h3>
                            {lastSaved ? (
                              <p className="save-status blue">
                                Last saved on{' '}
                                {new Date(lastSaved).toLocaleString()}
                              </p>
                            ) : (
                              <p className="save-status gold">
                                You are yet to save any data
                              </p>
                            )}
                            <h3>Load Status</h3>
                            {lastLoad ? (
                              <p className="green">{lastLoad}</p>
                            ) : (
                              <p className="gold">Data not yet loaded</p>
                            )}
                          </Card.Body>
                        </div>
                      ) : (
                        <div className="firebase-auth">
                          <p className="input-description">
                            Sign in to unlock the 'Save' and 'Load' features
                          </p>
                          <Card.Body>
                            <p>
                              Data saves in your local browser. To access from a
                              different device/browser, create an account.
                            </p>
                            <StyledFirebaseAuth
                              uiConfig={uiConfig}
                              firebaseAuth={firebase.auth()}
                            />
                          </Card.Body>
                        </div>
                      )}
                      <Row>
                        <Col>
                          <Button
                            disabled={!signedIn}
                            variant="secondary"
                            onClick={() =>
                              save(firebase.auth().currentUser.uid)
                            }
                          >
                            Save
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            disabled={!signedIn}
                            variant="secondary"
                            onClick={() =>
                              load(firebase.auth().currentUser.uid)
                            }
                          >
                            Load
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="secondary"
                            onClick={() => resetData()}
                          >
                            Reset
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                </Container>
              </section>

              {/* ------------------------------------------Date input ------------------------------------------*/}

              <section id="date-section">
                <Container fluid>
                  <SectionHeading name="Dates" icon="fas fa-clock icon" />
                  <div className="card-section">
                    <Card>
                      <InputName name="Select budgeting period" />
                      <DateRangeInput
                        date1_name="Start Date"
                        date2_name="End Date"
                        date1_id="start_date"
                        date2_id="end_date"
                        startDate={inputObject.start_date}
                        endDate={inputObject.end_date}
                      />
                      <p className="date-range">
                        {' '}
                        Date Range: {total_weeks} Weeks
                      </p>
                    </Card>
                  </div>
                </Container>
              </section>

              {/* ----------------------------------------Income Section ----------------------------------------*/}
              <section id="income-section">
                <Container fluid>
                  <SectionHeading
                    name="Income"
                    icon="fas fa-money-check icon"
                  />

                  <div className="card-section">
                    <Alert className="card alert" variant="warning">
                      <p>
                        <strong>ONLY </strong>
                        include income that you will receive within your
                        specified date period.
                        <br />
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

                  <AdditionalIncome />
                </Container>
              </section>
              {/* -----------------------------------------Rent Section ------------------------------------------*/}
              <section id="rent-section">
                <Container fluid>
                  <SectionHeading name="Rent & Bills" icon="fas fa-home icon" />

                  {/* Paying own rent? */}
                  <RentIncluded />

                  {showRent && (
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
                  )}

                  {/* Bills Included in Rent? */}
                  <BillsIncluded />

                  {/* Household Bills Cost */}

                  {showBills && (
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
                        userValue={inputObject.bills_cost}
                      />
                    </div>
                  )}
                </Container>
              </section>

              {/* -----------------------------------------Food Section ------------------------------------------*/}
              <section id="food-section">
                <Container fluid>
                  <SectionHeading
                    name="Food"
                    icon="fas fa-shopping-cart icon"
                  />

                  {/* Groceries Cost */}
                  <InputCard
                    name="How much do you typically spend on food in a week?"
                    example="Not takeaways!"
                    inputType="money"
                    id="groceries_cost"
                    average="(Usually ~£30 per week)"
                    detail="Per Week"
                    userValue={inputObject.groceries_cost}
                  />

                  <Alert className="card alert" variant="primary">
                    <h2>Tip!</h2>
                    <p>
                      Get a starter credit card and only use it for your weekly
                      food shop to build your credit rating.
                    </p>
                  </Alert>
                </Container>
              </section>
              {/* -------------------------------------------Expenses Section----------------------------------------- */}
              <section id="expenses-section">
                <Container fluid>
                  <SectionHeading name="Expenses" icon="fas fa-receipt icon" />

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

                  <ExpenseInput id="one_off_expense" />

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
                          <DisposableCash id="disposable_cash" />
                        </div>

                        <div className="results-card-section">
                          <EndBalance id="end_balance" />
                        </div>
                      </Card.Body>

                      <Button
                        disabled={isNaN(endBalance)}
                        onClick={() => endEqualStartBalance()}
                        className="setBalance"
                        variant="primary"
                      >
                        Set 'End Balance' equal to 'Start Balance'
                      </Button>
                    </Card>
                  </div>

                  {disposable_cash < 0 && (
                    <div className="card-section">
                      <Alert className="card alert" variant="danger">
                        {`It looks like your 'Weekly Cash to Splash' budget is negative. This means that unless you find another income source equivalent to at least £${
                          Math.round(disposable_cash) * -1
                        } per week, or cut expenditure, you will finish your budgeting period with less than you started with regardless.`}{' '}
                        <p>
                          <strong>
                            Update your 'Weekly Cash to Splash' budget with a
                            positive number.
                          </strong>
                        </p>
                      </Alert>
                    </div>
                  )}

                  {signedIn ? (
                    <div>
                      <Button
                        variant="outline-primary"
                        className="card-body save"
                        onClick={() => save(firebase.auth().currentUser.uid)}
                      >
                        Save
                      </Button>
                      <p className="save-status">{saveStatus}</p>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="save-unlock blue-hover"
                        onClick={(e) => navigate(e, 'account-section')}
                      >
                        <h3>
                          <span className="blue">Sign-In</span> to unlock the
                          'Save' feature.
                        </h3>
                      </button>
                    </div>
                  )}

                  {!isNaN(end_balance) && disposable_cash >= 0 ? (
                    <div className="card-section now-what">
                      <Alert className="card alert" variant="primary">
                        <h2>Now what?</h2>
                        <p>
                          {`Assuming you start budgeting on ${formatDateUk(
                            inputObject.start_date
                          )} with a starting bank balance of £${
                            inputObject.start_balance
                          }; If you stick to a weekly non-essentials budget of £${Math.round(
                            disposable_cash
                          )}, you should have a bank balance of £${end_balance} on ${formatDateUk(
                            inputObject.end_date
                          )}.`}
                        </p>
                        <p>
                          The best way to stick to your budget is to set up a
                          weekly standing order to a secondary bank account that
                          will only be used for non-essentials. A good day for
                          your standing order is a Monday, to avoid spending all
                          of your weekly budget on the weekend!
                        </p>
                        <h3>
                          Come back and update regularly to make sure you're
                          still on track.
                        </h3>
                      </Alert>
                    </div>
                  ) : null}
                </Container>
              </section>

              {/* ------------------------ Recommended deals section --------- */}
              <section id="recommended-section">
                <Container fluid>
                  <SectionHeading
                    name="Recommended"
                    icon="fas fa-graduation-cap icon"
                  />

                  <div className="card-section">
                    <Card>
                      <h3 className="blue">
                        Make Extra Cash with Matched Betting
                      </h3>
                      <div className="recommended-logo-container">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.profitaccumulator.co.uk/idevaffiliate/idevaffiliate.php?id=9426"
                        >
                          <img
                            className="profitaccum-logo"
                            src="https://s3-eu-west-1.amazonaws.com/tpd/logos/58fc6fac0000ff0005a106d5/0x0.png"
                            alt="profit_accumulator_logo"
                          />
                        </a>
                      </div>

                      <Card.Body>
                        <p className="recommended-text">
                          Some of the easiest money to be made at Uni, and we
                          can vouch. Matched betting uses betting companies'
                          sign-up offers to remove the risks of traditional
                          betting. Try the free trial and see for yourself.
                        </p>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.profitaccumulator.co.uk/idevaffiliate/idevaffiliate.php?id=9426"
                        >
                          <Button className="recommended-button">
                            Make some Cash
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="card-section">
                    <Card>
                      <h3 className="blue">
                        6 Months Free Amazon Prime then half price
                      </h3>
                      <div className="recommended-logo-container">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="http://www.amazon.co.uk/joinstudent?tag=uniclarity-21"
                        >
                          <img
                            className="prime-logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Amazon_prime_student.png"
                            alt=""
                          />
                        </a>
                      </div>
                      <Card.Body>
                        <p className="recommended-text">
                          An essential subscription while you're at Uni, so why
                          not get 6 months for free.
                        </p>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="http://www.amazon.co.uk/joinstudent?tag=uniclarity-21"
                        >
                          <Button className="recommended-button">
                            Get Deal
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="card-section">
                    <Card>
                      <h3 className="blue">
                        Get a Free Audio Book with an Audible Trial
                      </h3>

                      <div className="recommended-logo-container">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.amazon.co.uk/Audible-Membership/dp/B00OPA2XFG?actionCode=AMN30DFT1Bk06604291990WX&tag=uniclarity-21"
                        >
                          <img
                            className="audible-logo"
                            src="https://logos-download.com/wp-content/uploads/2016/09/Audible_logo_an_Amazon_company.png"
                            alt=""
                          />
                        </a>
                      </div>

                      <Card.Body>
                        <p className="recommended-text">
                          Being able to consume books while doing other tasks is
                          invaluable as a time strapped student, and you can't
                          say no to a free book.
                        </p>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.amazon.co.uk/Audible-Membership/dp/B00OPA2XFG?actionCode=AMN30DFT1Bk06604291990WX&tag=uniclarity-21"
                        >
                          <Button className="recommended-button">
                            Get Deal
                          </Button>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>

                  <p className="affiliate-disclosure">
                    We may receive a payment in connection with purchases of
                    products or services featured in this section.
                  </p>
                </Container>
              </section>

              <Footer />
            </Col>
          </Row>
        </motion.div>
      )}
    </SubmitContext.Provider>
  );
};

export default App;
