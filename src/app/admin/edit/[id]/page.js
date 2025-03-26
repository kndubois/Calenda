import EditEventForm from './EditEventForm';

export default async function EditPage({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:4000/events/${id}`);
  

  if (!res.ok) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5 text-center">
        <h2 className="text-lg font-semibold mb-2">ID <strong>{id}</strong> not found</h2>
        <a href="/admin" className="button blue">Back to Admin</a>
      </div>
    );
  }

  const event = await res.json();
  return <EditEventForm event={event} />;
}
