import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocale } from "../../context/LocaleContext";
import { useFavorites } from "../../context/FavoritesContext";
import NavBar from "../../components/NavBar";
import BottomBar from "../../components/BottomBar";
import ModalFiltri from "../../components/ModalFiltri";
import Image from 'next/image';
import Script from 'next/script';

const GlobalStyle = createGlobalStyle`
  :root {
    --lightColor: #ffffff;
    --darkColor: #2F2F2F;
  }

  .courseRow {
    background-color: ${(props) => props.colorMain2};
    width: 100%;
  }

  .desktopIndexPad {
    background-color: ${(props) => props.colorMain2};
  }

  .bg-menu-header {
    background-image: url(/img/${(props) => props.idLocale}/${(props) =>
  props.background});
  }

  #modalTimer .modal-footer button {
    background-color: ${(props) => props.colorMain1};
    border-color: ${(props) => props.colorMain1};
  }

  div.scrollmenu button:focus, .nav-link, .navbar-nav .nav-link.active, .navbar-nav .show>.nav-link, div.scrollmenu button {
    color: var(--darkColor) !important;
  }

  .bg-head {
    background-color: ${(props) => props.colorMain2};
  }

  ${(props) =>
    props.idLocale === 2 &&
    `
    @font-face {
      font-family: 'Century Gothic Bold';
      src: url('/font/CenturyGothicPaneuropeanBold.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Light';
      src: url('/font/CenturyGothicPaneuropeanLight.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Semibold';
      src: url('/font/CenturyGothicPaneuropeanSemiBold.ttf');
    }
    @font-face {
      font-family: 'Century Gothic Paneuropean';
      src: url('/font/CenturyGothicPaneuropean-Light.woff2') format('woff2'),
           url('/font/CenturyGothicPaneuropean-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    .stickyNavScroll {
      background-image: url(/img/${props.idLocale}/bg-ardesia-mobile-3.jpg);
    }
    body {
      background-image: url(/img/${props.idLocale}/bg-ardesia-mobile-3.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      min-height: 100vh;
    }
    #modalTimer .modal-footer button, .boxAlert p b {
      font-family: 'Century Gothic Bold';
    }
    div.scrollmenu button, .container.whiteBoxCourse b {
      font-family: 'Century Gothic Semibold', sans-serif;
    }
    .courseBox p {
      font-family: 'Century Gothic Paneuropean', sans-serif;
    }
    body, .boxAlert p, .boxAlert {
      font-family: 'Century Gothic Light';
    }
    div.scrollmenu button:focus, .nav-link, .navbar-nav .nav-link.active, .navbar-nav .show>.nav-link, div.scrollmenu button {
      color: var(--lightColor) !important;
    }
    @media (max-width: 496px) and (max-height: 1000px) {
      .logoNav {
        width: 15vw;
      }
    }
  `}
`;

const MenuPage = () => {
  const [localeInfo, setLocaleInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dishes, setDishes] = useState([]);
  const [isClient, setIsClient] = useState(false); // Controllo lato client
  const { idLocale } = useLocale();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Caricamento lato client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchDishes = async (categoryId) => {
    try {
      const filterParams = {
        f1: activeFilters.includes("vegano") ? "1" : "",
        f2: activeFilters.includes("vegetariano") ? "1" : "",
        f3: activeFilters.includes("senza glutine") ? "1" : "",
        f4: activeFilters.includes("piccante") ? "1" : "",
      };
  
      const queryString = new URLSearchParams({
        idCategoria: categoryId,
        idLocale: idLocale,
        ...filterParams, // Aggiungi i filtri
      }).toString();
  
      const response = await axios.get(`/api/getDishesByCategory?${queryString}`);
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };
  

  useEffect(() => {
    if (!isClient) return;

    if (!Cookies.get("sessLang")) {
      Cookies.set("sessLang", "it", { expires: 30 });
    }

    const menuId = Cookies.get("menuId") || "";
    if (!Cookies.get("menuId")) {
      Cookies.set("menuId", menuId, { expires: 1 });
    }

    const fetchLocaleInfo = async () => {
      try {
        const response = await axios.get(
          `/api/getLocaleInfo?idLocale=${idLocale}`
        );
        setLocaleInfo(response.data);
      } catch (error) {
        console.error("Error fetching locale info:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `/api/getCategories?idLocale=${idLocale}&idMenu=${menuId}`
        );
        console.log("Categories data received:", response.data); // Debugging line to log the categories data
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
          fetchDishes(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchLocaleInfo();
    fetchCategories();
  }, [idLocale, isClient]);

  useEffect(() => {
    if (selectedCategory) {
      fetchDishes(selectedCategory); // Aggiorna i piatti ogni volta che i filtri cambiano
    }
  }, [selectedCategory, activeFilters]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchDishes(categoryId);
  };

  const handleFavoriteToggle = (dish) => {
    if (favorites.some((fav) => fav.id === dish.id)) {
      removeFavorite(dish.id);
    } else {
      addFavorite(dish);
    }
  };

  useEffect(() => {
    // Aggiorna il conteggio ogni volta che i filtri cambiano
    const count = activeFilters.length;
    setActiveFiltersCount(count);
    console.log("Filtri attivi:", count);

    // Aggiorna dinamicamente il div con id="filtrBoll"
    const filterBoll = document.getElementById("filtrBoll");
    if (filterBoll) {
      filterBoll.textContent = count > 0 ? count : "";
    }
  }, [activeFilters]);

  const handleFilterChange = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  if (!isClient) {
    return null; // Evita errori di hydration
  }

  return (
    <div className="App desktopIndexPad">
      <GlobalStyle
        colorMain1={localeInfo.colorMain1}
        colorMain2={localeInfo.colorMain2}
        idLocale={idLocale}
        background={localeInfo.background}
      />
      <NavBar localeInfo={localeInfo} />
      <ModalFiltri onFilterChange={handleFilterChange} />
      <input type="hidden" id="filt1" value={Cookies.get("f1") || ""} />
      <input type="hidden" id="filt2" value={Cookies.get("f2") || ""} />
      <input type="hidden" id="filt3" value={Cookies.get("f3") || ""} />
      <input type="hidden" id="filt4" value={Cookies.get("f4") || ""} />
      <input type="hidden" id="filtrCat" value={selectedCategory || ""} />
      <div className="stickyNavScroll">
        <div className="scrollmenu" id="categorieMenu">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.nome}
            </button>
          ))}
        </div>
      </div>
      <div className="container mainWhiteBoxCourse" id="elencoPiatti">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div key={dish.id} className="container whiteBoxCourse">
              <div className="d-flex">
                <div className="box d-flex justify-content-between w-100">
                  <p className="d-inline">
                    <b>{dish.nome}</b>
                  </p>
                  <Image
                    className="starPr floatR d-inline"
                    src={
                      favorites.some((fav) => fav.id === dish.id)
                        ? "/img/Stella-attiva-preferiti.svg"
                        : "/img/Stella-preferiti.svg"
                    }
                    onClick={() => handleFavoriteToggle(dish)}
                    alt={
                      favorites.some((fav) => fav.id === dish.id)
                        ? "Rimuovi dai preferiti"
                        : "Aggiungi ai preferiti"
                    }
                    width={1}
                    height={1}
                  />
                </div>
              </div>
              <p
                className="desc"
                dangerouslySetInnerHTML={{ __html: dish.ingredienti }}
              />
              <p className="price floatL d-inline">
                [{" "}
                <span className="priceSmall" style={{ fontSize: "14px" }}>
                  {dish.p1}
                </span>{" "}
                ]
              </p>
              {/* Icons for allergens, vini, tags, etc */}
              {dish.allergeni && (
                <div>
                  <Image
                    data-bs-toggle="modal"
                    data-bs-target={`#infoModal${dish.id}`}
                    className="floatR infoAll"
                    src={`/img/infoAll.svg`}
                    alt="Allergeni"
                    width={1}
                    height={1}
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
              <div
                data-bs-toggle="modal"
                data-bs-target="#legendaModal"
                className="floatR"
              >
                {dish.tag && dish.tag.includes("senza glutine") && (
                  <Image
                    src={`/img/${idLocale}/legenda-senza-glutine.svg`}
                    alt="senza glutine"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("vegano") && (
                  <Image
                    src={`/img/${idLocale}/legenda-vegano.svg`}
                    alt="vegano"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("vegetariano") && (
                  <Image
                    src={`/img/${idLocale}/legenda-vegetariano.svg`}
                    alt="vegetariano"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("biologico") && (
                  <Image
                    src={`/img/${idLocale}/legenda-biologico.svg`}
                    alt="biologico"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("piccante") && (
                  <Image
                    src={`/img/${idLocale}/legenda-piccante.svg`}
                    alt="piccante"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("senza lattosio") && (
                  <Image
                    src={`/img/${idLocale}/legenda-senza-lattosio.svg`}
                    alt="senza lattosio"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("congelato") && (
                  <Image
                    src={`/img/${idLocale}/legenda-congelato.svg`}
                    alt="congelato"
                    width={1}
                    height={1}
                  />
                )}
                {dish.tag && dish.tag.includes("abbattuto") && (
                  <Image
                    src={`/img/${idLocale}/legenda-abbattuto.svg`}
                    alt="abbattuto"
                    width={1}
                    height={1}
                  />
                )}
              </div>
              {/* Additional Modals for Vini and Cocktail */}
              {dish.viniAbbinati && (
                <div>
                  {/* Vini Modal */}
                  <div
                    data-bs-toggle="modal"
                    data-bs-target={`#viniModal${dish.id}`}
                    className="floatR"
                  >
                    <Image
                      src={`/img/${idLocale}/icon-vini.svg`}
                      alt="Vini abbinati"
                      width={1}
                      height={1}
                    />
                  </div>
                  <div
                    className="modal fade modalInfo"
                    id={`viniModal${dish.id}`}
                    tabIndex="-1"
                    aria-labelledby="viniModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog-centered modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 text-center">
                            Vini Abbinati
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
                                <p>{dish.viniAbbinati}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {dish.cocktailAbbinati && (
                <div>
                  {/* Cocktail Modal */}
                  <div
                    data-bs-toggle="modal"
                    data-bs-target={`#cocktailModal${dish.id}`}
                    className="floatR"
                  >
                    <Image
                      src={`/img/${idLocale}/icon-cocktail.svg`}
                      alt="Cocktail abbinati"
                      width={1}
                      height={1}
                    />
                  </div>
                  <div
                    className="modal fade modalInfo"
                    id={`cocktailModal${dish.id}`}
                    tabIndex="-1"
                    aria-labelledby="cocktailModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog-centered modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 text-center">
                            Cocktail Abbinati
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
                                <p>{dish.cocktailAbbinati}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <br />
            </div>
          ))
        ) : (
          <p>Non ci sono piatti disponibili per questa categoria.</p>
        )}
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomBar activeFiltersCount={activeFiltersCount} />
      <Script src="/js/bootstrap.bundle.js" strategy="lazyOnload" />
      <Script src="/js/jquery-3.6.1.min.js" strategy="lazyOnload" />
    </div>
  );
};

export default MenuPage;

/* Test */