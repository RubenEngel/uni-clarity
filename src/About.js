import React from "react"
import NavBarAlternate from "./components/NavBarAlternate"
import Footer from "./components/Footer"

const About = () => {
    return (
        <div className="subpage">
            <NavBarAlternate/> 

            <section id="about-section">
                <div className="subpage-content">
                  <h1 className="subpage-title">About</h1>
                    <p>
                    UniClarity was developed from identifying a lack of guided support for student budgeting. There are some great solutions for tracking what you have been spending, but you need to figure out what you should be spending first. 
                    Going through university, the only good way of calculating a budget was to set up an excel sheet, requiring technical knowledge of excel and the expenses you need to take into account.
                    </p>
                    <p>
                    UniClarity helps students to calculate how much they should be aiming to spend throughout the year, while not asking any questions you don’t have a somewhat consistent number for. 
                    It accomplishes this by guiding each user through the things they must take into account, in a logical and clear process. The final outcome helps you to find an amount that you can spend every week on whatever you please. This could be a night out, a trip to the cinema or a meal at a restaurant. 
                    You decide on this amount by settling at a value that results in an end bank balance you are happy with. In turn, removing the guilt and mystery that surrounds student spending.
                    </p>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default About