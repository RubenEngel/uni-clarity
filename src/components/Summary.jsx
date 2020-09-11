import React, {useState, useContext} from "react"
import {ToggleButtonGroup} from "react-bootstrap"
import {ToggleButton} from "react-bootstrap"
import SubmitContext from "../context/submit-context"


const Summary = (props) => {

    //--------Set view of summary state
    const [view, setView] = useState("total")

    const {setShowSummary} = useContext(SubmitContext)

    function handleClick(e, section) {
        function navigate(e, section) {
            e && e.preventDefault(); // to avoid the link from redirecting
            document.getElementById(section).scrollIntoView();
        }
        navigate(e, section)
        setShowSummary(false)
    }


    //Component of each section
    const SummarySection = (props) => {

        return (
            <div className="summary-section">
                <div>
                    <button
                    onClick={(e) => handleClick(e, props.href)}>
                        <h3>
                            <i className={props.icon}></i>{props.title}
                        </h3>
                    </button>
                </div>
                <div>
                    {isNaN(props.total)
                        ? <p className="warning">
                                ?</p>
                        : (view === "total"
                            ? <p className="summary-money">
                                    <span className="pound">£</span>{Math.round(props.total)}</p>
                            : <p className="summary-money">
                                <span className="pound">£</span>{(Math.round(props.total / props.total_weeks))}</p>)}
                </div>
            </div>
        )
    }

    return (
            <div>
                <div className="navbar-placeholder"/>
                <div className="summary-content">
                        <div>
                            <h2>Summary<i className="far fa-chart-bar summary-icon"></i></h2>

                            <button
                            onClick={(e) => handleClick(e, "date-section")}>
                                <h3 className="date-range">
                                Date Range: {props.total_weeks} Weeks</h3>
                            </button>
                            
                            <div className="view-button">
                                <ToggleButtonGroup  type="radio" name="summary_view" value={view}>
                                    <ToggleButton
                                        variant="secondary"
                                        value={"total"}
                                        onChange={(e) => setView(e.target.value)}>Total</ToggleButton>
                                    <ToggleButton
                                        variant="secondary"
                                        value={"weekly"}
                                        onChange={(e) => setView(e.target.value)}>Weekly</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    

                    <SummarySection
                        title="Income"
                        icon="fas fa-money-check icon"
                        total={props.total_income}
                        total_weeks={props.total_weeks}
                        href="income-section"/>


                    <SummarySection
                        title="Rent & Bills"
                        icon="fas fa-home icon"
                        total={props.total_rent_bills}
                        total_weeks={props.total_weeks}
                        href="rent-section"/>


                    <SummarySection
                        title="Groceries"
                        icon="fas fa-shopping-cart icon"
                        total={props.total_groceries}
                        total_weeks={props.total_weeks}
                        href="groceries-section"/>



                    <SummarySection
                        title="Expenses"
                        icon="fas fa-receipt icon"
                        total={props.total_expenses}
                        total_weeks={props.total_weeks}
                        href="expenses-section"/>


                        <div className="summary-section">
                            <div className="summary-title">
                                <button 
                                href=""
                                onClick={(e) => handleClick(e, "results-section")}>
                                        <h3>
                                        <i className="fas fa-wallet icon"></i>Weekly Cash to Splash
                                    </h3>
                                </button>
                            </div>
                            <div className="summary-money">
                              <p >
                              <span className="pound">£</span>{Math.round(props.disposable_cash)}</p>
                            </div>
                             
                        </div>

                        <div className="summary-section">
                            <div>
                                <button
                                onClick={(e) => handleClick(e, "results-section")}>
                                <h3>
                                    <i className="fas fa-piggy-bank icon"></i>
                                    End Balance
                                </h3>
                                </button>
                            </div>
                            <div>
                                {isNaN(props.end_balance)
                                    ? <p className="warning">?</p>
                                    : <p className="summary-money">
                                        <span className="pound">£</span>{props.end_balance}</p>}
                            </div>
                        </div>

                </div>
            </div>
    )
}

export default Summary