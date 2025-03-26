'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!confirm('Are you sure you want to delete this event?')) return;

    setDeleting(true);

    await fetch(`http://localhost:4000/events/${id}`, {
      method: 'DELETE',
    });

    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="text-red-600"
      disabled={deleting}
    >
      {deleting ? 'Deleting...' : 'D'}
    </button>
  );
}
