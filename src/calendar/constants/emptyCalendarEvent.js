import { addHours } from "date-fns";

const todayDate = new Date();
todayDate.setHours(todayDate.getHours() + 1, 0, 0, 0);

export const emptyCalendarEvent = {
  title: "",
  notes: "",
  start: todayDate,
  end: addHours(todayDate, 2),
};
