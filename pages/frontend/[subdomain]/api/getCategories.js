// api/getCategories.js
const prisma = require('../../../../utils/prisma').default; // ✅ Import the default export

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
    // Recupera i filtri dai parametri della query
    // let qFiltro = '';
    // if (req.query.f1) {
    //   qFiltro += " AND tag LIKE '%vegano%'";
    // }
    // if (req.query.f2) {
    //   qFiltro += " AND tag LIKE '%vegetariano%'";
    // }
    // if (req.query.f3) {
    //   qFiltro += " AND tag LIKE '%senza glutine%'";
    // }
    // if (req.query.f4) {
    //   qFiltro += " AND tag LIKE '%piccante%'";
    // }
    // Esegui la query per recuperare le categorie
    // const sql = `
    //   SELECT categoria.id, categoria.nome
    //   FROM portata
    //   INNER JOIN categoria ON categoria.id = portata.idCategoria
    //   INNER JOIN assCatMenu ON assCatMenu.idCategoria = categoria.id
    //   INNER JOIN assPortMenu ON assPortMenu.idPortata = portata.id
    //   WHERE categoria.flagVisibile = 1 AND categoria.idLocale = ? ${qFiltro} AND assCatMenu.idMenu = ? AND assPortMenu.idMenu = ?
    //   GROUP BY categoria.id
    //   ORDER BY categoria.ordineStampa ASC;
    // `;
    // const [rows] = await connection.execute(sql, [idLocale, idMenu, idMenu]);

    // Construct dynamic filtering conditions (Prisma cannot parse LIKE queries)
    const filters = [];
    if (req.query.f1) filters.push({ tag: { contains: 'vegano' } });
    if (req.query.f2) filters.push({ tag: { contains: 'vegetariano' } });
    if (req.query.f3) filters.push({ tag: { contains: 'senza glutine' } });
    if (req.query.f4) filters.push({ tag: { contains: 'piccante' } });

    // Recupera idMenu e idLocale dai parametri della query o dai cookie
    const idMenu = req.query.idMenu || req.cookies.menuId;
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 0;
    // Need to get the idLocale from the subdomain... and it's an API call!
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    console.log('subdomain:', subdomain);
    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    idrow = await prisma.locali.findUnique({
        where: { root: subdomain },
    })
    const idLocale = idrow?.id || 0; // Set idLocale to 0 if not found... could be used to return a "Locale non trovato" message
    console.log('idLocale:', idLocale);

    if (!idLocale || !idMenu) {
      console.warn('idLocale or idMenu is missing');
      res.status(400).json({ error: 'idLocale or idMenu is missing' });
      return;
    }

    
    const rows = await prisma.categoria.findMany({
      where: {
        flagVisibile: true,
        idLocale,
        ...(filters.length > 0 && { OR: filters }), // Apply dynamic filters if any
        assCatMenu: {
          some: {
            idMenu,
          },
        },
        portata: {
          some: {
            assPortMenu: {
              some: {
                idMenu,
              },
            },
          },
        },
      },
      orderBy: {
        ordineStampa: 'asc',
      },
      select: {
        id: true,
        nome: true,
      },
    });

    if (!rows) {
      console.warn('Categorie non trovate per idMenu:', idMenu);
      res.status(400).json({ error: 'Categorie non trovate' });
      return;
    }
    console.log('Query eseguita, righe restituite:', rows.length);
    // Rispondi con i dati delle categorie
    res.status(200).json(rows);
    return;
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}
