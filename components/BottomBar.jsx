import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import ModalPreferiti from "./ModalPreferiti";
import ModalFiltri from "./ModalFiltri";
import ModalMenuSwitch from "./ModalMenuSwitch";
import ModalSommelier from "./ModalSommelier";
import ModalLegenda from "./ModalLegenda";
import Image from "next/image";

const BottomBar = ({ activeFiltersCount }) => {
  const { count: favoriteCount } = useFavorites();

  return (
    <div className="bottomBarMenu">
      {/* Mostra o nascondi il bollino in base al conteggio */}
      {favoriteCount > 0 && (
        <div className="counterBoxProvModal" id="prefBoll">
          <p className="d-inline text-white">
            <span id="cntPref">{favoriteCount}</span>{" "}
            {/* Mostra il conteggio */}
          </p>
        </div>
      )}
      <Image
        data-bs-toggle="modal"
        data-bs-target="#preferitiModal"
        className="with-action"
        id="preferitiIcon"
        name="image2"
        src="/img/preferiti-inactive.svg"
        alt="Preferiti Icon"
        width={24} // Sostituisci con la larghezza corretta
        height={24} // Sostituisci con l'altezza corretta
      />

      <Image
        data-bs-toggle="modal"
        data-bs-target="#sommelierModal"
        className="with-action"
        id="sommelierIcon"
        name="image5"
        src="/img/sommelier-inactive.svg"
        width={1}
        height={1}
      />
      {activeFiltersCount > 0 && (
        <div className="counterBoxProvModalFiltri" id="filtrBoll">
          <p className="d-inline text-white"></p>
          <span id="cntPref">{activeFiltersCount}</span>{" "}
          {/* Mostra il conteggio */}
        </div>
      )}
      <Image
        data-bs-toggle="modal"
        data-bs-target="#filtriModal"
        className="with-action"
        id="filtriIcon"
        name="image3"
        src="/img/filtri-inactive.svg"
        width={1}
        height={1}
      />
      <Image
        className="dotActive"
        src="/img/blue-active.svg"
        width={1}
        height={1}
      />
      <Image
        data-bs-toggle="modal"
        data-bs-target="#legendaModal"
        className="with-action"
        id="legendaIcon"
        name="image4"
        src="/img/legenda-inactive.svg"
        width={1}
        height={1}
      />

      {/* Modali */}
      <ModalMenuSwitch />
      <ModalPreferiti />
      <ModalFiltri />
      <ModalLegenda />
      <ModalSommelier />
    </div>
  );
};

export default BottomBar;

// Test
