import React from "react";


const Card = (props) => {
    

    return (

        <div className={"card"}>
            <img src={props.image} className={"card-img-top"} alt={"Picture of a cat"} />
            <div className={"card-body"}>
                <h5 className={"card-title"}> {props.title}</h5>
                <p className={"card-text"}>{props.description} </p>
                <span>{props.price}</span><br/>
                <button className={"btn btn-primary"}>Boka</button>
            </div>
        </div>

    )
}

export default Card;

