import { Button, Divider, Modal, Skeleton, Tabs, } from "antd";
import { useEffect } from "preact/hooks";
import React, { FC, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import Field from "../../../../components/ui/field";
import Form from "../../../../components/ui/form";
import Select, { IOptionData } from "../../../../components/ui/select";
import TextArea from "../../../../components/ui/textArea";
import { AgeGroupEnum, ClientStatusEnum, EducationLevelEnum, GenderEnum, IClientResponse, MaritalStatusEnum, ServiceModalityEnum } from "../../../../data/interfaces/client/IClient";
import { ICity } from "../../../../data/interfaces/system/ICity";
import { IGlobalReducerState } from "../../../../store/base/interface/IGlobalReducerState";
import { ClientActions } from "../../../../store/client/Client.actions";
import { getStatesOptionsData } from "../../../../utils/dateHelper";
import { convertEnumToOptionData } from "../../../../utils/enumHelper";
import { getOptionsDataFromObject } from "../../../../utils/helpers";
import styles from './ClientForm.module.scss';
import schema from "./ClientForm.schema";
const { TabPane } = Tabs;

export interface IClientForm {
    visible: boolean;
    onClose: () => void;
    isNewClient?: boolean;
    clientId?: number;
}

const ClientForm: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [countriesOptions] = useState(getOptionsDataFromObject(props.countries, 'countryId', 'name'));
    const [countrySelected, setCountry] = useState<string>();
    const [values, setValues] = useState({} as IClientResponse);
    const [cityOptions, setCityOptions] = useState<IOptionData[]>([]);
    const [isForeignCountry, setIsForeignCountry] = useState(false);

    const register = (values: IClientResponse) => {
        console.log(values);


        // if (values) {


        //     dispatch(ClientActions.register(values));
        //     setIsSending(true);
        // }

        setIsSubmit(false);
    }

    if (!props.isLoading && isSending) {
        setIsSending(false);
        props.onClose();
    }

    const getCitiesByState = (state: string) => {
        if (state) {
            var cities = props.cities.filter(x => x.state == state);
            return getOptionsDataFromObject(cities, 'cityId', 'name');
        }

        return [];
    }

    const changeCountry = (country: string) => {
        setCountry(country);
        setIsForeignCountry(country != 'Brasil');

        setValues(
            {
                ...values,
                state: undefined,
                cityId: undefined
            }
        );
    }

    const changeState = (state: string) => {
        var cities = getCitiesByState(state);
        setCityOptions(cities);

        setValues({
            ...values,
            state: state,
            cityId: parseInt(cities[0].value.toString())
        });

    }

    const changeCity = (cityId: number) => {
        setValues({
            ...values,
            cityId: cityId
        });
    }

    var buttons =
        [
            <Button onClick={props.onClose} type='link'>Cancelar</Button>,
            <Button type='primary' htmlType='submit' onClick={() => setIsSubmit(true)} >Cadastrar</Button>,
            <Button className='btn-green' type='primary' onClick={() => setIsSubmit(true)}>Cadastrar e Agendar Sessão</Button>,
        ];

    return <>
        <Modal className={styles['container']} title={props.isNewClient ? 'Novo Cliente' : 'Atualizar Cliente'} visible={props.visible} footer={buttons} closable={false} destroyOnClose={true} width={858}>

            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div>
                        <Form onSubmit={register} schema={schema} isSubmited={isSubmit} initialValues={values}>
                            <Tabs style={{ height: '520px' }}>
                                <TabPane tab="Dados Pessoais" key="1">
                                    <div style={{ maxWidth: 850 }}>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' isRequired={true} key='name' label='Nome' name='name' style={{ width: '75%' }} className={styles['inputGroup']}></Field>
                                            <Field type={'date'} isRequired={true} autoComplete='false' key='birthDate' label='Data de Nascimento' name='birthDate' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Select name='gender' isRequired={true} label='Sexo' options={convertEnumToOptionData(GenderEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Select name='status' isRequired={true} label='Status' options={convertEnumToOptionData(ClientStatusEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='phone' label='Telefone' isRequired={true} name='phone' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Select name='ageGroup' label='Grupo' options={convertEnumToOptionData(AgeGroupEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='email' label='Email' name='email' style={{ width: '24%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='CPF' label='CPF' name='CPF' style={{ width: '24%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='RG' label='RG' name='RG' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Select name='serviceModality' label='Modalidade' options={convertEnumToOptionData(ServiceModalityEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                        </div>
                                        <Select mode='tags' name='tags' label='Tags' className={styles['selectGroup']} style={{ width: '100%' }} placeholder='Informe TAGS para o cliente' />
                                        <TextArea rows={3} autoComplete='false' key='observation' label='Obeservação' name='observation' className={styles['inputForm']}></TextArea>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados de Cobrança" key="2">
                                    <div style={{ maxWidth: 850 }}>
                                        <div className={styles['groupField']}>
                                            <Select name='insuranceFk' label='Convênio' placeholder={'Selecione...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='servicePrice' label='Valor Consulta' name='servicePrice' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='insuranceTransferValue' label='Valor Repasse Convênio' name='insuranceTransferValue' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados Complementares" key="3">
                                    <div style={{ maxWidth: 850 }}>
                                        <div className={styles['groupField']}>
                                            <Select name='maritalStatus' label='Estado Civil' options={convertEnumToOptionData(MaritalStatusEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Select name='educationLevel' label='Escolaridade' options={convertEnumToOptionData(EducationLevelEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='occupation' label='Profissão' name='occupation' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='religion' label='Religião' name='religion' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='emergencyContact' label='Contato de Emergência' name='emergencyContact' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='emergencyPhone' label='Telefone de Emergência' name='emergencyPhone' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <Divider orientation="left">Endereço</Divider>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='zip' label='CEP' name='zip' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='streetAddress' label='Logradouro' name='streetAddress' style={{ width: '66%' }} className={styles['inputGroup']}></Field>

                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='number' label='Número' name='number' style={{ width: '15%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='complement' label='Complemento' name='complement' style={{ width: '52%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='district' label='Bairro' name='district' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Select name='countryId' label='País' onSelect={(e, o) => changeCountry(o.children)} options={countriesOptions} placeholder={'Selecione...'} style={{ width: '34%' }} className={styles['selectGroup']} />
                                            <Select hidden={isForeignCountry} name='state' label='Estado' onSelect={changeState} options={getStatesOptionsData()} disabled={!countrySelected} placeholder={countrySelected ? 'Selecione...' : 'Selecione um país...'} style={{ width: '34%' }} className={styles['selectGroup']} />
                                            <Select hidden={isForeignCountry} name='cityId' label='Cidade' onSelect={changeCity} options={cityOptions} disabled={!values.state} placeholder={values.state ? 'Selecione...' : 'Selecione um estado...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                            <Field hidden={!isForeignCountry} autoComplete='false' key='foreignStateName' label='Estado/Província/Região' name='foreignStateName' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                            <Field hidden={!isForeignCountry} autoComplete='false' key='foreignCityName' label='Cidade' name='foreignCityName' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Form>
                    </div>
                </>
            }
        </Modal>
    </>;
}


const mapState = (state: IGlobalReducerState) => ({
    ...state.client,
    ...state.system
});

const connector = connect(
    mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & IClientForm;

export default connector(ClientForm);