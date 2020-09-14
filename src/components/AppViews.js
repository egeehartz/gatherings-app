import React from "react"
import { Route } from "react-router-dom"
import {ProfileList} from "./profile/ProfileList"
import {EventsProvider} from "./events/EventsProvider"
import { EventTypeProvider } from "./events/EventTypeProvider"
import { FoodProvider } from "./foods/FoodProvider"
import { ActivityProvider } from "./activities/ActivityProvider"
import { MiscProvider } from "./misc/MiscProvider"
import { EventPlanningSpace } from "./events/EventPlanningSpace"
import { FoodTypeProvider } from "./foods/FoodTypeProvider"



export const AppViews = props => {
    return (
        <>
        <EventsProvider>
           
                {/* function that renders profile page */}
                <Route exact path="/home" render={
                    props => <ProfileList {...props} />
                } />
           
        </EventsProvider>
        {/* ///////////////////////////////////////////// */}
        <EventsProvider>
            <EventTypeProvider>
                <FoodProvider>
                    <ActivityProvider>
                        <MiscProvider>
                            <FoodTypeProvider>
                            <Route path="/events/:eventId(\d+)" render={
                            props => <EventPlanningSpace {...props} />
                        } />
                            </FoodTypeProvider>
                        </MiscProvider>
                    </ActivityProvider>
                </FoodProvider>
            </EventTypeProvider>
        </EventsProvider>
        {/* ///////////////////////////////////////////// */}
        <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("kennel_customer")
                    props.history.push("/login")
                }
            } />
        </>
    )
}