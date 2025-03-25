import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/events");
  const events = await res.json();
  return events.slice(0, 10).map(event => ({
    id: event.id.toString(),
  }));
}

export default async function EventDetail({ params }) {
  const res = await fetch(`http://localhost:4000/events/${params.id}`);

  if (!res.ok) {
    return (
      <div className="p-4">
        <p>No event found with ID {params.id}.</p>
        <Link href="/collection">Back</Link>
      </div>
    );
  }

  const event = await res.json();

  return (
    <div className="p-4">
      <Link href="/collection">Back</Link>
      <h2 className="text-xl font-bold mt-2 mb-4">{event.event_name}</h2>
      <table className="border-collapse border border-gray-400 w-full">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">ID</td>
            <td className="border p-2">{event.id}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Event Name</td>
            <td className="border p-2">{event.event_name}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Event Date</td>
            <td className="border p-2">{event.event_date}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Location</td>
            <td className="border p-2">{event.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
