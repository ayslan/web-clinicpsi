import { Button, Skeleton, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import PageContent from '../../components/ui/pageContent';
import { IClientResponse } from '../../data/interfaces/client/IClient';
import { history } from '../../store';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import { ClientActions } from '../../store/client/Client.actions';
import { getColumns } from './Clients.columns';
import styles from './Clients.module.scss';
import ClientForm from './modal/form'

const Clients: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [formClientVisible, setFormClientVisible] = useState(false);
    
    useEffect(() => {
        dispatch(ClientActions.list());
    }, [window.location.pathname]);

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeysAux: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeysAux);
        }
    };

    return <>
        <PageContent title='Clientes' className={styles['container']}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div className={styles['toolBar']}>
                        <Button type='primary' onClick={() => setFormClientVisible(true)}>Novo Cliente</Button>
                        <Button type='default' >Importar Clientes</Button>
                        <Button className='btn-green' type='primary'>Exportar Excel</Button>
                    </div>
                    <div className={styles['qtdeRows']}>
                        {props.clients.length} registros
                    </div>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={getColumns(props.clients)}
                        dataSource={props.clients.map((data) => ({ ...data, key: data.clientId }))}
                        style={{ overflowY: 'auto' }}
                        pagination={{ pageSize: 100, position: ['bottomRight'], showSizeChanger: false }} />
                </>
            }
        </PageContent>
        <ClientForm visible={formClientVisible} isNewClient={true} onClose={() => setFormClientVisible(false)} ></ClientForm>
    </>;
}


const mapState = (state: IGlobalReducerState) => ({
    ...state.client
});

const connector = connect(
    mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export default connector(Clients);