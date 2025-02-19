// utils/subdomain.ts
const prisma = require('./prisma').default; // ✅ Import the default export

export const getValidSubdomain = async (host?: string | null) => {
    let subdomain: string | null = null;

    if (!host && typeof window !== 'undefined') {
        // On client side, get the host from window
        host = window.location.host;
    }

    if (host && host.includes('.')) {
        // Check if the host has a subdomain. to be a valid subdomain, host.split('.') should return an array of 
        // lenghth === 3 or 4 (.co.uk)
        if (host.split('.').length <= 2) {
            return subdomain;
        }
        const candidate = host.split('.')[0];
        if (candidate && !candidate.includes('localhost')) {
            // check if the candidate is a reserved subdomain
            const reservedSubdomains = ['www', 'admin', 'indovino'];
            if (reservedSubdomains.includes(candidate)) {
                return candidate;
            }
            // Check if the candidate exists in the Locali table
            const result = await prisma.locali.findUnique({
                where: { root: candidate },
            });
            if (result) {
                subdomain = candidate; // Valid candidate found in the database
            }
        }
    }

    return subdomain;
};