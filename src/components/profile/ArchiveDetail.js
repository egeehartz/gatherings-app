import React, { useState, useContext, useEffect, } from "react"
//import { EventTypeContext } from "../events/EventTypeProvider"
import { Button, Collapse, Card, CardBody } from "reactstrap"
import {EventContext} from "../events/EventsProvider"
import {Link} from "react-router-dom"




export const ArchiveDetail = ({ et }) => {

    
    const { events, getEvents } = useContext(EventContext)
    const [ vEvents, setValidEvents] = useState([])
    const [ fEvents, setFilteredEvents] = useState([])
    
    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const toggleType = () => setIsTypeOpen(!isTypeOpen)
    
    useEffect(() => {
        getEvents()
    }, [])

    useEffect(() => {
        const currentEvents = events.filter(e => e.archived === true) || {}
        
        setValidEvents(currentEvents)
    }, [events])

    useEffect(() => {
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
                        <div>
                            {
                                fEvents.map(fe => {
                                return <Link 
                                    to={{pathname: `/archive/${fe.id}`,
                                    state: { chosenEvent: fe }}}>
                                <h3>{fe.name}</h3>
                                </Link>
                                })
                            }
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </>
    )

}