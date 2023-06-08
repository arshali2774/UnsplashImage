import React from 'react';
import { useGlobalContext } from './context';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarktheme } = useGlobalContext();
  return (
    <section className='toggle-container'>
      <button
        className='dark-toggle'
        onClick={toggleDarktheme}
      >
        {isDarkTheme ? (
          <BsFillSunFill className='toggle-icon' />
        ) : (
          <BsFillMoonFill className='toggle-icon' />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
