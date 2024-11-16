import { neon } from '@neondatabase/serverless';

const sql = neon('Database URL');



const seedDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        phone VARCHAR(20),
        company VARCHAR(100),
        job_title VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    for (const contact of contacts) {
      await sql`
        INSERT INTO contacts (first_name, last_name, email, phone, company, job_title) 
        VALUES (${contact.firstName}, ${contact.lastName}, ${contact.email}, ${contact.phone}, ${contact.company}, ${contact.jobTitle})
      `;
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

seedDatabase();


export const contacts = [
    {
      "firstName": "Carter Petersen",
      "lastName": "Rosalyn Hale",
      "email": "adipiscing.non.luctus@icloud.com",
      "phone": "038-296-8865",
      "company": "Class PC",
      "jobTitle": "ornare"
  },
  {
      "firstName": "Amethyst Harmon",
      "lastName": "Anika Barlow",
      "email": "turpis.non@yahoo.couk",
      "phone": "033-693-7554",
      "company": "Per Inc.",
      "jobTitle": "sit"
  },
  {
      "firstName": "Bruce Baird",
      "lastName": "Adena Fuller",
      "email": "convallis.est@google.org",
      "phone": "083-718-0888",
      "company": "Nulla Facilisis LLC",
      "jobTitle": "sed,"
  },
  {
      "firstName": "Emery Gardner",
      "lastName": "Bruno O'connor",
      "email": "convallis.est@yahoo.ca",
      "phone": "002-318-6629",
      "company": "Quis Massa Incorporated",
      "jobTitle": "amet"
  },
  {
      "firstName": "Fatima Dominguez",
      "lastName": "Astra Wilson",
      "email": "duis.sit@icloud.net",
      "phone": "037-854-7964",
      "company": "Dictum Inc.",
      "jobTitle": "vulputate,"
      },
      {
          "firstName": "Regan Mcgee",
          "lastName": "Nelle Hobbs",
          "email": "sit.amet@icloud.edu",
          "phone": "029-137-0638",
          "company": "Sodales Elit LLP",
          "jobTitle": "lobortis quis,"
      },
      {
          "firstName": "Madison Kelly",
          "lastName": "Sebastian Lynch",
          "email": "pede.nec.ante@google.edu",
          "phone": "043-788-3671",
          "company": "Quisque Nonummy Ipsum Consulting",
          "jobTitle": "a, dui."
      },
      {
          "firstName": "Jaden Reese",
          "lastName": "Selma Clements",
          "email": "neque.venenatis@google.com",
          "phone": "037-901-6410",
          "company": "Ac PC",
          "jobTitle": "consequat, lectus"
      },
      {
          "firstName": "Alea Whitley",
          "lastName": "Sopoline Rowe",
          "email": "adipiscing.mauris@hotmail.net",
          "phone": "079-623-4560",
          "company": "A Dui Institute",
          "jobTitle": "in, cursus"
      },
      {
          "firstName": "Lucy Dyer",
          "lastName": "Kathleen Rowland",
          "email": "ac.turpis@hotmail.com",
          "phone": "022-966-5136",
          "company": "Nascetur LLP",
          "jobTitle": "sagittis augue,"
      },
      {
          "firstName": "Graham Hopper",
          "lastName": "Rhona Kent",
          "email": "ultrices.vivamus@outlook.com",
          "phone": "063-282-5468",
          "company": "Diam Duis Corporation",
          "jobTitle": "augue, eu"
      },
      {
          "firstName": "Magee Roberts",
          "lastName": "Kennan Sykes",
          "email": "magnis.dis.parturient@protonmail.org",
          "phone": "071-847-8605",
          "company": "Pretium Industries",
          "jobTitle": "sit amet"
      },
      {
          "firstName": "Theodore Patton",
          "lastName": "Lawrence Middleton",
          "email": "commodo.ipsum@icloud.org",
          "phone": "086-227-2667",
          "company": "At Libero Morbi Ltd",
          "jobTitle": "lobortis, nisi"
      },
      {
          "firstName": "Arden Leon",
          "lastName": "Bradley Henderson",
          "email": "eu.tellus@outlook.com",
          "phone": "011-422-5186",
          "company": "Cursus Luctus Foundation",
          "jobTitle": "Nunc ac"
      },
      {
          "firstName": "Laura Newman",
          "lastName": "Eric Walsh",
          "email": "et.commodo@icloud.org",
          "phone": "024-960-1301",
          "company": "Auctor Mauris PC",
          "jobTitle": "nibh."
      }
  ];