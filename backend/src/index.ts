import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { neon } from '@neondatabase/serverless';
import { cors } from 'hono/cors';

const sql = neon("Database URL");

const app = new Hono()


app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE'],
  })
)



const validateContact = (contact: any): Record<string, string> | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d+$/;
  const errors: Record<string, string> = {};

  if (contact.first_name.trim().length === 0) {
    errors.first_name = 'First name is required and should be a non-empty string';
  }
  if (contact.last_name.trim().length === 0) {
    errors.last_name = 'Last name is required and should be a non-empty string';
  }
  if (!emailRegex.test(contact.email)) {
    errors.email = 'A valid email is required';
  }
  if (!phoneRegex.test(contact.phone)) {
    errors.phone = 'Phone number should contain only digits';
  }
  if (typeof contact.company !== 'string' || contact.company.trim().length === 0) {
    errors.company = 'Company is required and should be a non-empty string';
  }
  if (typeof contact.job_title !== 'string' || contact.job_title.trim().length === 0) {
    errors.job_title = 'Job title is required and should be a non-empty string';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

app.post('/contacts', async (c) => {
  const contact = await c.req.json();
  const errors = validateContact(contact);
  if (errors) {
    return c.json({ errors }, 400);
  }

  try {
    const rows = await sql`SELECT * FROM contacts WHERE email = ${contact.email}`;
    if (rows.length > 0) {
      return c.json({ errors: { email: 'Email already exists' } }, 400);
    }

    await sql`
      INSERT INTO contacts (first_name, last_name, email, phone, company, job_title, created_at) 
      VALUES (${contact.first_name}, ${contact.last_name}, ${contact.email}, ${contact.phone}, ${contact.company}, ${contact.job_title}, ${new Date()})
    `;

    return c.json(contact);
  } catch (err: any) {
    return c.json({ errors: { server: err.message } }, 500);
  }
});

app.get('/contacts', async (c) => {
  try {
    const rows = await sql`SELECT * FROM contacts`;
    return c.json(rows);
  } catch (err: any) {
    return c.json({ errors: { server: err.message } }, 500);
  }
});

app.put('/contacts/:id', async (c) => {
  const id = c.req.param('id');
  const contact = await c.req.json();
  const errors = validateContact(contact);
  if (errors) {
    return c.json({ errors }, 400);
  }

  try {
    const rows = await sql`SELECT * FROM contacts WHERE id = ${id}`;
    if (rows.length === 0) {
      return c.json({ errors: { id: 'Contact not found' } }, 404);
    }

    const emailRows = await sql`SELECT * FROM contacts WHERE email = ${contact.email} AND id != ${id}`;
    if (emailRows.length > 0) {
      return c.json({ errors: { email: 'Email already exists' } }, 400);
    }
    

    await sql`
      UPDATE contacts 
      SET first_name = ${contact.first_name}, last_name = ${contact.last_name}, email = ${contact.email}, phone = ${contact.phone}, company = ${contact.company}, job_title = ${contact.job_title} 
      WHERE id = ${id}
    `;

    return c.json(contact);
  } catch (err: any) {
    return c.json({ errors: { server: err.message } }, 500);
  }
});

app.delete('/contacts/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const rows = await sql`SELECT * FROM contacts WHERE id = ${id}`;
    if (rows.length === 0) {
      return c.json({ errors: { id: 'Contact not found' } }, 404);
    }

    await sql`DELETE FROM contacts WHERE id = ${id}`;

    return c.json({ message: 'Contact deleted' });
  } catch (err: any) {
    return c.json({ errors: { server: err.message } }, 500);
  }
});

const port = 3000

serve({
  fetch: app.fetch,
  port
})