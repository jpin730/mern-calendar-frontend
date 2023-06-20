import {
  calendarSlice,
  onAddNewEvent,
  onClearCalendar,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("calendarSlice", () => {
  test("should return initial state", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("should set active event", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events.at(0))
    );
    expect(state).toEqual(calendarWithActiveEventState);
  });

  test("should add a new event", () => {
    const newEvent = { ...events.at(0), id: "3" };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("should update event", () => {
    const updatedEvent = { ...events.at(0), title: "Updated title" };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events.at(0)).toEqual(updatedEvent);
  });

  test("should delete event", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events.at(0));
  });

  test("should load events", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state).toEqual(calendarWithEventsState);
  });

  test("should clear calendar", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onClearCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
