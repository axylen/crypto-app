import React from 'react';
import { cx } from 'utils';
import css from './Input.module.css';

type Props = {
  value: string;
  type?: string;
  label?: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Input: React.FC<Props> = (props) => {
  const { value, label, onChange, className, type = 'text' } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value);
  };

  return (
    <span className={css.Input}>
      {label && <div className={css.Input__label}>{label}</div>}
      <input className={cx(className, css.Input__field)} type={type} onChange={handleChange} value={value} />
    </span>
  );
};
