import React from "react";

const ModalMenuSwitch = () => (
  <div
    className="modal fade"
    id="menuSwitchModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog-centered modal-dialog">
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
            <a href="menu-fisso.php">
              <div className="menuModal">
                <p>MENU FISSO</p>
              </div>
            </a>
            <a href="primi.php">
              <div className="menuModal">
                <p>MENU ALLA CARTA</p>
              </div>
            </a>
            <div className="menuModal">
              <p>CARTA DEI VINI</p>
            </div>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  </div>
);

export default ModalMenuSwitch;