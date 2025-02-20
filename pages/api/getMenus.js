// api/getMenus.js
const prisma = require('../../utils/prisma').default; // ✅ Import the default export

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

  try {
    // Recupera l'idLocale dai parametri della query, default a 1 se non specificato
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 1;
    // Need to get the idLocale from the subdomain... and it's an API call!
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    console.log('subdomain:', subdomain);

    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const idrow = await prisma.locali.findUnique({
        where: { root: subdomain },
    })
    const idLocale = idrow?.id || 0; // Set idLocale to 0 if not found... could be used to return a "Locale non trovato" message
    console.log('idLocale:', idLocale);
    if (!idLocale) {
      console.warn('Locale non trovato:', subdomain);
      res.status(404).json({ error: 'Locale non trovato' });
      return;
    }

    // Esegui la query per recuperare i menu attivi per il locale
    const [rows] = await prisma.menu.findMany({
      where: {
        idLocale: idLocale,
        flagActive: 1,
      },
    });

    // Verifica se sono stati restituiti dati
    if (!rows || rows.length === 0) {
      console.warn('Nessun menu trovato per il locale:', idLocale);
      res.status(404).json({ error: 'Nessun menu trovato' });
      return;
    }
    console.log('Query eseguita, righe restituite:', rows.length);
    // Rispondi con i dati dei menu
    res.status(200).json(rows);
    return;
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}
