import React from "react"
import { Route } from "react-router-dom"
import {ProfileList} from "./profile/ProfileList"
import {EventProvider} from "./events/EventsProvider"


export const AppViews = props => {
    return (
        <>
        <EventProvider>
            <Route exact path="/home">
                {/* function that renders profile page */}
                <ProfileList />
            </Route>
        </EventProvider>
        <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("kennel_customer")
                    props.history.push("/login")
                }
            } />
        </>
    )
}