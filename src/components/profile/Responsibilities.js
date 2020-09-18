 import React, { useEffect, useContext, useState } from "react"
 import { ProfileActivity } from "../activities/ProfileActivity"
import { ProfileFood } from "../foods/ProfileFood"
import { ProfileMisc } from "../misc/ProfileMisc"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
import { EventContext } from "../events/EventsProvider"
 
 
 
 export const Responsibilities = (props) => {
    const { foodsArr, getFood } = useContext(FoodContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)
    const { events, getEvents } = useContext(EventContext)

    useEffect(() => {
        getFood()
        getActivities()
        getMisc()
        getEvents()
    }, [])

    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])
    const [ vEvents, setValidEvents] = useState([])
    const [ vFood, setValidFood] = useState([])
    const [ vActivities, setValidActivities] = useState([])
    const [ vMisc, setValidMisc] = useState([])

    useEffect(() => {
        const userActivity = activities.filter(a => a.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setActivities(userActivity)
    }, [activities])

    useEffect(() => {
        const userMisc = misc.filter(m => m.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setMisc(userMisc)
    }, [misc])

    useEffect(() => {
        const userFood = foodsArr.filter(f => f.userId === parseInt(localStorage.getItem("gatherings_customer"))) || {}
        setFood(userFood)
    }, [foodsArr])

    useEffect(() => {
        const currentEvents = events.filter(e => e.archived === false) || {}
        setValidEvents(currentEvents)
    }, [events])

    useEffect(() => {
        const currentFood = tFood.filter(f => f.event.archived === false)
        setValidFood(currentFood)
    }, [vEvents])

    useEffect(() => {
        const currentActivity = tActivities.filter(a => a.event.archived === false)
        setValidActivities(currentActivity)
    }, [vEvents])

    useEffect(() => {
        const currentMisc = tMisc.filter(m => m.event.archived === false)
        setValidMisc(currentMisc)
    }, [vEvents])

     return (
    <>
     {/* Responsibilities */}
     <div>
     <h2 className="contentTitleResp">Responsibilities</h2>
     <p>You have signed up for:</p>
     <div>
         <h4>Food:</h4>
         <ul>
            {
                vFood.map(f => {
                    return <ProfileFood key={f.id} food={f} />
                })
            }
         </ul>
     </div>
     <div>
         <h4>Activities:</h4>
         <ul>
             {vActivities.map(a => {
                 return <ProfileActivity key={a.id} activity={a} />
             })}
         </ul>
     </div>
     <div>
         <h4>Misc:</h4>
         <ul>
             {vMisc.map(m => {
                 return <ProfileMisc key={m.id} misc={m} />
             })}
         </ul>
     </div>
    
    </div>
    </>
     )
 }
 