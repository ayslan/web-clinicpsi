import React, { FC, CSSProperties } from 'react';
import styles from './Input.module.scss';

export interface IInput {
  label?: string;
  name: string;
  placeholder?: string;
  style?: CSSProperties;
  styleInput?: CSSProperties;
  className?: string;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  readonly?: boolean;
  onInput?: (value: string) => void;
  onChange?: () => void;
  value?: string;
  defaultValue?: string;
  autoComplete?: 'true' | 'false';
}

const Input: FC<IInput> = ({
  label, style, styleInput, className, name, defaultValue,
  type = 'text', placeholder = label, autoComplete,
  onInput, disabled, value, readonly, onChange,
}) => {

  return (
    <div className={`${styles['contentInput']} ${className ?? ''}`} style={style}>
      <label className={styles['description']}>{label}</label>
      <label
        hidden={type === 'hidden'}
        className={styles['labelInput']}>
        <input
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readonly}
          style={styleInput}
          value={value}
          defaultValue={defaultValue}
          type={type}
          onInput={(e: any) => onInput && onInput(e.target.value)}
          onChangeCapture={onChange}
          autoComplete={autoComplete ? autoComplete : 'true'}
        />
      </label>
    </div>
  );
};

export default Input;
