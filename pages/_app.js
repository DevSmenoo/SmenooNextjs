// pages/_app.js
import '../styles/globals.css'; // Import global styles if you have any
import { LocaleProvider } from "../context/LocaleContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  let subdomain = null; // could be localhost
  if (pathSegments[1] === 'frontend') {
    // Dynamic subdomain case (e.g., `/frontend/[subdomain]/rest-of-path`)
    subdomain = pathSegments[2] || null;
  } else {
    // Reserved subdomains (e.g., `/indovino/...`, `/admin/...`)
    subdomain = pathSegments[1] || null;
  }

  const reservedSubdomains = ['indovino', 'admin', 'www'];

  // Change the layout based on the subdomain
  if (subdomain === 'admin') {
    return <Component {...pageProps} />;
  }

  if (subdomain === 'indovino') {
    return <Component {...pageProps} />;
  }

  // Layout for other subdomains that are not reserved
  if (subdomain && !reservedSubdomains.includes(subdomain)) {
    return (
      <LocaleProvider>
        <FavoritesProvider>
          <Component {...pageProps} />
        </FavoritesProvider>
      </LocaleProvider>
    );
  }
  // Default layout for main domain and www and 404
  return <Component {...pageProps} />;
}

export default MyApp;