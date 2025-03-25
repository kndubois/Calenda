import Link from "next/link";

export default async function AdminPage() {
  const res = await fetch("http://localhost:4000/events", {
    cache: "no-store",
  });
  const events = await res.json();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Link href="/admin/create" className="text-blue-600 underline">
        Create New
      </Link>
      <table className="border-collapse border border-gray-400 w-full mt-4">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">D</th>
            <th className="border p-2">E</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="border p-2">{event.id}</td>
              <td className="border p-2">{event.event_name}</td>
              <td className="border p-2">{event.event_date}</td>
              <td className="border p-2">{event.location}</td>
              <td className="border p-2 text-center">
                <form action={`/admin/delete/${event.id}`} method="post">
                  <button type="submit" className="text-red-600">D</button>
                </form>
              </td>
              <td className="border p-2 text-center">
                <Link href={`/admin/edit/${event.id}`} className="text-blue-600">
                  E
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
