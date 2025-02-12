// pages/_app.js
import '../styles/globals.css'; // Import global styles if you have any

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;