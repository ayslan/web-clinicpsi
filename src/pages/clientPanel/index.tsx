import { CalendarOutlined, CheckCircleTwoTone, ClockCircleOutlined, FormOutlined, MessageTwoTone, WhatsAppOutlined } from '@ant-design/icons';
import { Card, Dropdown, Menu, Skeleton, Tabs, Tag, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { IBreadCrumb } from '../../components/interfaces/IBreadCrumb';
import Button from '../../components/ui/button';
import PageContent from '../../components/ui/pageContent';
import { IGlobalReducerState } from '../../store/base/interface/IGlobalReducerState';
import styles from './index.module.scss';
const { TabPane } = Tabs;

const breadCrumb = [
    {
        name: 'Clientes',
        location: '/clients'
    },
    {
        name: 'Painel do Cliente'
    }
] as IBreadCrumb[];

const actions = (
    <Menu>
        <Menu.Item key='1'>Inativar</Menu.Item>
        <Menu.Item key='2'>Excluir</Menu.Item>
        <Menu.Item key='3'>Gerar PDF</Menu.Item>
    </Menu>
);

const ClientPanel: FC<Props> = (props) => {
    var dispatch = useDispatch();

    return <>
        <PageContent title='Painel do Cliente' breadCrumb={breadCrumb} className={styles['container']}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div className={styles['client-data']}>
                        <div className={styles['data-1']}>
                            <h1>José da Silva Xavier</h1>
                            <label style={{ marginBottom: 6 }}>
                                <WhatsAppOutlined /> (62) 98534-9136
                            </label>
                            <label style={{ marginLeft: -2 }}>
                                <Tag color="green"><CheckCircleTwoTone twoToneColor='#52c41a' /> Ativo</Tag>
                            </label>
                        </div>
                        <div className={styles['data-2']}>
                            <span className={styles['description']}>Próxima Sessão</span>
                            <label><ClockCircleOutlined /> 11:00</label>
                            <label><CalendarOutlined /> Terça, 31/03/2022</label>
                            <Button size='small' type='link'>Alterar Sessão</Button>
                        </div>
                        <div className={styles['data-2']}>
                            <span className={styles['description']}>Valor Sessão</span>
                            <label>R$ 120,00</label>
                        </div>
                        <div className={styles['buttons']}>
                            <Button type='primary' icon={<CalendarOutlined />}>Agendar Sessões</Button>
                            <Button type='default' style={{ marginLeft: 15 }}>Editar Cadastro</Button>
                            <Dropdown.Button overlay={actions}></Dropdown.Button>
                        </div>
                    </div>
                    <div className={styles['client-control']}>
                        <Tabs type="card">
                            <TabPane tab='Visão Geral' key='1' className={styles['overview']}>
                                <div>
                                    <Card size="small" style={{ width: '50%' }} type='inner' title="Última Sessão">

                                    </Card>
                                </div>
                            </TabPane>
                            <TabPane tab='Dados' key='2'>
                            </TabPane>
                            <TabPane tab='Anamnese' key='3'>
                            </TabPane>
                            <TabPane tab='Sessões' key='4'>
                            </TabPane>
                            <TabPane tab='Financeiro' key='5'>
                            </TabPane>
                            <TabPane tab='Documentos' key='6'>
                            </TabPane>
                            <TabPane tab='Configurações' key='7'>
                            </TabPane>
                        </Tabs>
                    </div>
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