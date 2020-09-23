import React from "react"
import { Link } from "react-router-dom"
//mport { Card, CardHeader, CardText } from 'reactstrap';

//this component handles the representation for misc items on the responsibilities page
export const ProfileMisc = ({misc}) => (
    <Link className="ulContainer" to={`/events/${misc.eventId}`}>
        <div className="miscContainer">
        <div className="itemName">{misc.text}</div>
        <div className="eventName"> (for {misc.event.name})</div>        
        </div>
    </Link>


)
   