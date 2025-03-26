import EditEventForm from './EditEventForm';

export default async function EditPage({ params }) {
  const res = await fetch(`http://localhost:4000/events/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <p className="text-red-600">Event not found.</p>
      </div>
    );
  }

  const event = await res.json();

  return <EditEventForm event={event} />;
}
