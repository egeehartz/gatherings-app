import React, {useContext, useEffect} from "react"
import {EventTypeContext} from "../events/EventTypeProvider"
import {ArchiveDetail} from "./ArchiveDetail"




export const Archive = () => {
    const {eventTypes, getEventType} = useContext(EventTypeContext)

    useEffect(() => {
        getEventType()
    },[])

    return (
        <>
        <div className="archivedEventTypes">
            {
                eventTypes.map(et => <ArchiveDetail key={et.id} et={et} />)
            }
        </div>
        </>
    )
}
