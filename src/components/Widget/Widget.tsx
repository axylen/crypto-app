import React from 'react';
import { cx } from 'utils';
import css from './Widget.module.css';

type Props = {
  className?: string;
};

export const Widget: React.FC<Props> = (props) => {
  const { className } = props;

  return <div className={cx(className, css.Widget)}>{props.children}</div>;
};
