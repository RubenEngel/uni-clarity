import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <h1 className="navbar-title">Uni<span className="clarity">Clarity</span><i className="fas fa-graduation-cap title-icon"></i></h1>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link nav-heading" href="#income-section">Income<span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link nav-heading" href="#rent-section">Rent</a>
                    <a className="nav-item nav-link nav-heading" href="#food-section">Food</a>
                    <a className="nav-item nav-link nav-heading" href="#expenses-section">Expenses</a>
                    <a className="nav-item nav-link nav-heading" href="#results-section">Results</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar