import React from "react";
import { ColumnProps } from "antd/lib/table";
import { FaFileAlt, FaPen, } from "react-icons/fa";
import { getDistinctFilterValues, getFilterSearchProps, sorter } from "../../utils/helpers";

import styles from './Clients.module.scss';
import { IClientResponse } from "../../data/interfaces/clients/IClientsResponse";

export const getColumns = (data: IClientResponse[], onEdit?: (clienteIndustria: IClientResponse) => void, onView?: (clienteIndustria: IClientResponse) => void) => {
    return [
        {
            title: 'Nome',
            dataIndex: 'name',
            sorter: (a, b) => sorter(a.name, b.name),
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false,
            ...getFilterSearchProps('name', 'Cliente'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => sorter(a.email, b.email),
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false,
            filters: getDistinctFilterValues(data, 'email'),
            onFilter: (value: string, record) => { return record.email.indexOf(value) === 0 },
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            sorter: (a, b) => sorter(a.phone, b.phone),
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false,
            filters: getDistinctFilterValues(data, 'phone'),
            onFilter: (value: string, record) => { return record.phone.indexOf(value) === 0 },
        },
        {
            width: 120,
            className: styles['columnAction'],
            render: (value, register) => {
                return (
                    <div>
                        <FaFileAlt title='Visualizar' onClick={() => onView && onView(register)} />
                        <FaPen title='Editar' onClick={() => onEdit && onEdit(register)} />
                    </div>
                )
            }
        },
    ] as Array<ColumnProps<IClientResponse>>;
}