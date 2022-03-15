import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IBreadCrumb } from '../../components/interfaces/IBreadCrumb';
import PageContent from '../../components/ui/pageContent';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import styles from './index.module.scss';

const breadCrumb = [
    {
        name: 'Clientes',
        location: '/clients'
    },
    {
        name: 'Painel do Cliente'
    }
] as IBreadCrumb[];

const ClientPanel: FC<Props> = (props) => {
    var dispatch = useDispatch();

    return <>
        <PageContent title='Painel do Cliente' breadCrumb={breadCrumb} className={styles['container']}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>

                </>
            }
        </PageContent>
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

export default connector(ClientPanel);