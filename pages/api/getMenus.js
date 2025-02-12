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
    // Recupera l'idLocale dai parametri della query, default a 1 se non specificato
    const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 1;

    // Crea una connessione al database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connessione al database riuscita');

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
