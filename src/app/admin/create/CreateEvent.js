'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from './actions';

export default function CreateEventForm() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventHost, setEventHost] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventRsvpLink, setEventRsvpLink] = useState('');
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const validateInputs = () => {
    const errs = [];

    if (eventName.length < 5 || eventName.length > 50) {
      errs.push('Event name must be between 5 and 50 characters.');
    }

    const dateRegex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[01])-\d{4}$/;
    if (!dateRegex.test(eventDate)) {
      errs.push('Event date must be in MM-DD-YYYY format.');
    } else {
      const [month, day, year] = eventDate.split('-');
      const inputDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      if (inputDate <= today) {
        errs.push('Event date must be in the future.');
      }
    }

    if (eventLocation.length < 3 || eventLocation.length > 30) {
      errs.push('Location must be between 3 and 30 characters.');
    }

    if (eventCapacity && (isNaN(eventCapacity) || eventCapacity < 1)) {
      errs.push('Capacity must be a number greater than 0.');
    }

    if (eventRsvpLink && !/^https?:\/\/.+/.test(eventRsvpLink)) {
      errs.push('RSVP link must be a valid URL starting with http:// or https://');
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.set('event_name', eventName);
    formData.set('event_date', eventDate);
    formData.set('event_location', eventLocation);
    formData.set('event_description', eventDescription);
    formData.set('event_host', eventHost);
    formData.set('event_capacity', eventCapacity);
    formData.set('event_rsvp_link', eventRsvpLink);

    await createEvent(formData);
    router.push('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>

      {errors.length > 0 && (
        <ul className="mb-4 text-red-600 list-disc list-inside bg-red-50 border border-red-200 p-4 rounded">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Event Name</label>
          <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Date (MM-DD-YYYY)</label>
          <input type="text" value={eventDate} onChange={e => setEventDate(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Location</label>
          <input type="text" value={eventLocation} onChange={e => setEventLocation(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Description</label>
          <textarea value={eventDescription} onChange={e => setEventDescription(e.target.value)} rows="3" className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Host</label>
          <input type="text" value={eventHost} onChange={e => setEventHost(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Capacity</label>
          <input type="number" value={eventCapacity} onChange={e => setEventCapacity(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">RSVP Link</label>
          <input type="text" value={eventRsvpLink} onChange={e => setEventRsvpLink(e.target.value)} className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div className="mt-4 flex gap-3">
          <button type="submit" className="button blue">Submit</button>
          <a href="/admin" className="button dark">Cancel</a>
        </div>
      </form>
    </div>
  );
}
