import { Button, Divider, Modal, Skeleton, Tabs, } from "antd";
import moment from "moment";
import React, { FC, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import DatePicker from "../../../../components/ui/datePicker";
import Field from "../../../../components/ui/field";
import FieldNumber from "../../../../components/ui/fieldNumber";
import Form from "../../../../components/ui/form";
import Select, { IOptionData } from "../../../../components/ui/select";
import TextAreaForm from "../../../../components/ui/textArea";
import { AgeGroupEnum, ChargeTypeEnum, ClientStatusEnum, EducationLevelEnum, GenderEnum, IClientResponse, MaritalStatusEnum, ServiceModalityEnum } from "../../../../data/interfaces/client/IClient";
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
    client: IClientResponse;
}

const ClientForm: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [countriesOptions] = useState(getOptionsDataFromObject(props.countries, 'countryId', 'name'));
    const [countrySelected, setCountry] = useState<string | undefined>('Brasil');
    const [cityOptions, setCityOptions] = useState<IOptionData[]>([]);
    const [isForeignCountry, setIsForeignCountry] = useState(false);
    const [isNewRegister] = useState<boolean>((props.client?.clientId ?? 0) == 0);
    const [values, setValues] = useState(isNewRegister ? { countryId: 32, status: ClientStatusEnum.Ativo } as IClientResponse : props.client);

    const register = (values: IClientResponse) => {
        if (values) {
            values.clientId > 0 ? dispatch(ClientActions.update(values)) : dispatch(ClientActions.register(values));
            setIsSending(true);
        }

        setIsSubmit(false);
    }

    const onClose = () => {
        setValues({ countryId: 32 } as IClientResponse);
        setCountry('Brasil');
        setIsForeignCountry(false);

        props.onClose();
    }

    const getCitiesByState = (state: string) => {
        if (state) {
            var cities = props.cities.filter(x => x.state == state);
            return getOptionsDataFromObject(cities, 'cityId', 'name');
        }

        return [];
    }

    const changeCountry = (country?: string) => {

        if (country) {
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
        else {
            setCountry(undefined);
            setIsForeignCountry(false);

            setValues(
                {
                    ...values,
                    countryId: undefined,
                    state: undefined,
                    cityId: undefined
                }
            );
        }
    }

    const changeState = (state?: string) => {
        if (state) {
            var cities = getCitiesByState(state);
            setCityOptions(cities);

            setValues({
                ...values,
                state: state,
                cityId: parseInt(cities[0].value.toString())
            });
        }
        else {
            setValues({
                ...values,
                state: undefined,
                cityId: undefined
            });
        }

    }

    const changeCity = (cityId?: number) => {
        setValues({
            ...values,
            cityId: cityId
        });
    }

    const changeChargeType = (chargeType?: ChargeTypeEnum) => {
        setValues({ ...values, chargeType: chargeType, servicePrice: undefined })
    }

    if (!props.isLoading && isSending) {
        setIsSending(false);
        onClose();
    }

    var buttons =
        [
            <Button onClick={onClose} type='link'>Cancelar</Button>,
            <Button type='primary' htmlType='submit' onClick={() => setIsSubmit(true)} >{isNewRegister ? 'Cadastrar' : 'Atualizar'}</Button>,
            <Button hidden={!isNewRegister} className='btn-green' type='primary' onClick={() => setIsSubmit(true)}>Cadastrar e Agendar Sessão</Button>,
        ];

    return <>
        <Modal className={styles['container']} title={isNewRegister ? 'Novo Cliente' : 'Atualizar Cliente'} visible={props.visible} footer={buttons} closable={false} destroyOnClose={true} width={858}>
            {props.isLoading ?
                <Skeleton active />
                :
                <>
                    <div>
                        <Form onSubmit={register} schema={schema} isSubmited={isSubmit} initialValues={values}>
                            <Tabs style={{ height: '390px' }}>
                                <TabPane tab="Dados Pessoais" key="1">
                                    <div style={{ maxWidth: 850 }}>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' isRequired={true} key='name' label='Nome' name='name' style={{ width: '50%' }} className={styles['inputGroup']}></Field>
                                            <Select name='ageGroup' label='Grupo' isRequired={true} options={convertEnumToOptionData(AgeGroupEnum)} placeholder={'Selecione...'} style={{ width: '26%' }} className={styles['selectGroup']} />
                                            <Select name='status' isRequired={true} label='Status' options={convertEnumToOptionData(ClientStatusEnum)} placeholder={'Selecione...'} style={{ width: '22%' }} className={styles['selectGroup']} />
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Select name='gender' isRequired={true} label='Sexo' options={convertEnumToOptionData(GenderEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='phone' label='Telefone' name='phone' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='email' label='Email' name='email' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <DatePicker defaultValue={values.birthDate && moment(values.birthDate)} onChange={(e) => setValues({ ...values, birthDate: e })} key='birthDate' label='Data de Nascimento' name='birthDate' style={{ width: '22%' }} className={styles['inputGroup']} />
                                        </div>
                                        <div style={{ maxWidth: 850 }}>
                                            <div className={styles['groupField']}>
                                                <Select name='chargeType' label='Tipo de Cobrança' onSelect={changeChargeType} options={convertEnumToOptionData(ChargeTypeEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                                <FieldNumber precision={2} hidden={values?.chargeType && values?.chargeType == ChargeTypeEnum.Gratuito} disabled={!values?.chargeType} autoComplete='false' key='servicePrice' label={values?.chargeType != ChargeTypeEnum.Pacote ? 'Valor da Consulta' : 'Valor Padrão da Consulta'} placeholder={values?.chargeType == ChargeTypeEnum.Gratuito ? '0,00' : 'Valor da Consulta'} name='servicePrice' style={{ width: '25%' }} className={styles['inputGroup']} />
                                                <FieldNumber precision={0} hidden={values?.chargeType != ChargeTypeEnum.Pacote} autoComplete='false' key='qtyPackageServices' label='Qtde. de Sessões do Pacote' name='qtyPackageServices' style={{ width: '25%' }} className={styles['inputGroup']} />
                                                <FieldNumber precision={2} hidden={values?.chargeType != ChargeTypeEnum.Pacote} autoComplete='false' key='servicePackagePrice' label='Valor do Pacote' name='servicePackagePrice' style={{ width: '22%' }} className={styles['inputGroup']} />
                                                <FieldNumber hidden={values?.chargeType != ChargeTypeEnum.Gratuito} disabled={true} autoComplete='false' key='servicePriceFree' label={'Valor da Consulta'} placeholder={'0,00'} name='servicePriceFree' style={{ width: '22%' }} className={styles['inputGroup']} />
                                            </div>
                                        </div>
                                        <TextAreaForm rows={3} autoComplete='false' key='observation' label='Obeservação' name='observation' className={styles['inputForm']}></TextAreaForm>
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados Complementares" key="3">
                                    <div style={{ maxWidth: 850 }}>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='CPF' label='CPF' name='CPF' style={{ width: '24%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='RG' label='RG' name='RG' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Select name='serviceModality' label='Modalidade' options={convertEnumToOptionData(ServiceModalityEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Select name='maritalStatus' label='Estado Civil' options={convertEnumToOptionData(MaritalStatusEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Select name='educationLevel' label='Escolaridade' options={convertEnumToOptionData(EducationLevelEnum)} placeholder={'Selecione...'} style={{ width: '25%' }} className={styles['selectGroup']} />
                                            <Field autoComplete='false' key='occupation' label='Profissão' name='occupation' style={{ width: '25%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='religion' label='Religião' name='religion' style={{ width: '24%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <div className={styles['groupField']}>
                                            <Field autoComplete='false' key='emergencyContact' label='Contato de Emergência' name='emergencyContact' style={{ width: '66%' }} className={styles['inputGroup']}></Field>
                                            <Field autoComplete='false' key='emergencyPhone' label='Telefone de Emergência' name='emergencyPhone' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        </div>
                                        <Select mode='tags' name='tags' label='Tags' className={styles['selectGroup']} style={{ width: '100%' }} placeholder='Informe TAGS para o cliente' />
                                    </div>
                                </TabPane>
                                <TabPane tab="Dados de Endereço" key="4">
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
                                        <Select name='countryId' label='País' onSelect={(e, o) => changeCountry(o.children)} onClear={() => changeCountry()} options={countriesOptions} placeholder={'Selecione...'} style={{ width: '34%' }} className={styles['selectGroup']} />
                                        <Select hidden={isForeignCountry} onClear={() => changeState()} name='state' label='Estado' onSelect={changeState} options={getStatesOptionsData()} disabled={!countrySelected} placeholder={countrySelected ? 'Selecione...' : 'Selecione um país...'} style={{ width: '34%' }} className={styles['selectGroup']} />
                                        <Select hidden={isForeignCountry} name='cityId' label='Cidade' onClear={() => changeCity()} onSelect={changeCity} options={cityOptions} disabled={!values.state} placeholder={values.state ? 'Selecione...' : 'Selecione um estado...'} style={{ width: '33%' }} className={styles['selectGroup']} />
                                        <Field hidden={!isForeignCountry} autoComplete='false' key='foreignStateName' label='Estado/Província/Região' name='foreignStateName' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
                                        <Field hidden={!isForeignCountry} autoComplete='false' key='foreignCityName' label='Cidade' name='foreignCityName' style={{ width: '33%' }} className={styles['inputGroup']}></Field>
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