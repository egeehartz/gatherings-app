import React, {useState, useEffect} from "react"

//this component renders the event details in the planning space
//the edit button toggles edit mode which then renders EventDetailsForm.js
export const EventDetails = (props) => {

   const [date, setDate] = useState('')
    //changes the format of the date from yyyy-mm-dd to mm-dd-yyyy
   useEffect(() => {
       // I wrote || "-" so split has something to do the first time
    const eventDate = props.event.date || "-"
    const splitDate = eventDate.split("-")
    const combinedDate = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0]
    console.log(combinedDate)
    setDate(combinedDate)
   },[]) 

    return (
    <>
    <div className="savedDetailsContainer">
        <div className="details date">
            <div className="labelDone">Date: </div>
            <div className="inputDone"> {date}</div>
        </div>
        <div className="details host">
            <div className="labelDone">Host: </div> 
            <div className="inputDone"> {props.event.host}</div>
        </div>
        <div className="details">
            <div className="labelDone">Location: </div> 
            <div className="inputDone"> {props.event.location}</div>
        </div>
        <div className="details time">
            <div className="labelDone">Time:</div> 
            <div className="inputDone"> {props.event.time}</div>
        </div>
    </div>
    <div className="editButton">
        <button onClick={props.func}>Edit</button>
    </div>
        </>
)
}

