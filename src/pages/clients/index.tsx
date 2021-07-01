import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Skeleton, Table } from 'antd';
import React, { useState } from 'react';
import { FC } from 'react';
import PageContent from '../../components/ui/pageContent';
import { IClientResponse } from '../../data/interfaces/clients/IClientsResponse';
import { history } from '../../store';
import { getColumns } from './Clients.columns';
import styles from './Clients.module.scss';

const clients = [
    {
        id: 'a',
        name: 'Cliente 1',
        email: 'cliente1@email.com',
        phone: '62 985349136'
    },
    {
        id: 'ab',
        name: 'Cliente 2',
        email: 'cliente2@email.com',
        phone: '62 888884444'
    }
] as IClientResponse[];

const Clients: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeysAux: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeysAux);
        }
    };

    return <>
        <PageContent title='Clientes' className={styles['container']}>
            {false ?
                <Skeleton active />
                :
                <>
                    <div className={styles['toolBar']}>
                        <Button type='primary' onClick={() => history.push('/clients/form')}>Novo Cliente</Button>
                        <Button type='default' >Importar Clientes</Button>
                        <Button className='btn-green' type='primary'>Exportar Excel</Button>
                    </div>
                    <div className={styles['qtdeRows']}>
                        {0} registros
                    </div>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={getColumns(clients)}
                        dataSource={clients.map((data, index) => ({ ...data, key: data.id }))}
                        style={{ overflowY: 'auto' }}
                        pagination={{ pageSize: 100, position: ['bottomRight'], showSizeChanger: false }} />
                </>
            }
        </PageContent>
    </>;
}

export default Clients;