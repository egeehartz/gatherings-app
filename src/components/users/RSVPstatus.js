import React, { useState, useContext } from "react"
import { UserEventsContext } from "../users/UserEventsProvider"

//the value of ue is an array of userEvents that correspond to the specific event
//this component handles the buttons that allow a user to change their RSVP status
export const RSVPstatus = ({ue}) => {
    const { updateUserEvent } = useContext(UserEventsContext)

    const userUE = ue.find(u => u.userId === parseInt(localStorage.getItem("gatherings_customer")))

    const [editRSVPMode, setRSVPEditMode] = useState(false)

    const toggleRSVPEditMode = () => {
        if (editRSVPMode === true) {
            setRSVPEditMode(false)
        } else {
            setRSVPEditMode(true)
        }
    }

    //this entire return statement is a compact if/else statement
    // LINES 28-56:  if component is in edit mode (TRUTHY) 
    // LINES 56-59: if component is NOT in edit mode (FALSY)
    return (
        <>
            {
                editRSVPMode ?
                    <div className="rsvpButtonDiv">
                        <button className="rsvpButton"
                            onClick={() => {
                                updateUserEvent({
                                    id: userUE.id,
                                    userId: userUE.userId,
                                    eventId: userUE.eventId,
                                    rsvp: true,
                                })
                                toggleRSVPEditMode()
                            }}>
                            Going
                        </button>
                        <button className="rsvpButton"
                            onClick={() => {
                                updateUserEvent({
                                    id: userUE.id,
                                    userId: userUE.userId,
                                    eventId: userUE.eventId,
                                    rsvp: false,
                                })
                                toggleRSVPEditMode()
                            }}>
                            Not Going
                        </button>
                        <button className="rsvpButton" onClick={toggleRSVPEditMode}>
                            Nevermind
                        </button>
                    </div>  :
                    <div className="rsvpButtonDiv">
                        <button className="rsvpButton" onClick={toggleRSVPEditMode}>change RSVP status</button>
                    </div>
            }

        </>
    )
}