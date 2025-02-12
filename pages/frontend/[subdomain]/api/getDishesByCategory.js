// api/getDishesByCategory.js
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
    const idCategoria = req.query.idCategoria ? parseInt(req.query.idCategoria) : null;
    
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : null;
    // Need to get the idLocale from the subdomain... and it's an API call!
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    console.log('subdomain:', subdomain);
    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const [idrows] = await connection.execute('SELECT id FROM locali WHERE root = ?', [subdomain]);
    const idLocale = idrows[0] || null; // Set idLocale to 0 if not found... could be used to return a "Locale non trovato" message
    console.log('idLocale:', idLocale);
    
    const lang = req.query.lang || 'it';

    if (!idCategoria || !idLocale) {
      //close connection before sending the error response
      await connection.end();
      console.log('Connessione chiusa');
      res.status(400).json({ error: 'Missing idCategoria or idLocale' });
      return;
    }

    let qFiltro = '';
    if (req.query.f1) {
      qFiltro += " AND tag LIKE '%vegano%'";
    }
    if (req.query.f2) {
      qFiltro += " AND tag LIKE '%vegetariano%'";
    }
    if (req.query.f3) {
      qFiltro += " AND tag LIKE '%senza glutine%'";
    }
    if (req.query.f4) {
      qFiltro += " AND tag LIKE '%piccante%'";
    }

    

    // Costruisci la query SQL per recuperare i piatti della categoria
    const sql = `
      SELECT * FROM portata
      WHERE idCategoria = ? AND flagVisibile = 1 AND idLocale = ? ${qFiltro}
      ORDER BY ordineStampa ASC, nome ASC;
    `;
    console.log('SQL query:', sql);

    const [rows] = await connection.execute(sql, [idCategoria, idLocale]);
    console.log('Query eseguita, righe restituite:', rows.length);

    // Chiudi la connessione
    await connection.end();
    console.log('Connessione chiusa');

    // Rispondi con i dati dei piatti
    res.status(200).json(rows);
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
