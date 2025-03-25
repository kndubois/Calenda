export default async function Collection() {
    
    const res = await fetch('http://localhost:4000/events');
    const events = await res.json();
    
    return (
    <div>
        {events.map(event => (
            <div key={event.id} className="border p-4 mb-2">
                <h3>{event.event_name}</h3>
                <a href={`/collection/${event.id}`}>More</a>
            </div>
        ))}
    </div>
    );
}