import React, { FC, CSSProperties, useState } from 'react';
import styles from './Select.module.scss';
import { Field as FieldReact } from 'react-final-form';
import { Divider, Input, Select as SelectAnt } from 'antd';
const { Option } = SelectAnt;

export interface ISelect {
  label?: string;
  name: string;
  style?: CSSProperties;
  styleSelect?: CSSProperties;
  className?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  autoComplete?: 'true' | 'false';
  mode?: 'multiple' | 'tags';
  options?: IOptionData[],
  placeholder?: string,
  showAddItem?: boolean,
  isRequired?: boolean,
  hidden?: boolean,

  onFocus?: () => void;
  onBlur?: () => void;
  onSelect?: (e: any, option?: any) => void;
  onAddItem?: (e: any) => void;
}

export interface IOptionData {
  value: string | number;
  text?: string;
  removed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  info?: any;
}

const hasError = (meta: any, disabled?: boolean) => (
  !disabled && meta.invalid && meta.touched
);

const Select: FC<ISelect> = ({
  label, style, styleSelect, className, name, defaultValue, autoComplete,
  onFocus, onBlur, disabled, value, options, onSelect, placeholder, onAddItem,
  showAddItem, mode, isRequired, hidden
}) => {

  const [newItem, setNewItem] = useState<string>('');

  return (
    <FieldReact name={name} defaultValue={defaultValue} initialValue={value}>
      {
        (props) => (
          <div className={`${styles['contentInput']} ${className ?? ''}`} style={style} hidden={hidden}>
            <label className={styles['description']}>{label}{isRequired ? <span style={{ color: 'red' }}>*</span> : null}</label>
            <label
              className={styles['labelInput']}
              style={styleSelect}>
              <SelectAnt
                {...props.input}
                value={props.input.value?.length === 0 ? undefined : props.input.value}
                showSearch
                disabled={disabled}
                placeholder={placeholder}
                mode={mode}
                notFoundContent={<div style={{ color: "GrayText", textAlign: 'center' }}>Nenhum valor encontrado</div>}
                filterOption={(input, option) => {
                  return (
                    option?.props?.children?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                    || option?.props?.value?.toString().toLowerCase().indexOf(input?.toLowerCase()) >= 0
                  )
                }}
                className={styles['select']}
                onSelect={(e, o) => onSelect && onSelect(e, o)}
                dropdownRender={!showAddItem ? undefined : menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '1px 8px 0px 8px' }}>
                      <Input style={{ flex: 'auto', height: 30 }} value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                      <a
                        style={{ flex: 'none', padding: '3px', display: 'block', cursor: 'pointer' }}
                        onClick={() => { onAddItem && onAddItem(newItem); setNewItem(''); }}
                      >
                        Adicionar
                      </a>
                    </div>
                  </div>
                )}
              >
                {
                  options?.map(option => (
                    <Option value={option.value} style={option.style} className={option.className}>{option.text ?? option.value}</Option>
                  ))
                }

              </SelectAnt>
            </label>
            <div className={styles['errorInput']}>
              {hasError(props.meta, disabled) ? props.meta.error : ''}
            </div>
          </div>)
      }
    </FieldReact>
  );
};

export default Select;
