import { Skeleton, Table } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../components/ui/button';
import PageContent from '../../../components/ui/pageContent';
import { IAnamnesis } from '../../../data/interfaces/anamnesis/IAnamnesis';
import { history } from '../../../store';
import { AnamnesisActions } from '../../../store/anamnesis/Anamnesis.actions';
import { IGlobalReducerState } from '../../../store/base/interface/IGlobalReducerState';
import { getColumns } from './index.columns';
import styles from './index.module.scss';

const Anamnesis: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeysAux: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeysAux);
        }
    };

    useEffect(() => {
        dispatch(AnamnesisActions.list());
    }, []);

    const openForm = (anamnesis: IAnamnesis) => {
        dispatch(AnamnesisActions.setAnamnesisForm(anamnesis));
        history.push(`/settings/anamnesis/form`)
    }

    return <>
        <PageContent title='Anamnese' className={styles['container']}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div className={styles['toolBar']}>
                        <Button type='primary' onClick={() => openForm({} as IAnamnesis)}>Nova Anamnese</Button>
                    </div>
                    <div className={styles['qtdeRows']}>
                        {props.anamnesis?.length} registros
                    </div>
                    <Table
                        rowSelection={{ type: 'checkbox', ...rowSelection }}
                        columns={getColumns(props.anamnesis ?? [] as IAnamnesis[], openForm)}
                        dataSource={props.anamnesis?.map((data) => ({ ...data, key: data.anamnesisId }))}
                        style={{ overflowY: 'auto' }}
                        pagination={{ pageSize: 100, position: ['bottomRight'], showSizeChanger: false }} />
                </>
            }
        </PageContent>
    </>
}

const mapState = (state: IGlobalReducerState) => ({
    ...state.anamnesis,
});

const connector = connect(
    mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

export default connector(Anamnesis);