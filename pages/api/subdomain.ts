// pages/api/subdomain.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { host } = req.query;
  if (!host || typeof host !== 'string') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  let subdomain: string | null = null;
  const reservedSubdomains = ['www', 'admin', 'indovino'];

  if (host.includes('.') && host.split('.').length > 2) {
    const candidate = host.split('.')[0];

    if (reservedSubdomains.includes(candidate)) {
      return res.status(200).json({ subdomain: candidate });
    }

    // Query the database for a valid subdomain
    const result = await prisma.locali.findFirst({
      where: { root: candidate },
    });

    if (result) {
      subdomain = candidate;
    }
  }

  return res.status(200).json({ subdomain });
}
