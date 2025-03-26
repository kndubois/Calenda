import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="homepage">
      <h1>Welcome to Calenda</h1>
      <p>Your event manager app</p>
      <div className="button-row">
        <Link href="/collection" className="button blue">View Events</Link>
        <Link href="/admin" className="button dark">Admin Panel</Link>
      </div>
    </main>
  );
}
