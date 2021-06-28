import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Skeleton, Table } from 'antd';
import React from 'react';
import { FC } from 'react';
import PageContent from '../../components/ui/pageContent';
import styles from './Clients.module.scss';

const Clients: FC = () => {

    return <>
        <PageContent title='Clientes' className={styles['container']}>
            {false ?
                <Skeleton active />
                :
                <>
                    <div className={styles['toolBar']}>
                        <Button type='primary'>Novo Cliente</Button>
                        <Button type='default' >Importar Clientes</Button>
                        <Button className='btn-green' type='primary'>Exportar Excel</Button>
                    </div>
                    <div className={styles['qtdeRows']}>
                        {0} registros
                    </div>
                    {/* <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={getColumns(props.clientesIndustrias, onEdit, onView)}
                        dataSource={props.clientesIndustrias.map((data, index) => ({ ...data, key: data.clienteIndustriaAuxId }))}
                        style={{ overflowY: 'auto' }}
                        pagination={{ pageSize: 100, position: ['bottomRight'], showSizeChanger: false }} /> */}
                </>
            }
        </PageContent>
    </>;
}

export default Clients;