import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../../components/ui/button';
import PageContent from '../../../../components/ui/pageContent';
import { AnamnesisActions } from '../../../../store/anamnesis/Anamnesis.actions';
import styles from './index.module.scss';
import Form from "../../../../components/ui/form";
import Field from '../../../../components/ui/field';
import { history } from '../../../../store';
import { Collapse, Divider } from 'antd';
import { IGlobalReducerState } from '../../../../store/base/interface/IGlobalReducerState';
import { IAnamnesis, IAnamnesisTopic } from '../../../../data/interfaces/anamnesis/IAnamnesis';
import AnamnesisTopicForm from '../modals/topicForm';
const { Panel } = Collapse;

const AnamnesisForm: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [anamnesis, setAnamnesis] = useState({ topics: [] as IAnamnesisTopic[] } as IAnamnesis);
    const [isVisibleAnamnesisTopicModal, setIsVisibleAnamnesisTopicModal] = useState(false);

    const onAddTopic = (name: string) => {
        let anamnesisAux = { ...anamnesis };
        anamnesisAux.topics = [...anamnesisAux.topics, { name: name } as IAnamnesisTopic];
        setAnamnesis(anamnesisAux);
    }

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
                    <Button type='primary' onClick={() => setIsVisibleAnamnesisTopicModal(true)} >Adicionar Grupo de Perguntas</Button>
                    <Button type='primary' >Adicionar Pergunta</Button>
                    <Button type='default' >Ordenar Grupos</Button>
                </div>
                <div className={styles['topics']}>
                    <Collapse defaultActiveKey={['0']} onChange={(e) => console.log(e)}>
                        {
                            anamnesis?.topics.map((topic, index) => (
                                <Panel header={topic.name} key={index}>
                                    [CAMPOS]
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            </Form>
        </PageContent>

        <AnamnesisTopicForm visible={isVisibleAnamnesisTopicModal} onSubmit={onAddTopic} onClose={() => setIsVisibleAnamnesisTopicModal(false)} />
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