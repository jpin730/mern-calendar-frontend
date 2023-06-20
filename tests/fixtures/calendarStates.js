export const events = [
  {
    id: "1",
    start: new Date("2000-01-01 00:00:00"),
    end: new Date("2000-01-01 01:00:00"),
    title: "Test Event 1",
    notes: "test note 1",
  },
  {
    id: "2",
    start: new Date("2000-01-02 00:00:00"),
    end: new Date("2000-01-02 01:00:00"),
    title: "Test Event 2",
    notes: "test note 2",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events.at(0) },
};
