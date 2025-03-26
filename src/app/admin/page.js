import Link from "next/link";
import DeleteButton from './delete/DeleteButton';

export default async function AdminPage() {
  const res = await fetch("http://localhost:4000/events", {
    cache: "no-store",
  });
  const events = await res.json();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <Link href="/admin/create" className="button blue">
          + Create Event
        </Link>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full border border-gray-300 text-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center">ID</th>
              <th className="border px-4 py-2 text-left">Event Name</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-center">Edit</th>
              <th className="border px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{event.id}</td>
                <td className="border px-4 py-2">{event.event_name}</td>
                <td className="border px-4 py-2">{event.event_date}</td>
                <td className="border px-4 py-2">{event.event_location}</td>

                <td className="border px-4 py-2 text-center">
                  <Link
                    href={`/admin/edit/${event.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>

                <td className="border px-4 py-2 text-center">
                  <DeleteButton id={event.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
