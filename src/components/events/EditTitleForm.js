import React, {useRef, useState, useContext} from "react"
import {EventContext} from "./EventsProvider"
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export const EditTitleForm = ({event}) => {
const {updateEvent, deleteEvent} = useContext(EventContext)

    const editingTitle = useRef()
    

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const toggleDelete = () => setIsDeleteOpen(!isOpen);

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
     <div>
    <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
      edit
    </Button>
    <Collapse isOpen={isOpen}>
      <Card>
        <CardBody>
          <input type="text" placeholder={event.name} ref={editingTitle}  ></input>
          <button onClick={() => {
                addToEvent()
                editingTitle.current.value = ""
                setIsOpen(false)
                }}>save</button>
        </CardBody>
      </Card>
    </Collapse>
  </div> 
    <div>
    <Button color="danger" onClick={toggleDelete} style={{ marginBottom: '1rem' }}>
      delete
    </Button>
    <Collapse isOpen={isDeleteOpen}>
      <Card>
        <CardBody>
          <p>Are you absolutely sure?</p>
          <button onClick={() => {
              deleteTheEvent()
          }}>Delete it!</button>
        </CardBody>
      </Card>
    </Collapse>
  </div>
        </section>
        </>
    )
}

