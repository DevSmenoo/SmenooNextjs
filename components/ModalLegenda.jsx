import React from "react";
import Image from "next/image";

const ModalLegenda = () => (
  <div
    className="modal fade"
    id="legendaModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog-centered modal-dialog">
      <div className="modal-content">
        <div className="modal-header text-center">
          <h5
            className="modal-title fs-5 text-center d-inline"
            id="exampleModalLabel"
          >
            Legenda
          </h5>
          <button
            type="button"
            className="btn-close d-inline"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body modal-body-legenda">
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-senza-glutine.svg"
              width={25}
              height={25}
              alt="senza-glutine"
            />
            <p>Senza glutine</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-vegano.svg"
              width={25}
              height={25}
              alt="vegano"
            />
            <p>Vegano</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-vegetariano.svg"
              width={25}
              height={25}
              alt="vegetariano"
            />
            <p>Vegetariano</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-biologico.svg"
              width={25}
              height={25}
              alt="biologico"
            />
            <p>Biologico</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-piccante.svg"
              width={25}
              height={25}
              alt="piccante"
            />
            <p>Piccante</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-senza-lattosio.svg"
              width={25}
              height={25}
              alt="senza-lattosio"
            />
            <p>Senza lattosio</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-congelato.svg"
              width={25}
              height={25}
              alt="congelato"
            />
            <p>Congelato</p>
          </div>
          <hr />
          <div className="d-flex align-items-center">
            <Image
              src="/img/2/legenda-abbattuto.svg"
              width={25}
              height={25}
              alt="abbattuto"
            />
            <p>Abbattuto</p>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  </div>
);

export default ModalLegenda;
