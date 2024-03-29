import { Button, Skeleton, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import PageContent from '../../components/ui/pageContent';
import { IClientResponse } from '../../data/interfaces/client/IClient';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import { ClientActions } from '../../store/client/Client.actions';
import { getColumns } from './index.columns';
import styles from './index.module.scss'
import ClientForm from './modal/form'

const Clients: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [formClientVisible, setFormClientVisible] = useState(false);
    const [clientForm, setClientForm] = useState({} as IClientResponse);

    useEffect(() => {
        dispatch(ClientActions.list());
    }, [window.location.pathname]);

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeysAux: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeysAux);
        }
    };

    const onEdit = (client: IClientResponse) => {
        setClientForm(client);
        setFormClientVisible(true);
    }

    const onCreate = () => {
        setClientForm({} as IClientResponse);
        setFormClientVisible(true);
    }

    return <>
        <PageContent title='Clientes' className={styles['container']}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div className={styles['toolBar']}>
                        <Button type='primary' onClick={onCreate}>Novo Cliente</Button>
                    </div>
                    <div className={styles['qtdeRows']}>
                        {props.clients.length} registros
                    </div>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={getColumns(props.clients, onEdit)}
                        dataSource={props.clients.map((data) => ({ ...data, key: data.clientId }))}
                        style={{ overflowY: 'auto' }}
                        pagination={{ pageSize: 100, position: ['bottomRight'], showSizeChanger: false }} />
                </>
            }
        </PageContent>
        {formClientVisible ?
            <ClientForm visible={formClientVisible} client={clientForm} onClose={() => setFormClientVisible(false)} ></ClientForm>
            : null}
    </>;
}


const mapState = (state: IGlobalReducerState) => ({
    ...state.client,
});

const connector = connect(
    mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export default connector(Clients);