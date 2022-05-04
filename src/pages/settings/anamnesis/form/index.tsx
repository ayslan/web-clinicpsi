import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import Button from '../../../../components/ui/button';
import PageContent from '../../../../components/ui/pageContent';
import { AnamnesisActions } from '../../../../store/anamnesis/Anamnesis.actions';
import styles from './index.module.scss';
import Form from "../../../../components/ui/form";
import Field from '../../../../components/ui/field';
import { history } from '../../../../store';
import { Collapse, Divider, Input, Radio } from 'antd';
import { IGlobalReducerState } from '../../../../store/base/interface/IGlobalReducerState';
import { IAnamnesis, IAnamnesisField, IAnamnesisTopic } from '../../../../data/interfaces/anamnesis/IAnamnesis';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import AnamnesisFieldForm from '../modals/fieldForm';
const { Panel } = Collapse;

const AnamnesisForm: FC<Props> = (props) => {
    var dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const [anamnesis, setAnamnesis] = useState({ topics: [{ name: 'topic1', order: 4 }, { name: 'topic2', order: 2 }, { name: 'topic3', order: 3 }] as IAnamnesisTopic[] } as IAnamnesis);
    const [newTopicAuxId, setNewTopicAuxId] = useState(-1);
    const [isVisibleAnamnesisFieldModal, setIsVisibleAnamnesisFieldModal] = useState(false);
    const [topicId, setTopicId] = useState(0);

    const [DVFormGrupoPerguntas, setDVFormGrupoPerguntas] = useState<any>();

    const onAddTopic = () => {
        let name = DVFormGrupoPerguntas.name;
        let anamnesisAux = { ...anamnesis };
        let order = anamnesis.topics.sort((a, b) => a.order - b.order)[anamnesis.topics.length - 1].order + 1;
        anamnesisAux.topics = [...anamnesisAux.topics, { name: name, order: order, anamnesisTopicId: newTopicAuxId } as IAnamnesisTopic];
        setAnamnesis(anamnesisAux);
        setNewTopicAuxId(newTopicAuxId - 1);
        setDVFormGrupoPerguntas({ name: '' });
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
            </Form>
            <div className={styles['formActions']}>
                <Form initialValues={DVFormGrupoPerguntas}>
                    <Input.Group compact>
                        <Field maxLength={45} label="Grupos de Perguntas" placeholder="Nome do Grupo de Perguntas" onInput={(e: any) => setDVFormGrupoPerguntas({ name: e })} name="name" style={{ width: '500px' }} />
                        <Button type='primary' onClick={() => onAddTopic()}>Adicionar Grupo de Perguntas</Button>
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
                                    [CAMPOS]
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