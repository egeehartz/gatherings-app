import React, {useRef, useContext} from "react"
import {EventContext} from "./EventsProvider"


export const EditTitleForm = ({event}) => {
const {updateEvent, deleteEvent} = useContext(EventContext)

    const editingTitle = useRef()
    const editTitle = useRef()
    const deleteDialog = useRef()


    const addToEvent = () => {
            const eventId = parseInt(event.id)
            updateEvent({
                id: eventId,
                name: editingTitle.current.value,
                eventTypeId: event.eventTypeId,
                host: event.host,
                location: event.location,
                date: event.date,
                time: event.time,
                archived: false
            })
    }

    const deleteTheEvent = () => {
        const eventId = parseInt(event.id)
        deleteEvent(eventId)
    }

    return (
        <>
        <section>
        {/* open edit dialog button  */}
        <button onClick={() =>{
            editTitle.current.showModal()
        }}>edit title</button>

        {/* open delete dialog button  */}
        <button onClick={() => {
            deleteDialog.current.showModal()
        }}>delete event</button>

        {/*  delete dialog  */}
        <dialog ref={deleteDialog}>
            <p>Are you sure you want to delete {event.name}?</p>
            <button onClick={() => {
                deleteTheEvent()
                {/* force refresh? */}
            }}>Yes, absolutely</button>
            <button onClick={() => {
                deleteDialog.current.close()
            }}>Nope</button>
        </dialog>

        {/*  edit dialog */}
        <dialog ref={editTitle}>
            <input type="text" placeholder={event.name} ref={editingTitle}  ></input>
            {/* edit title button */}
            <button onClick={() => {
                addToEvent()
                editingTitle.current.value = ""
                editTitle.current.close()
                }}>save</button>
                {/* nevermind button */}
                <button onClick={() => {
                editTitle.current.close()
                }}>nevermind
                </button>
        </dialog>
        </section>
        </>
    )
}

