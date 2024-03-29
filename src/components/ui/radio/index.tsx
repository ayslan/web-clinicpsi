import React, { FC, CSSProperties } from 'react';

import styles from './index.module.scss';
import { Field as FieldReact } from 'react-final-form';
import { Radio as RadioAnt, Space } from 'antd';

export interface IRadio {
  label?: string;
  name: string;
  placeholder?: string;
  style?: CSSProperties;
  styleInput?: CSSProperties;
  className?: string;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: any) => void;
  value?: any;
  defaultValue?: string;
  isRequired?: boolean;
  hidden?: boolean,
  disabled?: boolean,
  items?: IItemRadio[],
  bordered?: boolean,
  direction?: 'horizontal' | 'vertical'
}

export interface IItemRadio {
  value: string | number;
  label?: string;
  removed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  info?: any;
}

const hasError = (meta: any, disabled?: boolean) => (
  !disabled && meta.invalid && meta.touched
);

const Radio: FC<IRadio> = ({
  label, style, styleInput, className, name, defaultValue,
  type = 'text', onFocus, onBlur, value,
  onChange, isRequired, hidden, disabled, items, bordered, direction = 'vertical' }) => {

  return (
    <FieldReact name={name} type={type} defaultValue={defaultValue} initialValue={value}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              hidden={type === 'hidden'}
              className={styles['labelInput']}>
              <RadioAnt.Group
                {...props.input}
                disabled={disabled}
                style={styleInput}
                className={`${hasError(props.meta, disabled) && !props.meta.active ? styles['invalid'] : ''} ${bordered ? styles['bordered'] : ''}`}
                onChange={onChange}
              >
                <Space direction={direction}>
                  {
                    items?.map(item => (
                      <RadioAnt value={item.value} style={item.style} className={item.className}>{item.label ?? item.value}</RadioAnt>
                    ))
                  }
                </Space>
              </RadioAnt.Group>
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

export default Radio;
