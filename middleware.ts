// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from './utils/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();
  const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;
  // Skip API calls
  if (url.pathname.startsWith('/api/')) {
    console.log(`>>> Skipping API request: ${url.pathname}`);
    return;
  }

  const host = req.headers.get('host');
  const subdomain = await getValidSubdomain(host, baseUrl);
  if (subdomain) {
    // we should reserve some subdomains for future use
    if (subdomain === 'www'){
        // for now Main domain, no www subfolder (but maybe in the future we want to have a subfolder www)
        console.log(`>>> No subdomain for ${host}, requesting as is: ${url.pathname}`);
        // url.pathname = `${url.pathname}`; // No need to modify url.pathname, just return it as-is.
    } 
    else if (subdomain === 'indovino' || subdomain === 'admin'){
        // Subdomain available, rewriting
        console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
        url.pathname = `/${subdomain}${url.pathname}`.replace(/^\/?/, "/"); // Ensures only one leading /
    }
    else {
        // Dynamic Subdomain available, rewriting
        console.log(`>>> Rewriting: ${url.pathname} to /frontend/${subdomain}${url.pathname}`);
        url.pathname = `/frontend/${subdomain}${url.pathname}`.replace(/^\/?/, "/");
  
    }
  }
  else {
    // no subdomain, requesting the main domain
    console.log(`>>> No subdomain for ${host}, requesting as is: ${url.pathname}`);
    // url.pathname = `${url.pathname}`; // No need to modify url.pathname, just return it as-is.
  }

  return NextResponse.rewrite(url);
}