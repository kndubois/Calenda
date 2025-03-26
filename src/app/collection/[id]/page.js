import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/events");
  const events = await res.json();
  return events.slice(0, 10).map(event => ({
    id: event.id.toString(),
  }));
}

function formatDate(dateString) {
  const [month, day, year] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventDetail({ params }) {
  const res = await fetch(`http://localhost:4000/events/${params.id}`);

  if (!res.ok) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center bg-red-50 border border-red-200 rounded">
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Event Not Found
        </h2>
        <p className="text-gray-700 mb-4">
          Sorry, no event with ID <strong>{params.id}</strong> could be found.
          It may have been deleted or the URL may be incorrect.
        </p>
        <a href="/collection" className="button blue">
          Back to Events
        </a>
      </div>
    );
  }
  
  const event = await res.json();

  return (
    <div className="event-detail">
      <div className="mb-4">
        <Link href="/collection" className="text-blue-600 hover:underline">&larr; Back to Events</Link>
      </div>

      <div className="detail-card">
        <h2 className="text-2xl font-bold mb-4">{event.event_name}</h2>

        <table className="detail-table">
          <tbody>
            <tr>
              <td className="label">ID</td>
              <td>{event.id}</td>
            </tr>
            <tr>
              <td className="label">Event Name</td>
              <td>{event.event_name}</td>
            </tr>
            <tr>
              <td className="label">Event Date</td>
              <td>{formatDate(event.event_date)}</td>
            </tr>
            <tr>
              <td className="label">Location</td>
              <td>{event.event_location}</td>
            </tr>
            {event.description && (
              <tr>
                <td className="label">Description</td>
                <td>{event.description}</td>
              </tr>
            )}
            {event.host && (
              <tr>
                <td className="label">Host</td>
                <td>{event.host}</td>
              </tr>
            )}
            {event.capacity && (
              <tr>
                <td className="label">Capacity</td>
                <td>{event.capacity}</td>
              </tr>
            )}
            {event.rsvp_link && (
              <tr>
                <td className="label">RSVP</td>
                <td>
                  <a href={event.rsvp_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    RSVP Here
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
