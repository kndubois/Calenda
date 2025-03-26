'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
    
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventHost, setEventHost] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [eventRsvpLink, setEventRsvpLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (location.length < 3 || location.length > 30) {
        validationErrors.push('Location must be between 3 and 30 characters.');
    }

    if (eventLocation.length < 3 || eventLocation.length > 30) {
        validationErrors.push('Location must be between 3 and 30 characters.');
    }
  

    if (eventCapacity && (isNaN(eventCapacity) || eventCapacity <= 0)) {
        validationErrors.push('Capacity must be a positive number.');
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

    setIsSubmitting(true);

    const res = await fetch('http://localhost:4000/events');
    const existingEvents = await res.json();

    const numericIds = existingEvents
        .map(e => parseInt(e.id))
        .filter(id => !isNaN(id));

    const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

    const newEvent = {
        id: nextId,
        event_name: eventName,
        event_date: eventDate,
        event_location: eventLocation,
        event_description: eventDescription,
        event_host: eventHost,
        event_capacity: eventCapacity,
        event_rsvp_link: rsvpLink,
    };

    await fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(newEvent),
    });

    setIsSubmitting(false);
    router.push('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5">
        <h2 className="text-xl font-bold mb-4">Create New Event</h2>
        {errors.length > 0 && (
            <ul className="mb-4 text-red-600 list-disc list-inside">
                {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block font-semibold mb-1">Event Name:</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full"
                    required
                />
            </div>

            <div>
            <label className="block font-semibold mb-1">Event Date (MM-DD-YYYY):</label>
            <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                required
            />
            </div>

            <div>
            <label className="block font-semibold mb-1">Event Location:</label>
            <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                required
            />
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


            <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="button blue" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Submit'}</button>
                <a href="/admin" className="button dark" style={{ marginLeft: '1rem' }}>Cancel</a>
            </div>

        </form>
    </div>
  );
}