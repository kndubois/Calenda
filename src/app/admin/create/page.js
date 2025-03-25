'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
    
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
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

    const res = await fetch('http://localhost:4000/events');
    const existingEvents = await res.json();
    const nextId = existingEvents.length > 0
        ? Math.max(...existingEvents.map(e => e.id)) + 1
        : 1;

    const newEvent = {
        event_name: eventName,
        event_date: eventDate,
        location,
    };

    await fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(newEvent),
    });

    router.push('/admin');
  };

  return (
    <div className="p-4">
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
                <label className="block">Event Name:</label>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
            <label className="block">Event Date (MM-DD-YYYY):</label>
            <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border p-2 w-full"
                required
            />
            </div>

            <div>
            <label className="block">Location:</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 w-full"
                required
            />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                Submit
            </button>
        </form>
    </div>
  );
}