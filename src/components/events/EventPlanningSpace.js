import React, { useContext, useState, useEffect, useRef } from "react"
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { EventContext } from "./EventsProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { UserContext } from "../users/UserProvider"
import { FoodTypeContext } from "../foods/FoodTypeProvider"
import { UserEventsContext } from "../users/UserEventsProvider"
import { Users } from "../users/Users"
import { Activity } from "../activities/Activity"
import { Misc } from "../misc/Misc"
import { FoodForm } from "../forms/FoodForm"
import { EventDetailsForm } from "../events/EventDetailsForm"
import { EventDetails } from "../events/EventDetails"
import { RSVPstatus } from "../users/RSVPstatus"
import "./EventPlanningSpace.css"


export const EventPlanningSpace = props => {
    //CONTEXTS
    const {events, getEvents, updateEvent} = useContext(EventContext)
    const {getFood} = useContext(FoodContext)
    const {foodTypes, getFoodType} = useContext(FoodTypeContext)
    const {activities, addActivity, getActivities} = useContext(ActivityContext)
    const {misc, getMisc, addMisc} = useContext(MiscContext)
    const {getUsers} = useContext(UserContext)
    const {userEvents, getUserEvents} = useContext(UserEventsContext)

    //REFS
    const aName = useRef(null)
    const mName = useRef(null)

    //STATE
    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tUserEvents, setUserEvents] = useState([])
    const [notGoingArr, setNotGoing] = useState([])
    const [goingArr, setGoing] = useState([])
    const [notRespondedArr, setNotResponded] = useState([])
    const [editMode, setEditMode] = useState(null)
    const [today, setToday] = useState('')

    //COLLAPSE: STATE AND TOGGLES
    const [isFoodOpen, setIsFoodOpen] = useState(false)
    const toggleFood = () => setIsFoodOpen(!isFoodOpen)
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false)
    const toggleActivities = () => setIsActivitiesOpen(!isActivitiesOpen)
    const [isMiscOpen, setIsMiscOpen] = useState(false)
    const toggleMisc = () => setIsMiscOpen(!isMiscOpen)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen)
    const [isRSVPOpen, setIsRSVPOpen] = useState(false)
    const toggleRSVP = () => setIsRSVPOpen(!isRSVPOpen)

    // WHEN COMPONENT INITIALIZES
    useEffect(() => {
        getEvents()
        getFood()
        getFoodType()
        getActivities()
        getMisc()
        getUsers()
        getUserEvents()
    }, [])
    useEffect(() => { //listen for change in events, find the specific event that the user clicked
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
        if (editMode === null) {
            setEditMode(event.host === "click edit" && event.location === "to" && event.date === "add" && event.time === "details!")
        }
    }, [events])
    useEffect(() => { //listen for a change in activities and find the ones with the same eventId as the selected event
        const eventActivity = activities.filter(a => a.eventId === parseInt(props.match.params.eventId)) || {}
        setActivities(eventActivity)
    }, [activities])
    useEffect(() => { //listen for a change in misc and find the ones with the same eventId as the selected event
        const eventMisc = misc.filter(m => m.eventId === parseInt(props.match.params.eventId)) || {}
        setMisc(eventMisc)
    }, [misc])
    useEffect(() => { //listen for a change in userEvents to set the RSVP state variables
        const currentUserEvents = userEvents.filter(ue => ue.eventId === parseInt(props.match.params.eventId)) || {}
        const rsvpStatusNull = currentUserEvents.filter(cue => cue.rsvp === null) || {}
        setNotResponded(rsvpStatusNull)
        const rsvpStatusGoing = currentUserEvents.filter(cue => cue.rsvp === true) || {}
        setGoing(rsvpStatusGoing)
        const rsvpStatusNotGoing = currentUserEvents.filter(cue => cue.rsvp === false) || {}
        setNotGoing(rsvpStatusNotGoing)
    }, [userEvents])
    useEffect(() => { //listen for a change in userEvents and pull the ones with the eventId that matches the selected event
        const eventUserEvents = userEvents.filter(ue => ue.eventId === parseInt(props.match.params.eventId)) || {}
        setUserEvents(eventUserEvents)
    }, [userEvents])
    useEffect(() => { //changes the format of the date to be MM-DD-YYYY
        const dayToday = new Date();
        const dd = String(dayToday.getDate()).padStart(2, '0');
        const mm = String(dayToday.getMonth() + 1).padStart(2, '0');
        const yyyy = dayToday.getFullYear();
        const currentDate = yyyy + '-' + mm + '-' + dd;
        setToday(currentDate)
    }) 

    //POSTS
    const constructNewActivity = () => {
        addActivity({
            text: aName.current.value,
            eventId: event.id,
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
            .then(aName.current.value = "")
    }
    const constructNewMisc = () => {
        addMisc({
            text: mName.current.value,
            eventId: event.id,
            userId: parseInt(localStorage.getItem("gatherings_customer"))
        })
            .then(mName.current.value = "")
    }
    //OTHER FUNCTIONS, SET STATE, TRIGGERED ONCLICK
    const toggleEditMode = () => {
        if (editMode === true) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }
    
    return (
        <>
            <h1>{event.name}</h1>
            <div className="finalizeButton">
                <button disabled={event.date === today || event.date < today ? false : true} 
                className="finalizeButton"
                onClick={() => {
                    updateEvent({
                        id: event.id,
                        name: event.name,
                        eventTypeId: parseInt(event.eventTypeId),
                        date: event.date,
                        host: event.host,
                        location: event.location,
                        time: event.time,
                        archived: true
                    })
                    .then(props.history.push("/home"))
                }}>
                    finalize plans!
                    </button>
            </div>
            <fieldset>
                <div className="form-group">
                    <Button color="info" onClick={toggleDetails}>Details</Button>
                    <Collapse isOpen={isDetailsOpen}>
                        <Card>
                            <CardBody>
                                {/* editMode ? EventDetailsForm : EventDetails */}
                                {editMode ?
                                    <EventDetailsForm key={event.id} event={event} func={toggleEditMode} {...props} /> :
                                    <EventDetails key={event.id} event={event} func={toggleEditMode} {...props} />}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {/* food */}
                    <Button color="primary" onClick={toggleFood} >Food</Button>
                    <Collapse isOpen={isFoodOpen}>
                        {foodTypes.map(ft => {
                            return <FoodForm key={ft.id} foodTypeObj={ft} {...props} />
                        })}
                    </Collapse>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {/* activity */}
                    <Button color="success" onClick={toggleActivities}>Activities</Button>
                    <Collapse isOpen={isActivitiesOpen}>
                        <Card>
                            <CardBody>
                                <div className="renderedItemsContainer">{tActivities.map(ea => {
                                    return <Activity key={ea.id} activity={ea} {...props} />
                                })}</div>
                                <div className="inputButton">
                                    <input className="mainInput" type="text" placeholder="type here" name="aName"
                                        ref={aName}></input>
                                    <button onClick={() => {
                                        constructNewActivity()
                                    }}>Save</button>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {/* misc */}
                    <Button color="warning" onClick={toggleMisc}>Miscellaneous</Button>
                    <Collapse isOpen={isMiscOpen}>
                        <Card>
                            <CardBody>
                                <div className="renderedItemsContainer">{tMisc.map(em => {
                                    return <Misc key={em.id} misc={em} {...props} />
                                })}</div>
                                <div className="inputButton">
                                    <input className="mainInput" type="text" placeholder="type here" name="mName"
                                        ref={mName}></input>
                                    <button onClick={() => {
                                        constructNewMisc()
                                    }}>Save</button>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </fieldset>
            <div className="form-group">
                <Button color="danger" onClick={toggleRSVP}>RSVP</Button>
                <Collapse isOpen={isRSVPOpen}>
                    <Card>
                        <CardBody>
                            <RSVPstatus ue={tUserEvents} />
                            <h3>Going</h3>
                            <Users items={goingArr} />
                            <h3>Not Going</h3>
                            <Users items={notGoingArr} />
                            <h3>Hasn't Responded</h3>
                            <Users items={notRespondedArr} />
                        </CardBody>
                    </Card>
                </Collapse>

            </div>
        </>
    )
}
