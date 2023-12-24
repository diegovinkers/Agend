import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {

  return (
    <div className="w-full h-screen">
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh" }}
        views={['month', 'week', 'day', 'agenda']}
        defaultView='month'
      />
    </div>
  );
};

export default CalendarPage;
