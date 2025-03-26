'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateEvent } from './actions';

export default function EditEventForm({ event }) {

  const [eventName, setEventName] = useState(event.event_name);
  const [eventDate, setEventDate] = useState(event.event_date);
  const [eventLocation, setEventLocation] = useState(event.event_location);
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

    const updatedEvent = {
        id: event.id,
        event_name: eventName,
        event_date: eventDate,
        event_location: eventLocation,
    };

    await fetch(`http://localhost:4000/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
    });

    setIsSubmitting(false);
    router.push('/admin');
  };



  return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        
        {errors.length > 0 && (
            <ul className="mb-4 text-red-600 list-disc list-inside">
                {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Event Name:</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            <div>
                <label className="block">Event Date (MM-DD-YYYY):</label>
                <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>

            <div>
                <label className="block">Event Location:</label>
                <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div style={{ marginTop: '1rem' }}>
                <button type="submit" className="button blue" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                <a href="/admin" className="button dark" style={{ marginLeft: '1rem' }}>Cancel</a>
            </div>

        </form>
    </div>
  );
}