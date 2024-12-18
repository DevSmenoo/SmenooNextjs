import React from 'react';
import { useLocale } from '../context/LocaleContext';

const NavBar = ({ localeInfo }) => {
  const { idLocale } = useLocale();

  const changeLanguage = (event) => {
    // Logica per cambiare la lingua
    const selectedLanguage = event.target.value;
    // Implementa qui la logica per cambiare la lingua
  };

  const openModalSidebar = (type) => {
    // Logica per aprire il modal sidebar
    console.log(`Open ${type} sidebar`);
  };

  return (
    <nav className="navbar navbar-expand-xs bg-head sticky-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" onClick={() => document.body.classList.add('disable-scroll')}></span>
        </button>
        <a href="/">
          <img className="logoNav" src={`/img/${idLocale}/${localeInfo.logoHeader}`} alt="Logo" />
        </a>
        <div className="form-group">
          <select className="form-select" name="lingua" id="lang" onChange={changeLanguage}>
            {/* Aggiungi le opzioni per le lingue */}
            <option value="it">It</option>
            <option value="en">En</option>
          </select>
        </div>
      </div>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <button className="navbar-toggler floatR" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon navbar-toggler-iconBis" onClick={() => document.body.classList.remove('disable-scroll')}></span>
        </button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item d-flex">
            <img src="/img/home.svg" alt="Home" />
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('preferiti')}>
            <img src="/img/star-sideB.svg" alt="Preferiti" />
            <a className="nav-link">Preferiti</a>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('filtri')}>
            <img src="/img/filtri-sideB.svg" alt="Filtri" />
            <a className="nav-link">Filtri</a>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('legenda')}>
            <img src="/img/4/legenda-sideB.svg" alt="Legenda" />
            <a className="nav-link">Legenda</a>
          </li>
        </ul>
        <div className="text-center text-white powered">
          <p className="d-inline">Creato da</p>
          <a href="https://smenoo.it/" target="_blank" rel="noopener noreferrer">
            <img className="d-inline poweredSmenoo" src="/img/Logo-smenoo.svg" alt="Smenoo" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
