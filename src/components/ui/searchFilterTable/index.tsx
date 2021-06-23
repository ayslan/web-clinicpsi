import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";

export interface ISearchFilterTable {
    propsFilter: any;
    dataIndex: string;
    placeholder?: string;
}

const SearchFilterTable: FC<ISearchFilterTable> = ({ propsFilter, dataIndex, placeholder }) => {
    return (<div style={{ padding: 8 }}>
        <Input
            placeholder={`Buscar ${placeholder ?? dataIndex}`}
            value={propsFilter.selectedKeys[0]}
            onChange={e => propsFilter.setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => propsFilter.confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
            <Button type='link' onClick={() => propsFilter.clearFilters()} size="small" style={{ width: 90 }} disabled={propsFilter.selectedKeys?.length == 0}
            >
                Limpar
      </Button>
            <Button
                type="primary"
                onClick={() => propsFilter.confirm()}
                size="small"
                style={{ width: 90 }}
            >
                &nbsp;Filtrar
      </Button>

        </Space>
    </div>);
}

export default SearchFilterTable;