'use server';

import { revalidatePath } from 'next/cache';

export async function updateEvent(event) {
  await fetch(`http://localhost:4000/events/${event.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  });

  revalidatePath('/admin');
  revalidatePath('/collection');
  revalidatePath(`/collection/${event.id}`);
  revalidatePath(`/admin/edit/${event.id}`);
}