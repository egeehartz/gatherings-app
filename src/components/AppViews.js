import React from "react"
import { Route } from "react-router-dom"
import {ProfileList} from "./profile/ProfileList"
import {EventsProvider} from "./events/EventsProvider"
import { EventTypeProvider } from "./events/EventTypeProvider"
import { FoodProvider } from "./foods/FoodProvider"
import { ActivityProvider } from "./activities/ActivityProvider"
import { MiscProvider } from "./misc/MiscProvider"
import { EventPlanningSpace } from "./events/EventPlanningSpace"



export const AppViews = props => {
    return (
        <>
        <EventsProvider>
            <Route exact path="/home">
                {/* function that renders profile page */}
                <ProfileList />
            </Route>
        </EventsProvider>
        {/* ///////////////////////////////////////////// */}
        <EventsProvider>
            <EventTypeProvider>
                <FoodProvider>
                    <ActivityProvider>
                        <MiscProvider>
                            <Route path="/events/:eventId(\d+)" render={
                            props => <EventPlanningSpace {...props} />
                            } />
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