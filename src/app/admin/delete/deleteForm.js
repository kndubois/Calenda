'use client';

import { useState } from 'react';

export default function DeleteButton({ id, action }) {
  const [deleting, setDeleting] = useState(false);

  const handleClick = (e) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      e.preventDefault();
    } else {
      setDeleting(true);
    }
  };

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600"
        disabled={deleting}
        onClick={handleClick}
      >
        {deleting ? 'Deleting…' : 'D'}
      </button>
    </form>
  );
}
