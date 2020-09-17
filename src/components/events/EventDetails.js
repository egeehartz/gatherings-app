import React from "react"

export const EventDetails = (props) => {

    return (
    <>
    <div className="savedDetailsContainer">
        <div className="details">
            <div className="label">Host: </div> 
            <div className="input"> {props.event.host}</div>
        </div>
        <div className="details">
            <div className="label">Location: </div> 
            <div className="input"> {props.event.location}</div>
        </div>
        <div className="details">
            <div className="label">Date: </div>
            <div className="input"> {props.event.date}</div>
        </div>
        <div className="details">
            <div className="label">Time:</div> 
            <div className="input"> {props.event.time}</div>
        </div>
    </div>
    <div className="editButton">
        <button onClick={props.func}>Edit</button>
    </div>
        </>
)}


