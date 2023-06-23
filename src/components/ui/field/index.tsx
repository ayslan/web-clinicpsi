import React, { FC, CSSProperties } from 'react';

import styles from './Field.module.scss';
import { Field as FieldReact } from 'react-final-form';
import { Input } from 'antd';

export interface IField {
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
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  autoComplete?: 'true' | 'false';
  isRequired?: boolean;
  hidden?: boolean;
  maxLength?: number;
  ref?: any;
}

const hasError = (meta: any, disabled?: boolean) => (
  !disabled && meta.invalid && meta.touched
);

const Field: FC<IField> = ({
  label, style, styleInput, className, name, defaultValue,
  type = 'text', placeholder = label, autoComplete,
  onFocus, onBlur, onInput, disabled, value, readonly,
  onChange, isRequired, hidden, maxLength, ref
}) => {

  return (
    <FieldReact name={name} type={type} defaultValue={defaultValue} initialValue={value} ref={ref}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              hidden={type === 'hidden'}
              className={styles['labelInput']}>
              <Input
                {...props.input}
                disabled={disabled}
                placeholder={placeholder}
                readOnly={readonly}
                style={styleInput}
                maxLength={maxLength}
                className={`${hasError(props.meta, disabled) && !props.meta.active ? styles['invalid'] : ''}`}
                onInput={(e: any) => onInput && onInput(e.target.value)}
                onChangeCapture={(e: any) => onChange && onChange(e.target.value)}
                autoComplete={autoComplete ? autoComplete : 'true'}
              />
              {props.meta.active ? onFocus && onFocus() : onBlur && onBlur()}
            </label>
            <div className={styles['errorInput']}>
              {hasError(props.meta, disabled) ? props.meta.error : ''}
            </div>
          </div>)
      }
    </FieldReact>
  );
};

export default Field;
