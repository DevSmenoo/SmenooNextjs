import React from "react";

const ModalFiltri = ({ onFilterChange }) => (
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
            <div className="d-flex">
              <img src="/img/Hot.svg" />
              <p className="filtriModalTitle">Hot</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => onFilterChange("piccante")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex">
              <img src="/img/Vegano-grigia.svg" />
              <p className="filtriModalTitle">Vegano</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => onFilterChange("vegano")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex">
              <img src="/img/Vegetariano-grigia.svg" />
              <p className="filtriModalTitle">Vegetariano</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={() => onFilterChange("vegetariano")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </div>
            </div>
            <hr />
            <div className="d-flex">
              <img className="sGlutLeg" src="/img/Senza-Glutine-Grigia.svg" />
              <p className="filtriModalTitle">Naturalmente privo di glutine</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
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
);

export default ModalFiltri;