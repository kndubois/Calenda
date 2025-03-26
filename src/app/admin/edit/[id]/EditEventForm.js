'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditEventForm({ event }) {
  const [eventName, setEventName] = useState(event.event_name);
  const [eventDate, setEventDate] = useState(event.event_date);
  const [eventLocation, setEventLocation] = useState(event.event_location);
  const [eventDescription, setEventDescription] = useState(event.event_description || '');
  const [eventHost, setEventHost] = useState(event.event_host || '');
  const [eventCapacity, setEventCapacity] = useState(event.event_capacity || '');
  const [eventRsvpLink, setEventRsvpLink] = useState(event.event_rsvp_link || '');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validateInputs = () => {
    const validationErrors = [];

    if (eventName.length < 5 || eventName.length > 50) {
      validationErrors.push('Event name must be between 5 and 50 characters.');
    }

    const dateRegex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[01])-\d{4}$/;
    if (!dateRegex.test(eventDate)) {
      validationErrors.push('Event date must be in MM-DD-YYYY format.');
    } else {
      const [month, day, year] = eventDate.split('-');
      const inputDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      if (inputDate <= today) {
        validationErrors.push('Event date must be in the future.');
      }
    }

    if (eventLocation.length < 3 || eventLocation.length > 30) {
      validationErrors.push('Location must be between 3 and 30 characters.');
    }

    if (eventCapacity && (isNaN(eventCapacity) || eventCapacity < 1)) {
      validationErrors.push('Capacity must be a number greater than 0.');
    }

    if (eventRsvpLink && !/^https?:\/\/.+/.test(eventRsvpLink)) {
      validationErrors.push('RSVP link must be a valid URL starting with http:// or https://');
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedEvent = {
      id: event.id,
      event_name: eventName,
      event_date: eventDate,
      event_location: eventLocation,
      event_description: eventDescription,
      event_host: eventHost,
      event_capacity: eventCapacity,
      event_rsvp_link: eventRsvpLink,
    };

    await fetch(`http://localhost:4000/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });

    router.push('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5">
      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>

      {errors.length > 0 && (
        <ul className="mb-6 text-red-600 list-disc list-inside bg-red-50 border border-red-200 p-4 rounded">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
            <label className="block font-semibold mb-1">Event Name:</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="border border-gray-300 rounded p-2 w-full" required />
        </div>

        <div>
            <label className="block font-semibold mb-1">Event Date (MM-DD-YYYY):</label>
            <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="border border-gray-300 rounded p-2 w-full" required />
        </div>

        <div>
            <label className="block font-semibold mb-1">Event Location:</label>
            <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="border border-gray-300 rounded p-2 w-full" required />
        </div>

        <div>
            <label className="block font-semibold mb-1">Event Description</label>
            <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                rows="3"
                className="border border-gray-300 rounded p-2 w-full"
            ></textarea>
        </div>

        <div>
            <label className="block font-semibold mb-1">Event Host</label>
            <input
                type="text"
                value={eventHost}
                onChange={(e) => setEventHost(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>

        <div>
            <label className="block font-semibold mb-1">Event Capacity</label>
            <input
                type="number"
                min="1"
                value={eventCapacity}
                onChange={(e) => setEventCapacity(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>

        <div>
            <label className="block font-semibold mb-1">Event RSVP Link</label>
            <input
                type="text"
                value={eventRsvpLink}
                onChange={(e) => setEventRsvpLink(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="button blue">
            Save Changes
          </button>
          <a href="/admin" className="button dark">Cancel</a>
        </div>
      </form>
    </div>
  );
}
