import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "./UserProvider"
import { UserEventsContext } from "../users/UserEventsProvider"


export const RSVPstatus = ({ue}) => {
    const { userEvents, getUserEvents, updateUserEvent } = useContext(UserEventsContext)
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    const user = ue.map(i => {
        return users.find(u => {
           return u.id === i.userId
        })
    })

    const userUE = ue.find(u => u.userId === parseInt(localStorage.getItem("gatherings_customer")))

    const [editRSVPMode, setRSVPEditMode] = useState(false)

    const toggleRSVPEditMode = () => {
        if (editRSVPMode === true) {
            setRSVPEditMode(false)
        } else {
            setRSVPEditMode(true)
        }
    }



    return (
        <>
            {editRSVPMode ?
                <div>
                    <button 
                        onClick={() => {
                            updateUserEvent({
                            id: userUE.id,
                            userId: userUE.userId ,
                            eventId: userUE.eventId,
                            rsvp: true,
                            })
                            toggleRSVPEditMode()}}>
                        Going
                    </button>
                    <button 
                        onClick={() => {
                            updateUserEvent({
                            id: userUE.id,
                            userId: userUE.userId ,
                            eventId: userUE.eventId,
                            rsvp: false,
                            })
                            toggleRSVPEditMode()}}>
                        Not Going
                    </button>
                </div> :
                <button onClick={toggleRSVPEditMode}>change RSVP status</button>}
        </>
    )
}


//change boolean, 