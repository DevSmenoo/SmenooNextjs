import React from "react";

const ModalSommelier = () => (
  <div
    className="modal fade"
    id="sommelierModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog-centered modal-dialog">
      <div className="modal-content">
        <div className="modal-header modal-header-cerca">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body modal-body-cerca">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <h3 className="text-center">Sommelier Digitale</h3>
                  <div id="sommelierVirtuale"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  </div>
);

export default ModalSommelier;
