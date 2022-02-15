import React from "react";
import { Button, DatePicker, Select } from "antd";
import { ColumnFilterItem } from "antd/lib/table/interface"
import { FaCalendar, FaSearch } from "react-icons/fa";
import SearchFilterTable from "../components/ui/searchFilterTable";
import { datetimeToString } from "./dateHelper";
import { IOptionData } from "../components/ui/select";
import DateRange from "../components/ui/dateRange";

export const URL_BASE_SV = "https://app4.suasvendas.com";
export const URL_PEDIDO_SV = URL_BASE_SV + "/Modulo/YourSales/PedidoFormV2.aspx?Op=UldScGRHRnk=&Id=";

export const getDistinctFilterValues = (object: any, prop: string) => {
    var filters: ColumnFilterItem[] = [];
    object.map((item: any) => {
        if (!filters.filter(x => x.value == item[prop]).length) {
            filters.push({
                text: item[prop],
                value: item[prop]
            } as ColumnFilterItem);
        }
    });

    return filters.sort((a, b) => {
        return a.value?.toString().localeCompare(b.value?.toString());
    });
}

export const getFilterSearchProps = (dataIndex: any, placeholder?: string) => ({
    filterDropdown: (props: any) => {
        return <SearchFilterTable propsFilter={props} dataIndex={dataIndex} placeholder={placeholder}></SearchFilterTable>
    },
    filterIcon: (filtered: any) => <FaSearch />,
    onFilter: (value: string, record: any) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : ''
});

export const getOptionsDataFromObject = (data: any, propValue: string, propText: string) => {
    var optionsData: IOptionData[] = [];

    if (data) {
        data.map((item: any) => {
            optionsData.push({
                value: item[propValue],
                text: item[propText]
            } as IOptionData);
        });
    }

    return optionsData;
}

export const getFilterDateProps = (dataIndex: any, defaultValue: any) => {

    return ({
        defaultFilteredValue: [defaultValue],
        filterDropdown: (props: any) => {
            return <div style={{ padding: 10, width: 260 }}>
                <DateRange
                    defaultValue={defaultValue}
                    onChange={e => props.setSelectedKeys(e ? [e] : [])}
                />
                <div style={{ float: 'left', textAlign: 'left' }}>
                    <Button
                        type='link'
                        role="reset"
                        style={{ width: 60 }}
                        size="small"
                        disabled={props.selectedKeys?.length == 0}
                        onClick={() => props.clearFilters()}
                    >
                        {'Limpar'}
                    </Button>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        role="search"
                        size="small"
                        style={{ width: 90 }}
                        onClick={() => props.confirm()}
                    >
                        {'Filtrar'}
                    </Button>
                </div>
            </div>
        },
        filterIcon: (filtered: any) => <FaCalendar style={{ color: filtered ? '#1890ff' : undefined, position: 'relative', top: 'calc(50% - 6px)', left: 8 }} />,
        onFilter: (value: any, record: any) => {
            var startDate = value[0]._d;
            var endDate = value[1]._d;

            var startDateTimestamp = Date.parse(datetimeToString(startDate, 'yyyy-MM-dd') + 'T00:00:00');
            var endDateTimestamp = Date.parse(datetimeToString(endDate, 'yyyy-MM-dd') + 'T23:59:59');
            var valueDateTimestamp = Date.parse(record[dataIndex]);

            return record[dataIndex]
                ? valueDateTimestamp >= startDateTimestamp && valueDateTimestamp <= endDateTimestamp
                : ''
        }
    })
};

export const sorter = (a: any, b: any) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);

export const isEmpty = (object: any) => {
    return Object.keys(object).length === 0;
}

export const getParameterByName = (name: string, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const sliceIntoChunks = (arr: any, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export const removeDuplicateArray = (arr: any) => {
    arr = arr.filter(function (value: any, index: number, array: any) {
        return array.indexOf(value) == index;
    });

    return arr;
}

export const copyToClp = (txt: any) => {
    var m = document;
    txt = m.createTextNode(txt);
    var w = window;
    var b: any = m.body;
    b.appendChild(txt);
    if (b.createTextRange) {
        var d = b.createTextRange();
        d.moveToElementText(txt);
        d.select();
        m.execCommand('copy');
    }
    else {
        var d: any = m.createRange();
        var g = w.getSelection;
        d.selectNodeContents(txt);
        g()?.removeAllRanges();
        g()?.addRange(d);
        m.execCommand('copy');
        g()?.removeAllRanges();
    }
    txt.remove();
}