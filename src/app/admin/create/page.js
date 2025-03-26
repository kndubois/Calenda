import CreateEventForm from './CreateEvent';

export default function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-5 mb-5">
      <h2 className="text-xl font-bold mb-4">Create New Event</h2>
      <CreateEventForm />
    </div>
  );
}