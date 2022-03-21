import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import { cx } from 'utils';

export const Header = () => {
  return (
    <header className={css.Header}>
      <div className={css.Header__wrap}>
        <NavLink
          className={({ isActive }) =>
            cx(css.Header__link, { [css.Header__link_active]: isActive })
          }
          to="/"
        >
          Prices
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cx(css.Header__link, { [css.Header__link_active]: isActive })
          }
          to="/calculate"
        >
          Calculate
        </NavLink>
      </div>
    </header>
  );
};
