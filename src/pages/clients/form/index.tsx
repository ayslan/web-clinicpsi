import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Skeleton, Tabs, } from "antd";
import React, { FC } from "react";
import { IBreadCrumb } from "../../../components/interfaces/IBreadCrumb";
import Field from "../../../components/ui/field";
import Form from "../../../components/ui/form";
import PageContent from "../../../components/ui/pageContent";
import Select, { IOptionData } from "../../../components/ui/select";
import TextArea from "../../../components/ui/textArea";
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
                            <Tabs style={{ height: '540px' }}>
                                <TabPane tab="Dados Pessoais" key="1">
                                    <div style={{ maxWidth: 700 }}>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='name' label='Nome*' name='name' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                            <Select name='group' label='Grupo*' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field type={'date'} autoComplete='false' key='data' label='Data de Nascimento*' name='data' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Select name='sexo' label='Sexo*' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Select name='civil' label='Estado Civil' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='cpf' label='CPF' name='cpf' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='rg' label='RG' name='rg' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Select mode='tags' name='tags' label='Tags' className={styles['selectGroup']} style={{ width: '66%' }} placeholder='Informe TAGS para o cliente' options={optionsEstadoCivil} />
                                        </div>
                                        <TextArea rows={2} autoComplete='false' key='observacao' label='Obeservação' name='observacao' className={styles['inputForm']}></TextArea>

                                        <Divider orientation="left">Contatos</Divider>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='fone1' label='Telefone Principal*' name='fone1' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='fone2' label='Telefone Secundário' name='fone2' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='email' label='Email' name='email' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados de Cobrança" key="2">
                                    <div style={{ maxWidth: 700 }}>
                                        <div className={styles['groupField']}>
                                            <Select name='group' label='Convênio' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='name' label='Valor Consulta' name='name' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='name' label='Valor Repasse Convênio' name='name' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados Complementares" key="3">
                                    <div style={{ maxWidth: 700 }}>
                                        <div style={{ maxWidth: 700 }}>
                                            <div className={styles['groupField']}>
                                                <Select name='educationLevel' label='Escolaridade' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                                <Field autoComplete='false' key='occupation' label='Profissão' name='occupation' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                                <Field autoComplete='false' key='religion' label='Religião' name='religion' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            </div>
                                            <div className={styles['groupField']}>
                                                <Field autoComplete='false' key='fone2' label='Contato de Emergência' name='fone2' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                                <Field autoComplete='false' key='fone1' label='Telefone de Emergência' name='fone1' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            </div>
                                        </div>
                                        <Divider orientation="left">Endereço</Divider>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='cep' label='CEP' name='cep' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='streetAddress' label='Logradouro' name='streetAddress' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='number' label='Número' name='number' style={{ width: '15%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='complement' label='Complemento' name='complement' style={{ width: '52%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='district' label='Bairro' name='district' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Select name='state' label='Estado' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                            <Select name='city' label='Cidade' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                            <Select name='country' label='País' options={optionsEstadoCivil} placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                            <div>
                                <Button type='primary' onClick={() => history.push('/clients')}>Salvar</Button>
                                <Button className='btn-green' type='primary'>Salvar e Continuar Editando</Button>
                                <Button type='link' >Cancelar</Button>
                            </div>
                        </Form>
                    </div>
                </>
            }
        </PageContent>
    </>;
}

export default ClientForm;