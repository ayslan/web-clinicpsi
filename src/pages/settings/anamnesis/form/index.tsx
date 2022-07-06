import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../../components/ui/button';
import PageContent from '../../../../components/ui/pageContent';
import { AnamnesisActions } from '../../../../store/anamnesis/Anamnesis.actions';
import styles from './index.module.scss';
import Form from "../../../../components/ui/form";
import Field from '../../../../components/ui/field';
import { history } from '../../../../store';
import { Collapse, Divider, Input, Modal, Radio } from 'antd';
import { IGlobalReducerState } from '../../../../store/base/interface/IGlobalReducerState';
import { IAnamnesis, IAnamnesisField, IAnamnesisTopic } from '../../../../data/interfaces/anamnesis/IAnamnesis';
import { DownOutlined, ExclamationCircleOutlined, UpOutlined } from '@ant-design/icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import AnamnesisFieldForm from '../modals/fieldForm';
import anamnesis from '..';
const { Panel } = Collapse;

const AnamnesisForm: FC<Props> = (props) => {
    let dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [anamnesis, setAnamnesis] = useState({ topics: [{ anamnesisTopicId: 1, name: 'topic1', order: 4, fields: [] as IAnamnesisField[] }, { anamnesisTopicId: 2, name: 'topic2', order: 2, fields: [] as IAnamnesisField[] }, { anamnesisTopicId: 3, name: 'topic3', order: 3, fields: [] as IAnamnesisField[] }] as IAnamnesisTopic[] } as IAnamnesis);
    const [newTopicAuxId, setNewTopicAuxId] = useState(-1);
    const [isVisibleAnamnesisFieldModal, setIsVisibleAnamnesisFieldModal] = useState(false);
    const [topicId, setTopicId] = useState(0);

    const [DVFormGrupoPerguntas, setDVFormGrupoPerguntas] = useState<any>();

    const handleAddTopic = () => {
        let name = DVFormGrupoPerguntas.name;
        let anamnesisAux = { ...anamnesis };
        let order = anamnesis.topics.sort((a, b) => a.order - b.order)[anamnesis.topics.length - 1].order + 1;
        anamnesisAux.topics = [...anamnesisAux.topics, { name: name, order: order, anamnesisTopicId: newTopicAuxId, fields: [] as IAnamnesisField[] } as IAnamnesisTopic];
        setAnamnesis(anamnesisAux);
        setNewTopicAuxId(newTopicAuxId - 1);
        setDVFormGrupoPerguntas({ name: '' });
    }

    const showModalRemoveTopic = (topicId: number, event: any) => {

        let topic = anamnesis.topics.filter(t => t.anamnesisTopicId == topicId)[0];

        Modal.confirm({
            title: 'Remover Grupo de Perguntas',
            icon: <ExclamationCircleOutlined />,
            content: <label>Deseja remover o grupo de perguntas: <b>{topic.name}</b></label>,
            okText: 'Confirmar',
            cancelText: 'Cancelar',
            onOk: () => handleRemoveTopic(topicId)
        });

        event.stopPropagation();
    }

    const handleRemoveTopic = (topicId: number) => {
        let anamnesisAux = { ...anamnesis };
        anamnesisAux.topics = anamnesisAux.topics.filter(t => t.anamnesisTopicId !== topicId);

        setAnamnesis(anamnesisAux);
    }

    const showFieldForm = (topicId: number, event: any) => {
        setTopicId(topicId);
        setIsVisibleAnamnesisFieldModal(true);
        event.stopPropagation();
    }

    const handleAddFieldForm = (values: IAnamnesisField) => {
        let anamnesisAux = { ...anamnesis };
        anamnesisAux.topics.filter(t => t.anamnesisTopicId === values.anamnesisTopicFk)[0].fields.push(values);

        setAnamnesis(anamnesisAux);
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
            <FaTrash color='#e95151' style={{ position: 'relative', top: 2 }} onClick={event => { showModalRemoveTopic(topicId, event); }} />
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
            </Form>
            <div className={styles['formActions']}>
                <Form initialValues={DVFormGrupoPerguntas}>
                    <Input.Group compact>
                        <Field maxLength={45} label="Grupos de Perguntas" placeholder="Nome do Grupo de Perguntas" onInput={(e: any) => setDVFormGrupoPerguntas({ name: e })} name="name" style={{ width: '500px' }} />
                        <Button type='primary' onClick={() => handleAddTopic()}>Adicionar Grupo de Perguntas</Button>
                    </Input.Group>
                </Form>
            </div>
            <div className={styles['topics']}>
                {anamnesis?.topics?.length > 0
                    ?
                    <Collapse defaultActiveKey={['0']}>
                        {
                            anamnesis?.topics.sort((a, b) => a.order - b.order).map((topic, index) => (
                                <Panel header={topic.name} key={index} extra={optionsTopic(topic.anamnesisTopicId)}>
                                    {
                                        topic.fields.sort((a, b) => a.order - b.order).map((field, index) => (
                                            <div>
                                                {field.title}
                                            </div>
                                        ))}
                                </Panel>
                            ))
                        }
                    </Collapse>
                    :
                    <div className={styles['empty']}>
                        Nenhum <b>Grupo de Perguntas</b> foi adicionado!
                        <p>Para iniciar digite o nome e clique para adicionar o Grupo de Perguntas.</p>
                    </div>
                }
            </div>
        </PageContent>
        <AnamnesisFieldForm visible={isVisibleAnamnesisFieldModal} topicId={topicId} onSubmit={handleAddFieldForm} onClose={() => setIsVisibleAnamnesisFieldModal(false)} />
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