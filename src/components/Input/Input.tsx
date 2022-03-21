import React from 'react';
import { cx } from 'utils';
import css from './Input.module.css';

type Props = {
  value?: string;
  type?: string;
  label?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  className?: string;
  align?: 'left' | 'right' | 'center';
  readonly?: boolean;
};

export const Input: React.FC<Props> = (props) => {
  const {
    value,
    label,
    onChange,
    className,
    name,
    type = 'text',
    align = 'left',
    readonly,
  } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value, evt.target.name);
  };

  return (
    <span className={css.Input}>
      {label && (
        <div
          className={cx(css.Input__label, {
            [css.Input__label_right]: align === 'right',
            [css.Input__field_center]: align === 'center',
          })}
        >
          {label}
        </div>
      )}
      <input
        className={cx(className, css.Input__field, {
          [css.Input__field_right]: align === 'right',
          [css.Input__field_center]: align === 'center',
        })}
        name={name}
        type={type}
        onChange={handleChange}
        value={value}
        readOnly={readonly}
      />
    </span>
  );
};
