import React from 'react';

import css from './Page.module.css';

export const Page: React.FC = (props) => {
  return <div className={css.Page}>{props.children}</div>;
};
