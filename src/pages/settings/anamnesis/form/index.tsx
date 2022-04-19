import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../../components/ui/button';
import PageContent from '../../../../components/ui/pageContent';
import { AnamnesisActions } from '../../../../store/anamnesis/Anamnesis.actions';
import styles from './index.module.scss';
import Form from "../../../../components/ui/form";
import Field from '../../../../components/ui/field';
import { history } from '../../../../store';
import { Divider } from 'antd';
import { IGlobalReducerState } from '../../../../store/base/interface/IGlobalReducerState';

const AnamnesisForm: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        dispatch(AnamnesisActions.list());
    }, []);

    const submit = () => {

    }

    return <>
        <PageContent title='Nova Anamnese' className={styles['container']}>
            <div className={styles['toolBar']}>
                <Button type='primary' >Salvar</Button>
                <Button type='link' onClick={() => history.goBack()}>Cancelar</Button>
            </div>
            <Form onSubmit={submit} isSubmited={isSubmit}>
                <Divider></Divider>
                <div className={styles['formHeader']}>
                    <Field autoComplete='false' isRequired={true} key='name' label='Nome da Anamnese' name='name' style={{ width: 500 }} ></Field>
                </div>
                <div className={styles['formActions']}>
                    <Button type='primary' >Adicionar Grupo de Perguntas</Button>
                    <Button type='primary' >Adicionar Pergunta</Button>
                    <Button type='default' >Ordenar Grupos</Button>
                </div>
                <div>F
                    {
                        props.anamnesisForm?.topics.map((topic) => (
                            topic.name
                        ))
                    }
                </div>
            </Form>
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


export default AnamnesisForm;