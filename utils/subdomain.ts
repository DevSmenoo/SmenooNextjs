// utils/subdomain.ts
import mysql from 'mysql2/promise'; // Import MySQL library

export const getValidSubdomain = async (host?: string | null) => {
    let subdomain: string | null = null;

    if (!host && typeof window !== 'undefined') {
        // On client side, get the host from window
        host = window.location.host;
    }

    if (host && host.includes('.')) {
        const candidate = host.split('.')[0];
        if (candidate && !candidate.includes('localhost')) {
            // Create a database connection
            const dbConfig = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: Number(process.env.DB_PORT), // Ensure this is a number
                ssl: {
                    rejectUnauthorized: false
                }
            };

            const connection = await mysql.createConnection(dbConfig);

            // Check if the candidate exists in the Locali table
            const [rows] = await connection.execute('SELECT COUNT(*) as count FROM locali WHERE root = ?', [candidate]);
            const count = rows[0].count;

            if (count > 0) {
                subdomain = candidate; // Valid candidate found in the database
            }

            await connection.end(); // Close the database connection
        }
    }

    return subdomain;
};