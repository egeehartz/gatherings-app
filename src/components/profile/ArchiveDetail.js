import React, { useState, useContext, useEffect, } from "react"
import { Button, Collapse, Card, CardBody } from "reactstrap"
import { EventContext } from "../events/EventsProvider"
import { Link } from "react-router-dom"

//this component handles rendering the event titles in their corresponding event types sorted by date
//clicking on the event title sends the user to a unique path and EventSummary.js is responsible for the representation for that path
export const ArchiveDetail = ({et}) => {
    const {events, getEvents} = useContext(EventContext)

    const [ vEvents, setValidEvents] = useState([])
    const [ fEvents, setFilteredEvents] = useState([])
    
    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const toggleType = () => setIsTypeOpen(!isTypeOpen)
    
    useEffect(() => {
        getEvents()
    }, [])

    useEffect(() => { //pull out the events that are archived and set the state variable with that array
        const currentEvents = events.filter(e => e.archived === true) || {}
        setValidEvents(currentEvents)
    }, [events])
    useEffect(() => { //listens for a change in vEvents and then filters out the events by type so they show up in their type's collapse card, and sort the events by date
       const filteredByType = vEvents.filter(ve => ve.eventTypeId === et.id)
       const sortedByDate = filteredByType.sort(
        (currentEntry, nextEntry) =>
        Date.parse(currentEntry.date) - Date.parse(nextEntry.date))
       setFilteredEvents(sortedByDate)
    },[vEvents])

    return (
        <>
            <Button color="primary" onClick={toggleType} >{et.type}</Button>
            <Collapse isOpen={isTypeOpen}>
                <Card>
                    <CardBody>
                    <div className="archivedEventsDiv">
                            {
                                fEvents.map(fe => {
                                return <div className="archivedEventsInnerDiv" >
                                <Link className="eventLink"
                                    to={{pathname: `/archive/${fe.id}`,
                                    state: { chosenEvent: fe }}}>
                                <h3 className="archivedEventTitle">{fe.name}</h3>
                                </Link>
                                </div>
                                })
                            }
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </>
    )

}