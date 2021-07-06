import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Skeleton, Tabs, } from "antd";
import React, { FC } from "react";
import { IBreadCrumb } from "../../../components/interfaces/IBreadCrumb";
import Field from "../../../components/ui/field";
import Form from "../../../components/ui/form";
import PageContent from "../../../components/ui/pageContent";
import Select, { IOptionData } from "../../../components/ui/select";
import { history } from "../../../store";
import styles from './ClientForm.module.scss';
const { TabPane } = Tabs;

const optionsEstadoCivil = [
    {
        text: 'Solteiro',
        value: 'Solteiro'
    },
    {
        text: 'Casado',
        value: 'Casado'
    }
] as IOptionData[];

const ClientForm: FC = () => {

    const breadCrumb = [{ name: 'Clientes', location: '/clients' }, { name: 'Novo Cliente' }] as IBreadCrumb[];

    return <>
        <PageContent title='Novo Cliente' className={styles['container']} breadCrumb={breadCrumb}>
            {false ?
                <Skeleton active />
                :
                <>
                    <div>
                        <Form onSubmit={() => null}>
                            <Tabs style={{ height: '100vh' }}>
                                <TabPane tab="Dados Pessoais" key="1">
                                    <br></br>
                                    <div style={{ maxWidth: 700 }}>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='name' label='Nome' name='name' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='code' label='Código' name='code' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='cpf' label='CPF' name='cpf' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='rg' label='RG' name='rg' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Select name='civil' label='Estado Civil' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field type={'date'} autoComplete='false' key='data' label='Data de Nascimento' name='data' style={{ width: '32.5%' }} className={styles['inputGroup']}></Field>
                                            <Select name='sexo' label='Sexo' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                        </div>

                                        <Divider orientation="left">Contatos</Divider>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='email' label='Email' name='email' style={{ width: '67%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='fone1' label='Telefone Principal' name='fone1' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='fone2' label='Telefone Secundário' name='fone2' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados Complementares" key="2">
                                    <div style={{ maxWidth: 700 }}>
                                        <Divider orientation="left">Endereço</Divider>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='fone1' label='Telefone Principal' name='fone1' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='fone2' label='Telefone Secundário' name='fone2' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados de Cobrança" key="3">
                                    <br></br>
                                    <div style={{ maxWidth: 700 }}>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Form>
                    </div>
                </>
            }
        </PageContent>
    </>;
}

export default ClientForm;