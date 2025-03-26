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

  const date = new Date(Number(year), Number(month) - 1, Number(day));

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
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5 text-center">
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Event Not Found
        </h2>
        <p className="text-gray-700 mb-4">
          ID <strong>{params.id}</strong> not found
          <br></br>
          <br></br>
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
        <Link href="/collection" className="button blue">&larr; Back to Events</Link>
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
              <td className="label">Event Location</td>
              <td>{event.event_location}</td>
            </tr>
            {event.event_description && (
              <tr>
                <td className="label">Event Description</td>
                <td>{event.event_description}</td>
              </tr>
            )}
            {event.event_host && (
              <tr>
                <td className="label">Event Host</td>
                <td>{event.event_host}</td>
              </tr>
            )}
            {event.event_capacity && (
              <tr>
                <td className="label">Event Capacity</td>
                <td>{event.event_capacity}</td>
              </tr>
            )}
            {event.event_rsvp_link && (
              <tr>
                <td className="label">Event RSVP</td>
                <td>
                  <a href={event.event_rsvp_link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
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
