import React, { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext'; // Importa il contesto
import MenuButton from '@/components/MenuButton';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --lightColor: #ffffff;
    --darkColor: #2F2F2F;
  }

  .courseRow {
    background-color: ${props => props.colorMain2};
    width: 100%;
  }

  .desktopIndexPad {
    background-color: ${props => props.colorMain2};
  }

  .bg-menu-header {
    background-image: url(/img/${props => props.idLocale}/${props => props.background});
  }

  #modalTimer .modal-footer button {
    background-color: ${props => props.colorMain1};
    border-color: ${props => props.colorMain1};
  }

  div.scrollmenu a:focus, .nav-link, .navbar-nav .nav-link.active, .navbar-nav .show>.nav-link, div.scrollmenu a {
    color: var(--darkColor) !important;
  }

  body, .navbar-collapse {
    background-color: #EDEBE7;
  }

  div.scrollmenu a {
    opacity: 0.6;
  }

  .bg-head {
    background-color: ${props => props.colorMain2};
  }

  ${props => props.idLocale === 2 && `
    @font-face {
      font-family: 'Century Gothic Bold';
      src: url('/font/CenturyGothicPaneuropeanBold.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Light';
      src: url('/font/CenturyGothicPaneuropeanLight.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Semibold';
      src: url('/font/CenturyGothicPaneuropeanSemiBold.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Paneuropean';
      src: url('/font/CenturyGothicPaneuropean-Light.woff2') format('woff2'),
           url('/font/CenturyGothicPaneuropean-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    .stickyNavScroll {
      background-image: url(/img/${props => props.idLocale}/bg-ardesia-mobile-3.jpg);
    }
    body {
      background-image: url(/img/${props => props.idLocale}/bg-ardesia-mobile-3.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 100vh;
    }
    #modalTimer .modal-footer button, .boxAlert p b {
      font-family: 'Century Gothic Bold';
    }
    div.scrollmenu a, .container.whiteBoxCourse b {
      font-family: 'Century Gothic Semibold', sans-serif;
    }
    .courseBox p {
      font-family: 'Century Gothic Paneuropean', sans-serif;
    }
    body, .boxAlert p, .boxAlert {
      font-family: 'Century Gothic Light';
    }
    div.scrollmenu a:focus, .nav-link, .navbar-nav .nav-link.active, .navbar-nav .show>.nav-link, div.scrollmenu a {
      color: var(--lightColor) !important;
    }
    @media (max-width: 496px) and (max-height: 1000px) {
      .logoNav {
        width: 15vw;
      }
    }
  `}
`;

const App = () => {
  const [localeInfo, setLocaleInfo] = useState({});
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const { idLocale } = useLocale(); // Usa il contesto per ottenere l'ID del locale

  useEffect(() => {
    const fetchLocaleInfo = async () => {
      try {
        const response = await fetch(`/api/getLocaleInfo?idLocale=${idLocale}`);
        const text = await response.text();
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = JSON.parse(text);
        setLocaleInfo(data);
      } catch (error) {
        setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await fetch(`/api/getMenus?idLocale=${idLocale}`);
        const text = await response.text();
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = JSON.parse(text);
        console.log('Menus:', data);
        setMenus(data);
      } catch (error) {
        setError(error.message);
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchLocaleInfo();
    fetchMenus();
  }, [idLocale]);

  return (
    <div className="App desktopIndexPad">
      <GlobalStyle
        colorMain1={localeInfo.colorMain1}
        colorMain2={localeInfo.colorMain2}
        idLocale={idLocale}
        background={localeInfo.background}
      />
      {error && <div className="error">Error: {error}</div>}

      <section className="bg-menu-header"></section>
      <section className="mainSecMenuHome">
        <div className="text-center logoBox">
          {localeInfo.logo && <img className="duardiLogo" src={`/img/${idLocale}/${localeInfo.logo}`} alt="Logo" />}
          <h1>{localeInfo.nomeLocale}</h1>
          <p className="text-left px-4">{localeInfo.descrizione}</p>
        </div>
        <br />
        {menus.map(menu => (
          <MenuButton key={menu.id} menu={menu} />
        ))}
        <div className="text-center moveSocialHome">
          {localeInfo.instagramLink && (
            <a href={localeInfo.instagramLink} target="_blank" title={`Pagina Instagram di ${localeInfo.nomeLocale}`}>
              <img className="d-inline px-3" src="/img/instagram.svg" alt="Instagram" />
            </a>
          )}
          {localeInfo.facebookLink && (
            <a href={localeInfo.facebookLink} target="_blank" title={`Pagina Facebook di ${localeInfo.nomeLocale}`}>
              <img className="d-inline px-3" src="/img/fb.svg" alt="Facebook" />
            </a>
          )}
          {localeInfo.tiktokLink && (
            <a href={localeInfo.tiktokLink} target="_blank" title={`Pagina TikTok di ${localeInfo.nomeLocale}`}>
              <img className="d-inline px-3" src="/img/tt.svg" alt="TikTok" />
            </a>
          )}
        </div>
        <div className="footer">
          <br /><br />
          <div className="text-center text-white">
            <a href="https://smenoo.it/" target="_blank" rel="noopener noreferrer">
              <img className="d-inline poweredSmenoo" src="/img/Logo-smenoo-home.svg" alt="Smenoo" />
            </a>
          </div>
        </div>
      </section>
      <script src="/js/bootstrap.bundle.js"></script>
      <script src="/js/jquery-3.6.1.min.js"></script>
      <script src="/js/main.js"></script>
      {((localeInfo.timer === true) || (localeInfo.scritta === true)) && (
        <script>
          {`
            window.addEventListener('DOMContentLoaded', () => {
                const myModal = new bootstrap.Modal(document.getElementById('modalTimer'));
                myModal.show();
            });
          `}
        </script>
      )}
    </div>
  );
};

export default App;