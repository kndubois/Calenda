'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData) {
  const res = await fetch('http://localhost:4000/events');
  const existingEvents = await res.json();

  const numericIds = existingEvents
    .map(e => +e.id) 
    .filter(id => !isNaN(id));

  const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

  const event = {
    id: String(nextId),
    event_name: String(formData.get('event_name')),
    event_date: String(formData.get('event_date')),
    event_location: String(formData.get('event_location')),
    event_description: String(formData.get('event_description') || ''),
    event_host: String(formData.get('event_host') || ''),
    event_capacity: formData.get('event_capacity') ? Number(formData.get('event_capacity')) : null,
    event_rsvp_link: String(formData.get('event_rsvp_link') || ''),
  };
  

  await fetch('http://localhost:4000/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event), 
  });

  revalidatePath('/collection');
  revalidatePath('/admin');

  redirect('/admin');
}
