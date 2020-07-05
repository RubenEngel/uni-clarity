import React from "react"

function InputName(props) {
    return (<div>
    <p className="input-description">{props.name}<span className="detail">{props.detail}</span></p>
    <p className="example">{props.example}</p>
    <p className="example">{props.average}</p>
    </div>

    )
}

export default InputName