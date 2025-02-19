// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from './utils/subdomain';

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = req.headers.get('host');
  const subdomain = await getValidSubdomain(host);
  if (subdomain) {
    // we should reserve some subdomains for future use
    if (subdomain === 'www'){
        // Main domain, no subdomain
        console.log(`>>> No subdomain for ${host}, requesting as is: ${url.pathname}`);
        url.pathname = `/${url.pathname}`;
    } 
    else if (subdomain === 'indovino'){
        // Subdomain available, rewriting
        console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
        url.pathname = `/${subdomain}${url.pathname}`;
    }
    else if (subdomain === 'admin'){
        // Subdomain available, rewriting
        console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
        url.pathname = `/${subdomain}${url.pathname}`;
  
    }
    else {
        // Dynamic Subdomain available, rewriting
        console.log(`>>> Rewriting: ${url.pathname} to /frontend/${subdomain}${url.pathname}`);
        url.pathname = `/frontend/${subdomain}${url.pathname}`;
  
    }
  }
  else {
    // no subdomain, requesting the main domain
    console.log(`>>> No subdomain for ${host}, requesting as is: ${url.pathname}`);
    url.pathname = `/${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}