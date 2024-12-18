import React, { createContext, useContext, useState } from 'react';

const LocaleContext = createContext();

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }) => {
  const [idLocale, setIdLocale] = useState(2); // Inizializza con un valore predefinito o dinamico

  return (
    <LocaleContext.Provider value={{ idLocale, setIdLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
