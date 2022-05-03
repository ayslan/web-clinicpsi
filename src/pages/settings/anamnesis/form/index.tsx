import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../../components/ui/button';
import PageContent from '../../../../components/ui/pageContent';
import { AnamnesisActions } from '../../../../store/anamnesis/Anamnesis.actions';
import styles from './index.module.scss';
import Form from "../../../../components/ui/form";
import Field from '../../../../components/ui/field';
import { history } from '../../../../store';
import { Collapse, Divider, Radio } from 'antd';
import { IGlobalReducerState } from '../../../../store/base/interface/IGlobalReducerState';
import { IAnamnesis, IAnamnesisField, IAnamnesisTopic } from '../../../../data/interfaces/anamnesis/IAnamnesis';
import AnamnesisTopicForm from '../modals/topicForm';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import AnamnesisFieldForm from '../modals/fieldForm';
const { Panel } = Collapse;

const AnamnesisForm: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [anamnesis, setAnamnesis] = useState({ topics: [] as IAnamnesisTopic[] } as IAnamnesis);
    const [isVisibleAnamnesisTopicModal, setIsVisibleAnamnesisTopicModal] = useState(false);
    const [newTopicAuxId, setNewTopicAuxId] = useState(-1);

    const [isVisibleAnamnesisFieldModal, setIsVisibleAnamnesisFieldModal] = useState(false);
    const [topicId, setTopicId] = useState(0);

    const onAddTopic = (name: string) => {
        let anamnesisAux = { ...anamnesis };
        anamnesisAux.topics = [...anamnesisAux.topics, { name: name, anamnesisTopicId: newTopicAuxId } as IAnamnesisTopic];
        setAnamnesis(anamnesisAux);
        setNewTopicAuxId(newTopicAuxId - 1);
    }

    const showFieldForm = (topicId: number, event: any) => {

        setTopicId(topicId);
        setIsVisibleAnamnesisFieldModal(true);
        event.stopPropagation();
    }

    const onAddFieldForm = (values: IAnamnesisField) => {
        console.log(values);
    }

    const submit = () => {

    }

    const optionsTopic = (topicId: number) =>
        <div>
            <Button type='primary' size='small' style={{ marginRight: 15 }} onClick={event => { showFieldForm(topicId, event); }}>Adicionar Pergunta</Button>
            <Radio.Group size='small' style={{ marginRight: 15 }}>
                <Radio.Button value="large"><DownOutlined /></Radio.Button>
                <Radio.Button value="default"><UpOutlined /></Radio.Button>
            </Radio.Group>
            <FaPen color='gray' style={{ marginRight: 15, position: 'relative', top: 2 }} />
            <FaTrash color='#e95151' style={{ position: 'relative', top: 2 }} onClick={event => { showFieldForm(topicId, event); }} />
        </div>

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
                </div>
                <div className={styles['topics']}>
                    <Collapse defaultActiveKey={['0']} onChange={(e) => console.log(e)}>
                        {
                            anamnesis?.topics.map((topic, index) => (
                                <Panel header={topic.name} key={index} extra={optionsTopic(topic.anamnesisTopicId)}>
                                    [CAMPOS]
                                </Panel>
                            ))
                        }
                    </Collapse>
                </div>
            </Form>
        </PageContent>

        <AnamnesisTopicForm visible={isVisibleAnamnesisTopicModal} onSubmit={onAddTopic} onClose={() => setIsVisibleAnamnesisTopicModal(false)} />
        <AnamnesisFieldForm visible={isVisibleAnamnesisFieldModal} topicId={topicId} onSubmit={onAddFieldForm} onClose={() => setIsVisibleAnamnesisFieldModal(false)} />
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