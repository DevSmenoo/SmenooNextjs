import React, { useRef } from "react";
import { useLocale } from "../context/LocaleContext";
import Image from "next/image";
import Link from "next/link";
import ModalPreferiti from "./ModalPreferiti";
import ModalFiltri from "./ModalFiltri";
import ModalLegenda from "./ModalLegenda";

const NavBar = ({ localeInfo, onFilterChange }) => {
  const { idLocale } = useLocale();
  const navbarRef = useRef(null);

  const changeLanguage = (event) => {
    // Logica per cambiare la lingua
    const selectedLanguage = event.target.value;
    // Implementa qui la logica per cambiare la lingua
  };

  // Funzione per chiudere il menu quando si apre un modal
  const closeNavbar = () => {
    if (navbarRef.current) {
      const bsCollapse = new bootstrap.Collapse(navbarRef.current, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-xs bg-head sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={() => document.body.classList.add("disable-scroll")}
          ></span>
        </button>
        <Link href="/">
          <Image
            className="logoNav"
            src={`/img/${idLocale}/${localeInfo.logoHeader}`}
            alt="Logo"
            width={1}
            height={1}
          />
        </Link>
        <div className="form-group">
          <select
            className="form-select"
            name="lingua"
            id="lang"
            onChange={changeLanguage}
          >
            {/* Aggiungi le opzioni per le lingue */}
            <option value="it">It</option>
            <option value="en">En</option>
          </select>
        </div>
      </div>
      <div
        className="collapse navbar-collapse"
        id="navbarTogglerDemo03"
        ref={navbarRef}
      >
        <button
          className="navbar-toggler floatR"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon navbar-toggler-iconBis"
            onClick={() => document.body.classList.remove("disable-scroll")}
          ></span>
        </button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item d-flex">
            <Image src="/img/home.svg" alt="Home" width={1} height={1} />
            <Link className="nav-link active" aria-current="page" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item d-flex">
            <Image
              src="/img/star-sideB.svg"
              alt="Preferiti"
              width={1}
              height={1}
              data-bs-toggle="modal"
              data-bs-target="#preferitiModal"
              onClick={closeNavbar}
            />
            <span
              className="nav-link with-action"
              data-bs-toggle="modal"
              data-bs-target="#preferitiModal"
              onClick={closeNavbar}
            >
              Preferiti
            </span>
          </li>
          <li className="nav-item d-flex">
            <Image
              src="/img/filtri-sideB.svg"
              alt="Filtri"
              width={1}
              height={1}
              data-bs-toggle="modal"
              data-bs-target="#filtriModal"
              onClick={closeNavbar}
            />
            <span
              className="nav-link with-action"
              data-bs-toggle="modal"
              data-bs-target="#filtriModal"
              onClick={closeNavbar}
            >
              Filtri
            </span>
          </li>
          <li className="nav-item d-flex">
            <Image
              src="/img/4/legenda-sideB.svg"
              alt="Legenda"
              width={1}
              height={1}
              data-bs-toggle="modal"
              data-bs-target="#legendaModal"
              onClick={closeNavbar}
            />
            <span
              className="nav-link with-action"
              data-bs-toggle="modal"
              data-bs-target="#legendaModal"
              onClick={closeNavbar}
            >
              Legenda
            </span>
          </li>
        </ul>
        <div className="text-center text-white powered">
          <p className="d-inline">Creato da</p>
          <Link
            href="https://smenoo.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="d-inline poweredSmenoo"
              src="/img/Logo-smenoo.svg"
              alt="Smenoo"
              width={1}
              height={1}
            />
          </Link>
        </div>
      </div>

      {/* Modali */}
      <ModalPreferiti />
      <ModalFiltri onFilterChange={onFilterChange} />
      <ModalLegenda />
    </nav>
  );
};

export default NavBar;
