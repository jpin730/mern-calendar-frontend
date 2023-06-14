import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import { useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, Navbar } from "../components";
import { localizer } from "../../helpers";

const events = [
  {
    title: "Boss' Birthday",
    notes: "Some notes",
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: 0,
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    // openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
    // setActiveEvent( event );
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Calendar
          startAccessor="start"
          endAccessor="end"
          defaultView={lastView}
          localizer={localizer}
          events={events}
          style={{ height: "calc(100vh - 100px)" }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
      </div>

      <CalendarModal />
    </>
  );
};
