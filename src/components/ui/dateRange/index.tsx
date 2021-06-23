import { DatePicker, Select } from 'antd';
import moment from 'moment';
import React, { FC, CSSProperties, useState } from 'react';
import styles from './DateRange.module.scss';

const { Option } = Select;

export interface IDateRange {
    defaultValue: any,
    onChange?: (e: any) => void
}

const DateRange: FC<IDateRange> = (props) => {

    const [value, setValue] = useState(props.defaultValue);
    const [isDisabled, setIsDisabled] = useState(false);

    const onChangeAtalho = (e: string) => {
        var newStartDate: any;
        var newEndDate: any;
        var isCustom = false;

        switch (e) {
            case "Hoje":
                newStartDate = newEndDate = moment();
                break;
            case "Semana Atual":
                var curr = new Date;
                var first = curr.getDate() - curr.getDay();
                var last = first + 6;

                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            case "Semana Passada":
                var curr = new Date;
                var last = curr.getDate() - (curr.getDay() + 1);
                var first = last - 6;

                var firstday = new Date(curr.setDate(first));
                var lastday = new Date(curr.setDate(last));

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            case "Mês Atual":
                var curr = new Date;
                var year = curr.getFullYear();
                var month = curr.getMonth();
                var lastDay = new Date(year, month + 1, 0).getDate();

                var firstday = new Date(curr.setDate(1));
                var lastday = new Date(curr.setDate(lastDay));

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            case "Mês Passado":
                var curr = new Date;
                var year = curr.getFullYear();
                var month = curr.getMonth() - 1;
                var lastDay = new Date(year, month + 1, 0).getDate();

                var firstday = new Date(new Date(curr.setDate(1)).setMonth(month));
                var lastday = new Date(new Date(curr.setDate(lastDay)).setMonth(month));

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            case "Ano Atual":
                var curr = new Date;
                var firstday = new Date(new Date(curr.setDate(1)).setMonth(0));
                var lastday = new Date(new Date(curr.setDate(31)).setMonth(11));

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            case "Ano Passado":
                var curr = new Date;
                var year = curr.getFullYear() - 1;
                var lastday = new Date('12 31 ' + year);
                var firstday = new Date('01 01 ' + year);

                newStartDate = moment(firstday);
                newEndDate = moment(lastday);
                break;
            default:
                isCustom = true;
        }

        if (!isCustom) {
            var newValue = [newStartDate, newEndDate];
            setValue(newValue);
            props.onChange && props.onChange(newValue);
        }

        setIsDisabled(!isCustom);
    }

    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <Select style={{ width: '100%' }} defaultValue='Informar Datas' onChange={onChangeAtalho}>
                    <Option value='Hoje'>Hoje</Option>
                    <Option value='Semana Atual'>Semana Atual</Option>
                    <Option value='Semana Passada'>Semana Passada</Option>
                    <Option value='Mês Atual'>Mês Atual</Option>
                    <Option value='Mês Passado'>Mês Passado</Option>
                    <Option value='Ano Atual'>Ano Atual</Option>
                    <Option value='Ano Passado'>Ano Passado</Option>
                    <Option value='Informar Datas'>Informar Datas</Option>
                </Select>
            </div>
            <DatePicker.RangePicker
                style={{ marginBottom: 8, width: '100%' }}
                onChange={e => {
                    setValue(e);
                    props.onChange && props.onChange(e);
                }}
                disabled={isDisabled}
                format={'DD/MM/yyyy'}
                defaultValue={props.defaultValue}
                value={value}
                placeholder={['Data Inicial', 'Data Final']}
            />
        </div >
    );
}

export default DateRange;