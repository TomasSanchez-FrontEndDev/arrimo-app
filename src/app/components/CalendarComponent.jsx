import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Image from 'next/image';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuid } from 'uuid';

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting',
      start: new Date(),
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventTitle, setEditEventTitle] = useState('');

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventName = window.prompt('Enter event name');
    if (eventName) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventName,
          id: uuid(),
        },
      ]);
    }
  };

  const handleEditEvent = () => {
    if (editEventTitle && selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent ? { ...event, title: editEventTitle } : event
      );
      setEvents(updatedEvents);
      setEditEventTitle('');
      setSelectedEvent(null);
    }
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  return (
    <div className='w-full px-2 m-2'>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: 'today prev next',
          end: 'dayGridMonth dayGridWeek dayGridDay',
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        eventContent={({ event }) =>
          renderEventContent(
            event,
            handleDeleteEvent,
            setSelectedEvent,
            selectedEvent,
            editEventTitle,
            setEditEventTitle,
            handleEditEvent
          )
        }
      />
    </div>
  );
};

function renderEventContent(
  event,
  handleDeleteEvent,
  setSelectedEvent,
  selectedEvent,
  editEventTitle,
  setEditEventTitle,
  handleEditEvent
) {
  return (
    <div className='w-full my-1 mr-[2px] h-auto duration-1000'>
      <div className='flex items-center justify-between p-2'>
        <div className='flex space-x-2 items-center'>
          <Image
            src='/icons/TaskImage.svg'
            width={40}
            height={40}
            alt='Picture of the author'
          />
          <div className='flex flex-col text-white'>
            <i className=''>{event.title}</i>
          </div>
        </div>
        <div className='flex space-x-1 items-center'>
          <button onClick={() => setSelectedEvent(event.id)} className='mr-2'>
            <Image src='/icons/Edit.svg' width={20} height={20} alt='Edit' />
          </button>
          <button onClick={() => handleDeleteEvent(event)} className='mr-2'>
            <Image src='/icons/Trash.svg' width={18} height={18} alt='Trash' />
          </button>
        </div>
      </div>
      <div>
        {selectedEvent === event.id ? (
          <div className='flex mx-2 space-x-1'>
            <input
              type='text'
              value={editEventTitle}
              autoFocus
              maxlength='12'
              onChange={(e) => setEditEventTitle(e.target.value)}
              className='text-black w-4/5'
            />
            <button onClick={handleEditEvent} className='w-1/5'>
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CalendarComponent;
