import Link from "next/link";

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
                <p className="event-id">#{event.id}</p>
                <h3 className="event-name">{event.event_name}</h3>
                <Link href={`/collection/${event.id}`} className="button blue small">More</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }