import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
  return storedDarkMode || prefersDarkMode;
};
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  console.log(isDarkTheme, 'isDarkTheme');
  const [searchTerm, setSearchTerm] = useState('anime');
  const toggleDarktheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    console.log(newDarkTheme, 'new dark theme');
    localStorage.setItem('darkTheme', newDarkTheme);
    // document.body.classList.toggle('dark-theme', newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarktheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
