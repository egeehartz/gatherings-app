import React, { useEffect, useContext, useState } from "react"
import { ProfileActivity } from "../activities/ProfileActivity"
import { ProfileFood } from "../foods/ProfileFood"
import { ProfileMisc } from "../misc/ProfileMisc"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { EventContext } from "../events/EventsProvider"
import { Button, Collapse } from "reactstrap"



//this component handles getting the items related to the user for events that are not archived and sends that info to their corresponding components
export const Responsibilities = () => {
    const { foodsArr, getFood } = useContext(FoodContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)
    const { events, getEvents } = useContext(EventContext)

    const [vEvents, setValidEvents] = useState([])
    const [vFood, setValidFood] = useState([])
    const [vActivities, setValidActivities] = useState([])
    const [vMisc, setValidMisc] = useState([])

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [isFoodOpen, setFoodIsOpen] = useState(false);
    const toggleFood = () => setFoodIsOpen(!isFoodOpen);
    const [isMiscOpen, setMiscIsOpen] = useState(false);
    const toggleMisc = () => setMiscIsOpen(!isMiscOpen);

    useEffect(() => {
        getFood()
        getActivities()
        getMisc()
        getEvents()
    }, [])
    useEffect(() => { //get the events that are not archived and set the state variable with those events
        const currentEvents = events.filter(e => e.archived === false) || {}
        setValidEvents(currentEvents)
    }, [events])
    useEffect(() => { //get the activities that relate to the logged in user, pull out the activities for events that are not archived
        const userActivity = activities.filter(a => a.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        const currentActivity = userActivity.filter(a => a.event.archived === false)
        const sorted = currentActivity.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.event.date) - Date.parse(nextEntry.event.date))
        setValidActivities(sorted)
    }, [activities], [events])
    useEffect(() => { //get the misc items that relate to the logged in user
        const userMisc = misc.filter(m => m.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        const currentMisc = userMisc.filter(m => m.event.archived === false)
        const sorted = currentMisc.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.event.date) - Date.parse(nextEntry.event.date))
        setValidMisc(sorted)
    }, [misc], [vEvents])
    useEffect(() => { //get the food that relates to the logged in user, pull out the food for events that are not archived 
        const userFood = foodsArr.filter(f => f.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        const currentFood = userFood.filter(f => f.event.archived === false)
        const sorted = currentFood.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.event.date) - Date.parse(nextEntry.event.date))
        setValidFood(sorted)
    }, [foodsArr], [vEvents])

    return (
        <>
            <div className="responsibilitiesContainer">
                <h2 className="contentTitleResp">Responsibilities</h2>
                <p>Click the items to go to the Event Planning Space</p>
                <div>
                    <Button onClick={toggleFood} color="primary">Food</Button>
                    <Collapse isOpen={isFoodOpen}>
                        {vFood.length === 0 ?
                            <div className="emptyCard">You're not responsible for any food... yet...😉</div> :
                            <ul>
                                {
                                    vFood.map(f => {
                                        return <ProfileFood key={f.id} food={f} />
                                    })
                                }
                            </ul>
                        }
                    </Collapse>
                </div>
                <div>
                    <Button onClick={toggle} color="success">Activities</Button>
                    <Collapse isOpen={isOpen}>
                        {vActivities.length === 0 ?
                            <div className="emptyCard">You're not responsible for any activies... yet...😉</div> :
                            <ul>
                                {
                                    vActivities.map(a => {
                                        return <ProfileActivity key={a.id} activity={a} />
                                    })
                                }
                            </ul>

                        }
                    </Collapse>
                </div>
                <div>
                    <Button onClick={toggleMisc} color="warning" >Miscellaneous</Button>
                    <Collapse isOpen={isMiscOpen}>
                        {vMisc.length === 0 ?
                            <div className="emptyCard">Nothing to see here!</div> :
                            <>
                                <p className="miscSubtitle">You wrote: </p>
                                <ul>
                                    {
                                        vMisc.map(m => {
                                            return <ProfileMisc key={m.id} misc={m} />
                                        })
                                    }
                                </ul>
                            </>}
                    </Collapse>
                </div>
            </div>
        </>
    )
}
