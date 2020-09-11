import React, { useEffect, useContext } from "react"
import {EventContext} from "../events/EventsProvider"



export const ProfileList = () => {
    const {events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
        <h1>Profile Page</h1>
        <div>
            {events.map(event => {
                return <div>{event.name}</div>
            })}
        </div>
        </>
    )
}




