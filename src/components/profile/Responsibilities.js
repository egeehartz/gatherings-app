 import React, { useEffect, useContext, useState } from "react"
 import { ProfileActivity } from "../activities/ProfileActivity"
import { ProfileFood } from "../foods/ProfileFood"
import { ProfileMisc } from "../misc/ProfileMisc"
import { FoodContext } from "../foods/FoodProvider"
import { ActivityContext } from "../activities/ActivityProvider"
import { MiscContext } from "../misc/MiscProvider"
 
 
 
 export const Responsibilities = (props) => {
    const { foodsArr, getFood } = useContext(FoodContext)
    const { activities, getActivities } = useContext(ActivityContext)
    const { misc, getMisc } = useContext(MiscContext)

    useEffect(() => {
        getFood()
        getActivities()
        getMisc()
    }, [])

    const [tActivities, setActivities] = useState([])
    const [tMisc, setMisc] = useState([])
    const [tFood, setFood] = useState([])

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

     return (
    <>
     {/* Responsibilities */}
     <div>
     <h2 className="contentTitleResp">Responsibilities</h2>
     <p>You have signed up for:</p>
     <div>
         <h4>Food:</h4>
         <ul>
             {tFood.map(f => {
                 return <ProfileFood key={f.id} food={f} />
             })}
         </ul>
     </div>
     <div>
         <h4>Activities:</h4>
         <ul>
             {tActivities.map(a => {
                 return <ProfileActivity key={a.id} activity={a} />
             })}
         </ul>
     </div>
     <div>
         <h4>Misc:</h4>
         <ul>
             {tMisc.map(m => {
                 return <ProfileMisc key={m.id} misc={m} />
             })}
         </ul>
     </div>
    
    </div>
    </>
     )
 }
 