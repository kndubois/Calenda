'use server';

import { revalidatePath } from 'next/cache';

export async function deleteEvent(formData) {
  const id = formData.get('id');

  await fetch(`http://localhost:4000/events/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/admin');
  revalidatePath('/collection');
  revalidatePath(`/collection/${id}`);
}