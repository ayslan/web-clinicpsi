import React, { FC, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Space } from "antd";

import styles from './index.module.scss';
import Form from "../../../../../components/ui/form";
import FieldForm from "../../../../../components/ui/field";
import schema from "./index.schema";
import { IAnamnesisField } from "../../../../../data/interfaces/anamnesis/IAnamnesis";
import { AnamnesisFieldTypeEnum } from "../../../../../data/enums/AnamnesisEnum";
import { useEffect } from "preact/hooks";
import Radio, { IItemRadio } from "../../../../../components/ui/radio";

export interface IAnamnesisFieldFormModal {
    topicId: number,
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: IAnamnesisField) => void;
    defaultValues?: IAnamnesisField
}

const AnamnesisFieldForm: FC<Props> = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [defaultValues, setDefaultValues] = useState(props.defaultValues ?? { anamnesisTopicFk: props.topicId, anamnesisFieldType: 1 } as IAnamnesisField);

    const submit = (values: IAnamnesisField) => {
        if (values) {

            //props.onSubmit(value);
            //props.onClose();
        }
        setIsSubmit(false);
    }

    const buttons =
        [
            <Button key="back" onClick={props.onClose}>Cancelar</Button>,
            <Button key="submit" type="primary" htmlType='submit' onClick={() => setIsSubmit(true)}>Adicionar Tópico</Button>,
        ];

    const itemsTypeField = [
        { value: 1, text: 'Campo de Texto' },
        { value: 2, text: 'Campo de Texto Grande' },
        { value: 3, text: 'Campo de Seleção Sim/Não' },
        { value: 4, text: 'Campo de Seleção Única' },
        { value: 5, text: 'Campo de Seleção Múltipla' },
    ] as IItemRadio[];

    return (
        <Form onSubmit={submit} schema={schema} isSubmited={isSubmit} initialValues={defaultValues}>
            <Modal title='Novo Tópico' visible={props.visible} footer={buttons} onCancel={props.onClose} destroyOnClose={true}>
                <div className={styles['container']}>
                    <FieldForm autoComplete='false' key='nome' label='Texto da Pergunta' name='title' className={styles['inputForm']}></FieldForm>
                    <Radio name='anamnesisFieldType' label='Tipo de Campo' onChange={(e) => setDefaultValues({ ...defaultValues, anamnesisFieldType: parseInt(e.target?.value) })} items={itemsTypeField} />
                </div>
            </Modal>
        </Form>
    );
}

type Props = IAnamnesisFieldFormModal;

export default AnamnesisFieldForm;