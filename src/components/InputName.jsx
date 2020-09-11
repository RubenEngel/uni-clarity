import React from "react"

const InputName = (props) => {
    return (
    
    <div>
        <p className="input-description">{props.name}</p>
        {(props.perStudent) && <p className="amatic-sc per-student"> (Per Student)</p>}
        <p className="example">{props.example}</p>
        <p className="example">{props.average}</p>
    </div>

    )
}

export default InputName