// api/getMenus.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Configurazione CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gestione del metodo OPTIONS per CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Configura i dettagli di connessione al database
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false
    }
  };

  try {
    // Crea una connessione al database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connessione al database riuscita');

    // Recupera l'idLocale dai parametri della query, default a 1 se non specificato
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 1;
    // Need to get the idLocale from the subdomain... and it's an API call!
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    console.log('subdomain:', subdomain);
    // Assuming this is within your handler function
    const query = 'SELECT id FROM locali WHERE root = ?';
    const finalQuery = connection.format(query, [subdomain]); // Format the query with the subdomain

    console.log('Executing query:', finalQuery); // Print the final query to the console

    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const [idrows] = await connection.execute('SELECT id FROM locali WHERE root = ?', [subdomain]);
    const idLocale = idrows[0] || 0; // Set idLocale to 0 if not found... could be used to return a "Locale non trovato" message
    console.log('idLocale:', idLocale);
    if (!idLocale) {
      res.status(404).json({ error: 'Locale non trovato' });
      return;
    }

    
    // Esegui la query per recuperare i menu attivi per il locale
    const [rows] = await connection.execute('SELECT * FROM menu WHERE idLocale = ? AND flagActive = 1', [idLocale]);
    console.log('Query eseguita, righe restituite:', rows.length);

    // Chiudi la connessione
    await connection.end();
    console.log('Connessione chiusa');

    // Rispondi con i dati dei menu
    res.status(200).json(rows);
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
