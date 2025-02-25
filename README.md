This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Remember: use NODE 20!

## Database Connection
This project needed to change the database connection to use Prisma ORM, because Mysql2 uses some APIs that are not supported by [Vercel Serverless Edge Functions](https://vercel.com/docs/functions/edge-middleware/edge-runtime).
Now the database connection is handled by Prisma ORM.
The actual schema has been recovered by using the `npx prisma db pull` command to let it Introspect the database.
In this way, the schema is kept up-to-date and the database is always in sync with the model.

Once the schema is set up, we can generate the Prisma client using the `npx prisma generate` command.

If we want to modify the schema, we can do so inside the file `schema.prisma` and use the `npx prisma db push` command to push the changes to the database (this will also regenerate the Prisma client).

We can also use `npx prisma studio` to interact with the database directly: it's a GUI tool like phpMyAdmin.

Prisma, other than the ORM manager, can also supply paid cloud databases and a paid [Pulse](https://www.prisma.io/pulse) service to react to realtime changes in the database.

## URL Rewriting for Subdomains
In this project, we use URL rewriting to handle requests for subdomains. This is necessary because Next.js does not support subdomains by default, so we need to use a custom middleware to handle the requests and redirect them to the appropriate subdomain.

The middleware is located in `middleware.ts` and is used to rewrite the request URL to the appropriate subdomain.
It uses the `getValidSubdomain` function from `utils/subdomain.ts` to validate the subdomain and return the appropriate subdomain by rewriting INTERNALLY them to the appropriate folder under `/frontend`. If the subdomain is not valid, it returns null, and the request is not rewritten (it goes to the main domain, which is responsible for handling the request and rendering a 404 page if needed).

There are some subdomains that are reserved and are listed inside `utils/subdomain.ts` and used by the middleware to rewrite the request using the right folder structure.
Each reserved subdomain has a folder inside `pages` where it is located and has its `api` folder.

In this way, resources like cache and cookies are isolated by subdomain, ensuring that each subdomain has its own cache and cookies.

Static Files (usually images and other assets that you put inside the `public` folder) that are stored under _next are not rewritten and are served directly by Next.js.

In _app.js we used the next router to read the subfolder that has been rewritten and load the correct layout. This is possible because the router in the middleware is used to rewrite the request only internally, while the user sees the unmodified URL.

| **User URL**                        | **Middleware Rewrite**     | **`router.pathname`**      | **Full Internal Path**                      |
|--------------------------------------|---------------------------|----------------------------|---------------------------------------------|
| `https://indovino.example.com/shop`  | `/indovino/shop`          | `/indovino/shop`           | `https://indovino.example.com/indovino/shop` |
| `https://admin.example.com/dashboard` | `/admin/dashboard`       | `/admin/dashboard`         | `https://admin.example.com/admin/dashboard` |
| `https://random.example.com/blog`   | `/frontend/random/blog`   | `/frontend/random/blog`    | `https://random.example.com/frontend/random/blog` |


## Theming
We can create different themes under `styles/themes` and load them dynamically based on the subdomain.
example with protocode (you'll have to correct it for the real project):

```javascript
// pages/frontend/[subdomain]/api/getTheme.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { subdomain } = req.query; // Get subdomain from query parameters

  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };

  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute('SELECT theme FROM locali WHERE root = ?', [subdomain]);
    if (rows.length > 0) {
      res.status(200).json({ theme: rows[0].theme });
    } else {
      res.status(404).json({ message: 'Subdomain not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  } finally {
    await connection.end();
  }
}
```

```javascript
// pages/frontend/[subdomain]/_app.js
import { useEffect, useState } from 'react';
import defaultTheme from '../../../styles/themes/defaultTheme';

function SubdomainApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const host = window.location.hostname; // Get the current hostname
    const subdomain = host.split('.')[0]; // Extract the subdomain

    // Fetch the theme preference from the API
    const fetchTheme = async () => {
      const response = await fetch(`/frontend/${subdomain}/api/getTheme`);
      if (response.ok) {
        const data = await response.json();
        // Load the theme based on the preference
        const themeName = data.theme; // Assume this returns the theme name
        import(`../../../styles/themes/${themeName}`).then((themeModule) => {
          setTheme(themeModule.default);
        });
      } else {
        setTheme(defaultTheme); // Fallback to default theme
      }
    };

    fetchTheme();
  }, []);

  return (
    <div style={{ background: theme.background, color: theme.color }}>
      <Component {...pageProps} />
    </div>
  );
}

export default SubdomainApp;
```