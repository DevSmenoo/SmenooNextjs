// api/getDishesByCategory.js
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
    // Crea una connessione al database
    const idCategoria = req.query.idCategoria ? parseInt(req.query.idCategoria) : null;
    
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : null;
    // Need to get the idLocale from the subdomain... and it's an API call!
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    console.log('subdomain:', subdomain);
    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const idrow = await prisma.locali.findFirst({
      where: { root: subdomain },
    })
    const idLocale = idrow?.id || 0; // Set idLocale to 0 if not found... could be used to return a "Locale non trovato" message
    console.log('idLocale:', idLocale);
    
    const lang = req.query.lang || 'it';

    if (!idCategoria || !idLocale) {
      res.status(400).json({ error: 'Missing idCategoria or idLocale' });
      return;
    }

    const filters = [];
    if (req.query.f1) filters.push({ tag: { contains: 'vegano' } });
    if (req.query.f2) filters.push({ tag: { contains: 'vegetariano' } });
    if (req.query.f3) filters.push({ tag: { contains: 'senza glutine' } });
    if (req.query.f4) filters.push({ tag: { contains: 'piccante' } });
  

    

    // Costruisci la query SQL per recuperare i piatti della categoria
    // const sql = `
    //   SELECT * FROM portata
    //   WHERE idCategoria = ? AND flagVisibile = 1 AND idLocale = ? ${qFiltro}
    //   ORDER BY ordineStampa ASC, nome ASC;
    // `;

    // Execute Prisma query
    const rows = await prisma.portata.findMany({
      where: {
        idCategoria,
        flagVisibile: 1,
        idLocale,
        ...(filters.length > 0 && { OR: filters }), // Apply dynamic filters if any
      },
      orderBy: [
        { ordineStampa: 'asc' },
        { nome: 'asc' },
      ],
    });

    if (!rows) { 
      console.warn('Piatti non trovati per idCategoria:', idCategoria);
      res.status(400).json({ error: 'Piatti non trovati' });
      return;
    }

    console.log('Query eseguita, righe restituite:', rows.length);

    // Rispondi con i dati dei piatti
    res.status(200).json(rows);
    return;
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}
