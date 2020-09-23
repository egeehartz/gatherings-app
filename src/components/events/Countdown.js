import React from "react"

export const Countdown = ({event}) => {

  const now = new Date().getTime();
  const convertedEvtDate = Date.parse(event.date)
  const distance = convertedEvtDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  const countdown = days + " days left!" 

    return (
    <div>
        {days < 0 ? "" : 
            days === 0 ? "Today is the day!" : 
            days === 1 ? "Tomorrow!!" :
            countdown}
    </div>
    )
}