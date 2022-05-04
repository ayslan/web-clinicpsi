import React, { FC, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";

import styles from './index.module.scss';
import Form from "../../form";
import FieldForm from "../../field";
import schema from "./index.schema";

export interface IAnamnesisTopicFormModal {
    visible: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
}

const AnamnesisTopicForm: FC<Props> = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);

    const submit = (value: any) => {
        if (value) {
            props.onSubmit(value.name);
            props.onClose();
        }
        setIsSubmit(false);
    }

    const buttons =
        [
            <Button key="back" onClick={props.onClose}>Cancelar</Button>,
            <Button key="submit" type="primary" htmlType='submit' onClick={() => setIsSubmit(true)}>Adicionar Tópico</Button>,
        ];

    return (
        <Form onSubmit={submit} schema={schema} isSubmited={isSubmit}>
            <Modal title='Novo Tópico' visible={props.visible} footer={buttons} onCancel={props.onClose} destroyOnClose={true}>
                <div className={styles['container']}>
                    <FieldForm autoComplete='false' key='nome' label='Nome do Tópico' name='name' className={styles['inputForm']}></FieldForm>
                </div>
            </Modal>
        </Form>
    );
}

type Props = IAnamnesisTopicFormModal;

export default AnamnesisTopicForm;