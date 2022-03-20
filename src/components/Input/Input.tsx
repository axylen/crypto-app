import React from 'react';
import { cx } from 'utils';
import css from './Input.module.css';

type Props = {
  value?: string;
  type?: string;
  label?: string;
  onChange?: (value: string) => void;
  className?: string;
  align?: 'left' | 'right';
  readonly?: boolean;
};

export const Input: React.FC<Props> = (props) => {
  const { value, label, onChange, className, type = 'text', align = 'left', readonly } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value);
  };

  return (
    <span className={css.Input}>
      {label && (
        <div className={cx(css.Input__label, { [css.Input__label_right]: align === 'right' })}>
          {label}
        </div>
      )}
      <input
        className={cx(className, css.Input__field, { [css.Input__field_right]: align === 'right' })}
        type={type}
        onChange={handleChange}
        value={value}
        readOnly={readonly}
      />
    </span>
  );
};
