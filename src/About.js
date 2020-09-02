import React from "react"
import NavBarAlternate from "./components/NavBarAlternate"
import Footer from "./components/Footer"

const About = () => {
    return (
        <div className="subpage">
            <NavBarAlternate/> 

            <section id="about-section">
                <div className="subpage-content">
                  <h1>About</h1>
                    <p>
                    UniClarity was developed from identifying a lack of guided support for student budgeting. There are some great solutions for tracking what you have been spending, but you need to figure out what you should be spending first. 
                    Going through university the creator of UniClarity saw that the only good way of calculating a budget was to set up an excel sheet, which of course requires technical knowledge of excel, and knowledge of the expenses you need to take into account. The very few online student budgeting tools that existed were much too rigid in the way that questions were asked. 
                    Questions such as how much you spend each month on socialising, when this changes all the time. This web app can replace an excel due to its flexibility and personalisation capabilities.
                    </p>
                    <p>
                    UniClarity helps students to calculate how much they should be aiming to spend throughout the year, while not asking any questions you don’t have a somewhat consistent number for. 
                    It accomplishes this by guiding each user through the things they must take into account, in a logical and clear process. The final outcome helps you to find an amount that you can spend every week on whatever you please. For example, this may be a night out, or a meal at a restaurant. 
                    You decide on this amount by settling at a value that results in an end bank balance you are happy with. In turn removing the guilt and mystery that surrounds student non-essential spending.
                    </p>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default About