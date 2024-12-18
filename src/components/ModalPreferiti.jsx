import React from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { useLocale } from "@/context/LocaleContext";

const ModalPreferiti = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { idLocale } = useLocale();

  return (
    <div
      className="modal fade"
      id="preferitiModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog-centered modal-dialog">
        <div className="modal-content modal-content-preferiti">
          <div className="modal-header">
            <h5 className="modal-title fs-5 text-center" id="exampleModalLabel">
              Preferiti
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body" id="modalPrefBody">
            {favorites.length > 0 ? (
              favorites.map((dish) => (
                <div key={dish.id} className="container whiteBoxCourseModal">
                  <div className="d-flex">
                    {dish.tag && dish.tag.includes("new") && (
                      <img className="d-inline newTag" src="/img/new.svg" />
                    )}
                    <div className="box">
                      <p className="d-inline">
                        <b>{dish.nome}</b>
                      </p>
                    </div>
                    <img
                      className="starPr floatR d-inline"
                      src="/img/Stella-attiva-preferiti.svg"
                      alt="Rimuovi dai preferiti"
                      onClick={() => removeFavorite(dish.id)}
                    />
                  </div>
                  <p className="desc">{dish.ingredienti}</p>
                  <p className="price floatL d-inline">
                    [{" "}
                    <span className="priceSmall" style={{ fontSize: "14px" }}>
                      {dish.p1}
                    </span>{" "}
                    ]
                  </p>
                  {/* Allergeni */}
                  {dish.allergeni && (
                    <div>
                      <img
                        data-bs-toggle="modal"
                        data-bs-target={`#infoModal${dish.id}`}
                        className="floatR infoAll"
                        src="/img/infoAll.svg"
                        alt="Allergeni"
                      />
                      <div
                        className="modal fade modalInfo"
                        id={`infoModal${dish.id}`}
                        tabIndex="-1"
                        aria-labelledby="infoModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog-centered modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5 text-center">
                                Allergeni
                              </h1>
                              <button
                                type="button"
                                className="btn-close closeAbs"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body modal-body-cerca">
                              <div className="container">
                                <div className="row">
                                  <div className="col-12">
                                    <p>{dish.allergeni}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Legenda */}
                  <div
                    data-bs-toggle="modal"
                    data-bs-target="#legendaModal"
                    className="floatR"
                  >
                    {dish.tag && dish.tag.includes("senza glutine") && (
                      <img
                        src={`/img/${idLocale}/legenda-senza-glutine.svg`}
                        alt="Senza glutine"
                        className="floatR"
                      />
                    )}
                    {dish.tag && dish.tag.includes("vegano") && (
                      <img src={`/img/${idLocale}/legenda-vegano.svg`} alt="Vegano" className="floatR"/>
                    )}
                    {dish.tag && dish.tag.includes("vegetariano") && (
                      <img
                        src={`/img/${idLocale}/legenda-vegetariano.svg`}
                        alt="Vegetariano"
                        className="floatR"
                      />
                    )}
                    {dish.tag && dish.tag.includes("biologico") && (
                      <img src={`/img/${idLocale}/legenda-biologico.svg`} alt="Biologico" className="floatR"/>
                    )}
                    {dish.tag && dish.tag.includes("piccante") && (
                      <img src={`/img/${idLocale}/legenda-piccante.svg`} alt="Piccante" className="floatR"/>
                    )}
                    {dish.tag && dish.tag.includes("senza lattosio") && (
                      <img
                        src={`/img/${idLocale}/legenda-senza-lattosio.svg`}
                        alt="Senza lattosio"
                        className="floatR"
                      />
                    )}
                    {dish.tag && dish.tag.includes("congelato") && (
                      <img src={`/img/${idLocale}/legenda-congelato.svg`} alt="Congelato" className="floatR"/>
                    )}
                    {dish.tag && dish.tag.includes("abbattuto") && (
                      <img src={`/img/${idLocale}/legenda-abbattuto.svg`} alt="Abbattuto" className="floatR"/>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="emptyPref">
                <p>
                  Aggiungi piatti dal menu cliccando sulla{" "}
                  <img src="/img/Stella-preferiti.svg" alt="Stella preferiti" />{" "}
                  come promemoria per il tuo ordine!
                </p>
              </div>
            )}
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalPreferiti;
