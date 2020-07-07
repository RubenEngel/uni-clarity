import React from "react"

const SectionHeading = (props) => {
	return(<h2>{props.name}<i className={props.icon}></i></h2>)
}

export default SectionHeading