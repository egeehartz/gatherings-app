import React, { useContext, useEffect, useState } from "react"
import { EventTypeContext } from "../events/EventTypeProvider"
import { ArchiveDetail } from "./ArchiveDetail"

//this component renders the initial part of the Archive page
//it is responsible for the title and then maps over eventTypes 
//that info gets passed to ArchiveDetail for the next step
export const Archive = () => {
    const {eventTypes, getEventType} = useContext(EventTypeContext)
    const [filteredTypes, setTypes] = useState([])

    useEffect(() => {
        getEventType()
    },[])
    useEffect(() => {
        const filteredTypes = eventTypes.filter(et => et.id !== 6)
        setTypes(filteredTypes)
    },[eventTypes])

    return (
        <>
        <h1>Archives</h1>
        <p className="archiveSubtitle">click on event titles to go to their summary page</p>
        <div className="archivedEventTypes">
            {
                filteredTypes.map(et => <ArchiveDetail key={et.id} et={et} />)
            }
        </div>
        </>
    )
}