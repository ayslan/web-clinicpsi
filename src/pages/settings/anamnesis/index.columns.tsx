import React from "react";
import { ColumnProps } from "antd/lib/table";
import { FaPen, } from "react-icons/fa";
import { sorter } from "../../../utils/helpers";
import styles from './index.module.scss';
import { IAnamnesis } from "../../../data/interfaces/anamnesis/IAnamnesis";
import { dateStringUStoPTBR, dateTimeStringUStoPTBR } from "../../../utils/dateHelper";

export const getColumns = (data: IAnamnesis[], onEdit?: (anamnesis: IAnamnesis) => void) => {
    return [
        {
            title: 'Grupo',
            dataIndex: 'groupName',
            sorter: (a, b) => sorter(a.groupName, b.groupName),
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false,
        },
        {
            title: 'Data de Criação',
            dataIndex: 'creationDateUtc',
            sorter: (a, b) => sorter(a.creationDateUtc, b.creationDateUtc),
            sortDirections: ['descend', 'ascend'],
            showSorterTooltip: false,
            render: (value) => dateStringUStoPTBR(value)
        },
        {
            width: 120,
            className: styles['columnAction'],
            render: (value, register) => {
                return (
                    <div>
                        <FaPen title='Editar' onClick={() => onEdit && onEdit(register)} />
                    </div>
                )
            }
        },
    ] as Array<ColumnProps<IAnamnesis>>;
}