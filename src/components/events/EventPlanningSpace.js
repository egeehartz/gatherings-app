import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./EventsProvider"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { UserContext } from "../users/UserProvider"
import { Activity } from "../activities/Activity"
import { Misc } from "../misc/Misc"
import { FoodTypeContext } from "../foods/FoodTypeProvider"
import { FoodForm } from "../forms/FoodForm"
import { EventDetailsForm } from "../events/EventDetailsForm"
import { EventDetails } from "../events/EventDetails"
import "./EventPlanningSpace.css"
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Users } from "../users/Users"
import { UserEventsContext } from "../users/UserEventsProvider"


export const EventPlanningSpace = props => {
    //CONTEXT
    const { events, getEvents } = useContext(EventContext)
    const { getFood } = useContext(FoodContext)
    const { foodTypes, getFoodType } = useContext(FoodTypeContext)
    const { activities, addActivity, getActivities } = useContext(ActivityContext)
    const { misc, getMisc, addMisc } = useContext(MiscContext)
    const { users, getUsers } = useContext(UserContext)
    const {userEvents} = useContext(UserEventsContext)

    //REFS
    const aName = useRef(null)
    const mName = useRef(null)

    //STATE
    const [event, setEvents] = useState([])
    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const[notGoingArr, setNotGoing] = useState([])
    const[goingArr, setGoing] = useState([])
    const[notRespondedArr, setNotResponded] = useState([])
    const [editMode, setEditMode] = useState(null)

    //COLLAPSE STATE AND TOGGLES
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


    // Get data from API when component initializes
    useEffect(() => {
        getEvents()
        getFood()
        getFoodType()
        getActivities()
        getMisc()
        getUsers()
    }, [])
    useEffect(() => {
        const event = events.find(e => e.id === parseInt(props.match.params.eventId)) || {}
        setEvents(event)
        if (editMode === null) {
            setEditMode(event.host === "click edit" && event.location === "to" && event.date === "add" && event.time === "details!")
        }
    }, [events])
    useEffect(() => {
        const eventActivity = activities.filter(a => a.eventId === parseInt(props.match.params.eventId)) || {}
        setActivities(eventActivity)
    }, [activities])
    useEffect(() => {
        const eventMisc = misc.filter(m => m.eventId === parseInt(props.match.params.eventId)) || {}
        setMisc(eventMisc)
    }, [misc])
    useEffect(() => {
        const currentUserEvents = userEvents.filter(ue => ue.eventId === parseInt(props.match.params.eventId)) || {}
        const rsvpStatusNull = currentUserEvents.filter(cue => cue.rsvp === null) || {}
        setNotResponded(rsvpStatusNull)
        const rsvpStatusGoing = currentUserEvents.filter(cue => cue.rsvp === true) || {}
        setGoing(rsvpStatusGoing)
        const rsvpStatusNotGoing = currentUserEvents.filter(cue => cue.rsvp === false) || {}
        setNotGoing(rsvpStatusNotGoing)
    },[userEvents])

    //POST
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
            <fieldset>
                <div className="form-group">
                    <Button color="info" onClick={toggleDetails}>Details:</Button>
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
                    <Button color="primary" onClick={toggleFood} >Food:</Button>
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
                    <Button color="success" onClick={toggleActivities}>Activities:</Button>
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
                    <Button color="warning" onClick={toggleMisc}>Miscellaneous:</Button>
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
                <Button color="danger" onClick={toggleRSVP}>RSVP:</Button>
                <Collapse isOpen={isRSVPOpen}>
                    <Card>
                        <CardBody>
                            <h3>Going</h3>
                            <Users items={goingArr}/>
                            <h3>Not Going</h3>
                            <Users items={notGoingArr}/>
                            <h3>Hasn't Responded</h3> 
                            <Users items={notRespondedArr}/>
                        </CardBody>
                    </Card>
                </Collapse>

            </div>
        </>
    )
}
