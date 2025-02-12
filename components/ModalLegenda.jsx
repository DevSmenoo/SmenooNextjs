import React from "react";
import Image from 'next/image';


const ModalLegenda = () => (
  <div
    className="modal fade"
    id="legendaModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-backdrop="true"
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
          <div className="d-flex">
            <Image src="/img/4/legenda-senza-glutine.svg" width={1} height={1} />
            <p>Senza glutine</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-vegano.svg" width={1} height={1} />
            <p>Vegano</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-vegetariano.svg" width={1} height={1} />
            <p>Vegetariano</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-biologico.svg" width={1} height={1} />
            <p>Biologico</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-piccante.svg" width={1} height={1} />
            <p>Piccante</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-senza-lattosio.svg" width={1} height={1} />
            <p>Senza lattosio</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-congelato.svg" width={1} height={1} />
            <p>Congelato</p>
          </div>
          <hr />
          <div className="d-flex">
            <Image src="/img/4/legenda-abbattuto.svg" width={1} height={1} />
            <p>Abbattuto</p>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  </div>
);

export default ModalLegenda;
