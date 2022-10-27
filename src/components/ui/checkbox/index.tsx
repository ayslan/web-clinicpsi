import React, { FC, CSSProperties } from 'react';
import { Checkbox as CheckboxAnt, CheckboxOptionType, Divider, Space } from 'antd';
import styles from './index.module.scss';
import { Field as FieldReact } from 'react-final-form';
const CheckboxGroup = CheckboxAnt.Group;

export interface ICheckbox {
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
  items?: IItemCheckbox[],
  bordered?: boolean
}

export interface IItemCheckbox {
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

const Checkbox: FC<ICheckbox> = ({
  label, style, styleInput, className, name, defaultValue,
  type = 'text', onFocus, onBlur, value,
  onChange, isRequired, hidden, disabled, items, bordered }) => {

  var options = items?.map((item) => ({ label: item.label ?? item.value, value: item.value, style: item.style } as CheckboxOptionType));

  return (
    <FieldReact name={name} type={type} defaultValue={defaultValue} initialValue={value}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              hidden={type === 'hidden'}
              className={styles['labelInput']}>
              <CheckboxGroup
                {...props.input}
                disabled={disabled}
                style={styleInput}
                className={`${hasError(props.meta, disabled) && !props.meta.active ? styles['invalid'] : ''} ${bordered ? styles['bordered'] : ''}`}
                onChange={onChange}
                options={options}
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

export default Checkbox;
