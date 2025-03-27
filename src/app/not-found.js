import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <p>Sorry, we couldn’t find what you were looking for.</p>
      <Link href="/" className="button blue">
        Go Home
      </Link>
    </main>
  );
}