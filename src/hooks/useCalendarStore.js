import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { parseEventDates } from "../helpers";
import { calendarApi } from "../api";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        const { data } = await calendarApi.post("/events", calendarEvent);
        dispatch(
          onAddNewEvent({ ...calendarEvent, id: data.createdEvent.id, user })
        );
      }
    } catch (error) {
      Swal.fire("Error on saving", error?.response?.data?.msg || "", "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire("Error on deleting", error?.response?.data?.msg || "", "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = parseEventDates(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
