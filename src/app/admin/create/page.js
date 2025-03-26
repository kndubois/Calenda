import { createEvent } from './actions';

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>

      <form action={createEvent} className="space-y-4">

        <div>
          <label className="block font-semibold mb-1">Event Name</label>
          <input type="text" name="event_name" required className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Date (MM-DD-YYYY)</label>
          <input type="text" name="event_date" required className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Location</label>
          <input type="text" name="event_location" required className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Description</label>
          <textarea name="event_description" rows="3" className="border border-gray-300 rounded p-2 w-full"></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Host</label>
          <input type="text" name="event_host" className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Event Capacity</label>
          <input type="number" name="event_capacity" min="1" className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">RSVP Link</label>
          <input type="url" name="event_rsvp_link" className="border border-gray-300 rounded p-2 w-full" />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" className="button blue">Submit</button>
          <a href="/admin" className="button dark" style={{ marginLeft: '1rem' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}