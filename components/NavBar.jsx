import React from 'react';
import { useLocale } from '../context/LocaleContext';
import Image from 'next/image';
import Link from 'next/link';


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
        <Link href="/">
          <Image className="logoNav" src={`/img/${idLocale}/${localeInfo.logoHeader}`} alt="Logo" />
        </Link>
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
            <Image src="/img/home.svg" alt="Home" />
            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('preferiti')}>
            <Image src="/img/star-sideB.svg" alt="Preferiti" />
            <Link className="nav-link">Preferiti</Link>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('filtri')}>
            <Image src="/img/filtri-sideB.svg" alt="Filtri" />
            <Link className="nav-link">Filtri</Link>
          </li>
          <li className="nav-item d-flex" onClick={() => openModalSidebar('legenda')}>
            <Image src="/img/4/legenda-sideB.svg" alt="Legenda" />
            <Link className="nav-link">Legenda</Link>
          </li>
        </ul>
        <div className="text-center text-white powered">
          <p className="d-inline">Creato da</p>
          <Link href="https://smenoo.it/" target="_blank" rel="noopener noreferrer">
            <Image className="d-inline poweredSmenoo" src="/img/Logo-smenoo.svg" alt="Smenoo" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
