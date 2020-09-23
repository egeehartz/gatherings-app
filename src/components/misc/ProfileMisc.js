import React from "react"
import { Link } from "react-router-dom"

//this component handles the representation for misc items on the responsibilities page
export const ProfileMisc = ({misc}) => (
    <Link className="ulContainer" to={`/events/${misc.eventId}`}>
        <div className="itemName">{misc.text}</div>
        <div className="eventName"> (for {misc.event.name})</div>
    </Link>
)
   