import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Inizializza i preferiti dai cookie
    const savedFavorites = JSON.parse(Cookies.get("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const saveFavoritesToCookie = (favorites) => {
    Cookies.set("favorites", JSON.stringify(favorites), { expires: 30 }); // Salva i preferiti nei cookie
  };

  const addFavorite = (dish) => {
    const updatedFavorites = [...favorites, dish];
    setFavorites(updatedFavorites);
    saveFavoritesToCookie(updatedFavorites);
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    saveFavoritesToCookie(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        count: favorites.length, // Esponi direttamente il conteggio
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
