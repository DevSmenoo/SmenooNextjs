import React from "react";
import Image from "next/image";

const ModalFiltri = ({ onFilterChange }) => {
  console.log("onFilterChange ricevuta:", onFilterChange); // Debug
  return (
  <div
    className="modal fade"
    id="filtriModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog-centered modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="container popupMenuSwitch">
            <div className="d-flex align-items-center">
              <Image
                src="/img/Hot.svg"
                width={1}
                height={1}
                alt="Hot Icon"
                className="imgFiltri"
              />
              <p className="filtriModalTitle">Hot</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={() => {
                    onFilterChange("piccante");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <Image
                src="/img/Vegano-grigia.svg"
                width={1}
                height={1}
                className="imgFiltri"
                alt="vegano-grigia"
              />
              <p className="filtriModalTitle">Vegano</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={() => onFilterChange("vegano")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <Image
                src="/img/Vegetariano-grigia.svg"
                width={1}
                height={1}
                className="imgFiltri"
                alt="vegetariano-grigia"
              />
              <p className="filtriModalTitle">Vegetariano</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={() => onFilterChange("vegetariano")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <Image
                className="imgFiltri"
                src="/img/Senza-Glutine-Grigia.svg"
                width={1}
                height={1}
                alt="senza-glutine-grigia"
              />
              <p className="filtriModalTitle">Naturalmente privo di glutine</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={() => onFilterChange("senza glutine")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  </div>
)};

export default ModalFiltri;
