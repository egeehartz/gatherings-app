import React, { useEffect, useContext, useState } from "react"
import { ProfileActivity } from "../activities/ProfileActivity"
import { ProfileFood } from "../foods/ProfileFood"
import { ProfileMisc } from "../misc/ProfileMisc"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { EventContext } from "../events/EventsProvider"
import { Button } from "reactstrap"


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
        setValidActivities(currentActivity)
    }, [activities], [events])
    useEffect(() => { //get the misc items that relate to the logged in user
        const userMisc = misc.filter(m => m.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        const currentMisc = userMisc.filter(m => m.event.archived === false)
        setValidMisc(currentMisc)
    }, [misc], [vEvents])
    useEffect(() => { //get the food that relates to the logged in user, pull out the food for events that are not archived 
        const userFood = foodsArr.filter(f => f.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        const currentFood = userFood.filter(f => f.event.archived === false)
        setValidFood(currentFood)
    }, [foodsArr], [vEvents])

    return (
        <>
        <div className="responsibilitiesContainer">
            <h2 className="contentTitleResp">Responsibilities</h2>
            <p>Click the items to go to the Event Planning Space</p>
            <div>
                <Button color="primary" >Food</Button>
                <ul>
                    {
                        vFood.map(f => {
                            return <ProfileFood key={f.id} food={f} />
                            })
                    }
                </ul>
            </div>
            <div>
                <Button color="success">Activities</Button>
                <ul>
                    {
                        vActivities.map(a => {
                            return <ProfileActivity key={a.id} activity={a} />
                            })
                    }
                </ul>
            </div>
            <div>
                <Button color="warning" >Miscellaneous</Button>
                <ul>
                    {
                        vMisc.map(m => {
                            return <ProfileMisc key={m.id} misc={m} />
                            })
                    }
                </ul>
            </div>
        </div>
        </>
    )
}
