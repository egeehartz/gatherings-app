import React, { useState } from "react"

export const UserEventsContext = React.createContext()

export const UserEventsProvider = (props) => {
    const [userEvents ,setUserEvents] = useState([])

    const getUserEvents = () => {
        return fetch("http://localhost:8088/userEvents")
            .then(res => res.json())
            .then(setUserEvents)
    }

    const addUserEvents = User => {
        return fetch("http://localhost:8088/userEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)
        })
            .then(getUserEvents)
    }

    const updateUserEvent = userEvent => {
        return fetch(`http://localhost:8088/userEvents/${userEvent.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userEvent)
            })
                .then(getUserEvents)
    }
    
    return (
        <UserEventsContext.Provider value={{
            userEvents, getUserEvents, addUserEvents, setUserEvents, updateUserEvent
        }}>
            {props.children}
        </UserEventsContext.Provider>
    )
}