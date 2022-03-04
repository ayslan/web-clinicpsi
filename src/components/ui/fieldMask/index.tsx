import React, { FC, CSSProperties } from 'react';
import styles from './FieldMask.module.scss';
import { Field as FieldReact } from 'react-final-form';
import { MaskedInput } from 'antd-mask-input';

export interface IFieldMask {
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
  isRequired?: boolean;
  hidden?: boolean,
  mask: string
}

const hasError = (meta: any, disabled?: boolean) => (
  !disabled && meta.invalid && meta.touched
);

const FieldMask: FC<IFieldMask> = ({
  label, style, styleInput, className, name, defaultValue,
  type = 'text', placeholder = label, autoComplete,
  onFocus, onBlur, onInput, disabled, value, readonly,
  onChange, isRequired, hidden, mask
}) => {

  return (
    <FieldReact name={name} type={type} defaultValue={defaultValue} initialValue={value}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              hidden={type === 'hidden'}
              className={styles['labelInput']}>
              <MaskedInput
                {...props.input}
                disabled={disabled}
                placeholder={placeholder}
                readOnly={readonly}
                style={styleInput}
                mask={mask}
                className={`${hasError(props.meta, disabled) && !props.meta.active ? styles['invalid'] : ''}`}
                onInput={(e: any) => onInput && onInput(e.target.value)}
                onChangeCapture={onChange}
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

export default FieldMask;
