import React from "react"
import {Link} from "react-router-dom"



export const ProfileMisc = ({misc}) => (
    <Link to={`/events/${misc.eventId}`}>
    <div>{misc.text} </div>
    </Link>
)
   