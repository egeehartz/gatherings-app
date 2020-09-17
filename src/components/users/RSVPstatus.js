import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "./UserProvider"
import { UserEventsContext } from "../users/UserEventsProvider"


export const RSVPstatus = (props) => {
    const { userEvents, getUserEvents, updateUserEvent } = useContext(UserEventsContext)
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    const eventId = parseInt(props.match.params.eventId)
    const user = props.ue.map(i => {
        return users.find(u => {
           return u.id === i.userId
        })
    })

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
                            id: props.ue.id,
                            userId: user.id ,
                            eventId: eventId,
                            rsvp: true,
                            })
                            toggleRSVPEditMode()}}>
                        Going
                    </button>
                    <button 
                        onClick={() => {
                            updateUserEvent({
                            id: props.ue.id,
                            userId: user.id ,
                            eventId: eventId,
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