import Link from "next/link";

function formatDate(dateString) {
    const [month, day, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  export default async function Collection() {
    const res = await fetch("http://localhost:4000/events", { cache: "no-store" });
    const events = await res.json();
  
    return (
      <div className="collection-list">
        <h1 className="collection-heading">All Events</h1>
  
        {events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="collection-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h3 className="event-name">{event.event_name}</h3>
                <p className="event-meta"><strong>Date:</strong> {formatDate(event.event_date)}</p>
                <p className="event-meta"><strong>Location:</strong> {event.event_location}</p>
                <Link href={`/collection/${event.id}`} className="button blue small">More</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }