// api/getCategories.js
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
    // Recupera i filtri dai parametri della query
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

    // Recupera idMenu e idLocale dai parametri della query o dai cookie
    const idMenu = req.query.idMenu || req.cookies.menuId;
    const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 0;

    if (!idLocale || !idMenu) {
      res.status(400).json({ error: 'idLocale or idMenu is missing' });
      return;
    }

    // Crea una connessione al database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connessione al database riuscita');

    // Esegui la query per recuperare le categorie
    const sql = `
      SELECT categoria.id, categoria.nome
      FROM portata
      INNER JOIN categoria ON categoria.id = portata.idCategoria
      INNER JOIN assCatMenu ON assCatMenu.idCategoria = categoria.id
      INNER JOIN assPortMenu ON assPortMenu.idPortata = portata.id
      WHERE categoria.flagVisibile = 1 AND categoria.idLocale = ? ${qFiltro} AND assCatMenu.idMenu = ? AND assPortMenu.idMenu = ?
      GROUP BY categoria.id
      ORDER BY categoria.ordineStampa ASC;
    `;
    console.log('SQL query:', sql);

    const [rows] = await connection.execute(sql, [idLocale, idMenu, idMenu]);
    console.log('Query eseguita, righe restituite:', rows.length);

    // Chiudi la connessione
    await connection.end();
    console.log('Connessione chiusa');

    // Rispondi con i dati delle categorie
    res.status(200).json(rows);
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
