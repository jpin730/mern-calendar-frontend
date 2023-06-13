import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import enUS from "date-fns/locale/en-US";

import { Navbar } from "../components/Navbar";

const locales = {
  "en-US": enUS,
};

const events = [
  {
    title: "Boss' Birthday",
    notes: "Buy a cake",
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
      />
    </>
  );
};
