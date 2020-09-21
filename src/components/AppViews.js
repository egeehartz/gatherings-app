import React from "react"
import { Route } from "react-router-dom"
import { ProfileList } from "./profile/ProfileList"
import { EventsProvider } from "./events/EventsProvider"
import { EventTypeProvider } from "./events/EventTypeProvider"
import { FoodProvider } from "./foods/FoodProvider"
import { ActivityProvider } from "./activities/ActivityProvider"
import { MiscProvider } from "./misc/MiscProvider"
import { EventPlanningSpace } from "./events/EventPlanningSpace"
import { FoodTypeProvider } from "./foods/FoodTypeProvider"
import { UserProvider } from "./users/UserProvider"
import { UserEventsProvider } from "./users/UserEventsProvider"
import {Responsibilities} from "./profile/Responsibilities"
import {Archive} from "./profile/Archive"
import {EventSummary} from "./events/EventSummary"



export const AppViews = props => {
    return (
        <>
            <EventsProvider>
                <EventTypeProvider>
                    <FoodProvider>
                        <ActivityProvider>
                            <MiscProvider>
                                <FoodTypeProvider>
                                    <UserProvider>
                                        <UserEventsProvider>
                                            {/* function that renders profile page */}
                                            <Route exact path="/home" render={
                                                props => <ProfileList {...props} />
                                            } />
                                        </UserEventsProvider>
                                    </UserProvider>
                                </FoodTypeProvider>
                            </MiscProvider>
                        </ActivityProvider>
                    </FoodProvider>
                </EventTypeProvider>
            </EventsProvider>
            {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
            <EventsProvider>
                <EventTypeProvider>
                    <FoodProvider>
                        <ActivityProvider>
                            <MiscProvider>
                                <FoodTypeProvider>
                                    <UserProvider>
                                        <UserEventsProvider>
                                            {/* function that renders responsibilities page */}
                                            <Route exact path="/responsibilities" render={
                                                props => <Responsibilities {...props} />} />
                                        </UserEventsProvider>
                                    </UserProvider>
                                </FoodTypeProvider>
                            </MiscProvider>
                        </ActivityProvider>
                    </FoodProvider>
                </EventTypeProvider>
            </EventsProvider>
            {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
            <EventsProvider>
                <EventTypeProvider>
                    <FoodProvider>
                        <ActivityProvider>
                            <MiscProvider>
                                <FoodTypeProvider>
                                    <UserProvider>
                                        <UserEventsProvider>
                                            {/* function that renders archive page */}
                                            <Route exact path="/archive" render={
                                                props => <Archive {...props} />} />
                                        </UserEventsProvider>
                                    </UserProvider>
                                </FoodTypeProvider>
                            </MiscProvider>
                        </ActivityProvider>
                    </FoodProvider>
                </EventTypeProvider>
            </EventsProvider>
            {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
            <EventsProvider>
                <EventTypeProvider>
                    <FoodProvider>
                        <ActivityProvider>
                            <MiscProvider>
                                <FoodTypeProvider>
                                    <UserProvider>
                                        <UserEventsProvider>
                                            {/* function that renders EventPlanning page */}
                                            <Route path="/events/:eventId(\d+)" render={
                                                props => <EventPlanningSpace {...props} />} />
                                        </UserEventsProvider>
                                    </UserProvider>
                                </FoodTypeProvider>
                            </MiscProvider>
                        </ActivityProvider>
                    </FoodProvider>
                </EventTypeProvider>
            </EventsProvider>
            {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
            <EventsProvider>
                <EventTypeProvider>
                    <FoodProvider>
                        <ActivityProvider>
                            <MiscProvider>
                                <FoodTypeProvider>
                                    <UserProvider>
                                        <UserEventsProvider>
                                            {/* renders the specific event from the archives page */}
                                            <Route path="/archive/:eventId(\d+)" render={
                                                props => <EventSummary {...props} />} />
                                        </UserEventsProvider>
                                    </UserProvider>
                                </FoodTypeProvider>
                            </MiscProvider>
                        </ActivityProvider>
                    </FoodProvider>
                </EventTypeProvider>
            </EventsProvider>
            {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("gatherings_customer")
                    props.history.push("/login")
                }
            } />
        </>
    )
}