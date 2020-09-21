import React from "react"
import { Link } from "react-router-dom"

//this component handles the representation for misc items on the responsibilities page
export const ProfileMisc = ({misc}) => (
    <Link to={`/events/${misc.eventId}`}>
        <div>{misc.text} (for {misc.event.name}) </div>
    </Link>
)
   