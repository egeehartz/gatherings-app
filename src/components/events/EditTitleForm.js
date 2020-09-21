import React, { useRef, useState, useContext } from "react"
import { EventContext } from "./EventsProvider"
import { Collapse, Button, CardBody, Card } from 'reactstrap';

//this component handles the EDIT and DELETE collapses on the profile page
export const EditTitleForm = ({event}) => {
  const {updateEvent, deleteEvent} = useContext(EventContext)

  const editingTitle = useRef()

  //COLLAPSE: STATE AN TOGGLES
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toggleDelete = () => setIsDeleteOpen(!isDeleteOpen);

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
      <section className="eventActions">
        <div>
          <Button outline className="eventActionButtons" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
            edit
          </Button>
          <Collapse isOpen={isOpen}>
            <Card className="collapseCard">
              <CardBody>
                <label className="editTitleLabel">Edit Event Title</label>
                <div>
                  <input className="editTitleLabel" type="text" placeholder={event.name} ref={editingTitle}  ></input>
                  <button className="editTitleLabel" onClick={() => {
                    addToEvent()
                    editingTitle.current.value = ""
                    setIsOpen(false)
                  }}>save</button>
                </div>
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <div>
          <Button outline className="eventActionButtons" color="info" onClick={toggleDelete} style={{ marginBottom: '1rem' }}>
            delete
          </Button>
          <Collapse isOpen={isDeleteOpen}>
            <Card >
              <CardBody className="collapseCard">
                <p className="deleteMessage">Are you absolutely sure?</p>
                <button className="editTitleLabel" onClick={() => {
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
