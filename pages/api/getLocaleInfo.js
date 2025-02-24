// pages/frontend/[subdomain]/api/getLocaleInfo.js
const prisma = require('../../utils/prisma').default; // ✅ Import the default export

export default async function handler(req, res) {
  console.log('Richiesta ricevuta per getLocaleInfo');

  try {
    // Recupera l'idLocale dai parametri della query, default a 1 se non specificato
    // const idLocale = req.query.idLocale ? parseInt(req.query.idLocale) : 1;
    // Need to get the idLocale from the subdomain... and it's an API call!
    // Crea una connessione al database

    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain

    console.log('subdomain:', subdomain);
    // Use the database to get the id from the row of the Locali table where the root matches the subdomain
    const row = await prisma.locali.findFirst({
        where: { root: subdomain },
    });


    // Verifica se sono stati restituiti dati e formatta la risposta
    if (row) {
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
      // console.log('localeInfo:', localeInfo);
      res.status(200).json(localeInfo);
      return;
    } else {
      console.warn(`No locale found for subdomain: ${subdomain}`);
      res.status(404).json({ error: 'Locale non trovato' });
      return;
    }
  } catch (error) {
    console.error('Errore nella serverless function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
}
