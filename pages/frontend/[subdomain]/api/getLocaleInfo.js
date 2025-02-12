import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  console.log('Richiesta ricevuta per getLocaleInfo');

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
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 1;
    // Need to get the idLocale from the subdomain... and it's an API call!
    // Crea una connessione al database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connessione al database riuscita');

    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain

    console.log('subdomain:', subdomain);
    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const [rows] = await connection.execute('SELECT * FROM locali WHERE root = ?', [subdomain]);
    // const idLocale = idrows[0].id;
    // console.log('idLocale:', idLocale);

    // Esegui la query per recuperare le informazioni del locale
    // const [rows] = await connection.execute('SELECT * FROM locali WHERE id = ?', [idLocale]);
    console.log('Query eseguita, righe restituite:', rows);

    // Chiudi la connessione
    await connection.end();
    console.log('Connessione chiusa');

    // Verifica se sono stati restituiti dati e formatta la risposta
    if (rows.length > 0) {
      const row = rows[0];
      const localeInfo = {
        nomeLocale: row.nome,
        nomeLocaleMin: row.root,
        descrizione: row.descrizione,
        flagActive: row.flagActive,
        logo: row.logo,
        logoHeader: row.logoHeader,
        background: row.background,
        colorMain1: row.colorMain1,
        colorMain2: row.colorMain2,
        instagramLink: row.instagramLink,
        facebookLink: row.facebookLink,
        tiktokLink: row.tiktokLink
      };
      res.status(200).json(localeInfo);
    } else {
      res.status(404).json({ error: 'Locale non trovato' });
    }
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
