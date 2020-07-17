import React from 'react';
import { Link } from "react-router-dom";
import Logo from "./graduation-hat.png"



const Home = () => {
    return (
        <div className="home-whole">

            <div className="container-fluid home-top">
                <img src={Logo} alt="Logo" className="home-logo"/>
                <h1 className="home-title">
                    Uni
                    <span className="clarity">Clarity</span>
                </h1>
            </div>

            <div className="container-fluid home-middle">
                <h1>Don't stu<span className="dent">dent</span> the bank.</h1>
                <p className="introduction-text">Get a weekly disposable cash budget linked to your end of year bank balance.</p>
            </div>

            <div className="container-fluid home-bottom">
                <Link to="/app">
                    <h3 className="home-start">Save the Overdraft</h3>
                </Link>
            </div>
        </div>
    )

}

export default Home