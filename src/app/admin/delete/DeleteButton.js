'use client';

import { deleteEvent } from '../delete/actions';

export default function DeleteButton({ id }) {

  const handleClick = (e) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteEvent}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600"
        onClick={handleClick}
      >D</button>
    </form>
  );
}
