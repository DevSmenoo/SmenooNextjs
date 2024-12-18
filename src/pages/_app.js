import { LocaleProvider } from "@/context/LocaleContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "../styles/globals.css"; // Importa gli stili globali

function MyApp({ Component, pageProps }) {
  return (
    <LocaleProvider>
      <FavoritesProvider>
          <Component {...pageProps} />;
      </FavoritesProvider>
    </LocaleProvider>
  );
}

export default MyApp;

/* Test */