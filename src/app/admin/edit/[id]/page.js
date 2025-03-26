import EditEventForm from './EditEventForm';

export default async function EditPage({ params }) {
  const res = await fetch(`http://localhost:4000/events/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-lg font-semibold mb-2">Event not found</h2>
        <a href="/admin" className="button blue">Back to Admin</a>
      </div>
    );
  }

  const event = await res.json();
  return <EditEventForm event={event} />;
}
