import React, { FC, CSSProperties } from 'react';

import styles from './DatePicker.module.scss';
import { Field as FieldReact } from 'react-final-form';
import { ConfigProvider, DatePicker as DatePickerAnt } from 'antd';
import moment from 'moment';
import ptBR from 'antd/lib/locale-provider/pt_BR';

export interface IDatePicker {
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
  onChange?: (e: any) => void;
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  isRequired?: boolean;
  hidden?: boolean,
  format?: string
}

const hasError = (meta: any, disabled?: boolean) => (
  !disabled && meta.invalid && meta.touched
);

const DatePicker: FC<IDatePicker> = ({
  label, style, styleInput, className, name, defaultValue, placeholder = label,
  onFocus, onBlur, disabled, value, onChange, isRequired, hidden, format
}) => {

  format = format || 'DD/MM/YYYY';

  return (
    <FieldReact name={name} defaultValue={defaultValue} initialValue={value}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              className={styles['labelInput']}>
              <ConfigProvider locale={ptBR}>
                <DatePickerAnt
                  disabled={disabled}
                  placeholder={placeholder}
                  style={styleInput}
                  className={`${hasError(props.meta, disabled) && !props.meta.active ? styles['invalid'] : ''}`}
                  onChange={onChange}
                  format={format}
                  defaultValue={defaultValue}
                  value={value}
                />
              </ConfigProvider>
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

export default DatePicker;
