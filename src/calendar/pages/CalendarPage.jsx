import { Calendar } from "react-big-calendar";
import { useEffect, useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../components";
import { useCalendarStore, useUiStore } from "../../hooks";
import { localizer } from "../../helpers";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347cf7",
      borderRadius: 0,
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
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

      <FabAddNew />

      <FabDelete />
    </>
  );
};
