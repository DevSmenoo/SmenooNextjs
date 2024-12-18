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
    const idCategoria = req.query.idCategoria ? parseInt(req.query.idCategoria) : null;
    const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : null;
    const lang = req.query.lang || 'it';

    if (!idCategoria || !idLocale) {
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

    // Crea una connessione al database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connessione al database riuscita');

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
