import React, { FC, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Input, List } from "antd";

import styles from './index.module.scss';
import Form from "../../../../../components/ui/form";
import Field from "../../../../../components/ui/field";
import schema from "./index.schema";
import { IAnamnesisField } from "../../../../../data/interfaces/anamnesis/IAnamnesis";
import Radio, { IItemRadio } from "../../../../../components/ui/radio";
import { FaTrash } from "react-icons/fa";
import TextAreaForm from "../../../../../components/ui/textArea";
import { AnamnesisFieldTypeEnum } from "../../../../../data/enums/AnamnesisEnum";
import { toast } from "react-toastify";

export interface IAnamnesisFieldFormModal {
    topicId: number,
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: IAnamnesisField) => void;
    defaultValues?: IAnamnesisField
}

const AnamnesisFieldForm: FC<Props> = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [defaultValues, setDefaultValues] = useState(props.defaultValues ?? { anamnesisFieldType: 1 } as IAnamnesisField);

    const submit = (values: IAnamnesisField) => {
        if (values) {
            if ((values.anamnesisFieldType === AnamnesisFieldTypeEnum.MultipleOption || values.anamnesisFieldType === AnamnesisFieldTypeEnum.SingleOption)
                && (defaultValues.options === undefined || defaultValues.options?.length === 0)) {
                toast.error("Informe as opções do campo!");
            }
            else {
                values.options = defaultValues.options;
                values.anamnesisTopicFk = props.topicId;
                props.onSubmit(values);
                props.onClose();
            }
        }
        setIsSubmit(false);
    }

    const onAddNewOption = () => {
        var options = { ...defaultValues }?.options ?? [];

        if (defaultValues.optionsAux?.length > 0 && !options.includes(defaultValues.optionsAux)) {
            setDefaultValues({ ...defaultValues, options: [...options, defaultValues.optionsAux], optionsAux: '' });
        }
    }

    const buttons =
        [
            <Button key="back" onClick={props.onClose}>Cancelar</Button>,
            <Button key="submit" type="primary" htmlType='submit' onClick={() => setIsSubmit(true)}>Adicionar Pergunta</Button>,
        ];

    const itemsTypeField = [
        { value: 1, label: 'Campo de Texto' },
        { value: 2, label: 'Campo de Texto Grande' },
        { value: 3, label: 'Campo de Seleção Sim/Não' },
        { value: 4, label: 'Campo de Seleção Única' },
        { value: 5, label: 'Campo de Seleção Múltipla' },
    ] as IItemRadio[];

    return (
        <Modal title='Nova Pergunta' visible={props.visible} footer={buttons} onCancel={props.onClose} destroyOnClose={true}>
            <div className={styles['container']}>
                <Form onSubmit={submit} schema={schema} isSubmited={isSubmit} initialValues={defaultValues}>
                    <TextAreaForm rows={2} autoComplete='false' key='title' label='Texto da Pergunta' name='title' className={styles['inputForm']}></TextAreaForm>
                    <Radio name='anamnesisFieldType' bordered={true} label='Tipo de Campo' onChange={(e) => setDefaultValues({ ...defaultValues, anamnesisFieldType: parseInt(e.target?.value) })} items={itemsTypeField} />
                    <div className={styles['optionsField']} hidden={[AnamnesisFieldTypeEnum.TextField, AnamnesisFieldTypeEnum.LargeTextField, AnamnesisFieldTypeEnum.YesNoOption].includes(defaultValues.anamnesisFieldType)} >
                        <Input.Group compact>
                            <Field maxLength={45} label="Opções" placeholder="Texto da Opção" onInput={(e) => setDefaultValues({ ...defaultValues, optionsAux: e })} name="optionsAux" style={{ width: 'calc(100% - 137px)' }} />
                            <Button type="primary" onClick={onAddNewOption} >Adicionar Opção</Button>
                        </Input.Group>
                        <List
                            style={{ marginTop: 10 }}
                            size="small"
                            bordered
                            dataSource={defaultValues.options}
                            locale={{ emptyText: 'Nenhum Item Adicionado' }}
                            renderItem={item =>
                                <List.Item className={styles['items']}   >
                                    <label className={styles['name']}>{item}</label>
                                    <FaTrash title='Remover Item' className={styles['trash']} color='#e95151' onClick={() => setDefaultValues({ ...defaultValues, options: [...defaultValues.options?.filter(x => x !== item)] })} />
                                </List.Item>}
                        />
                    </div>
                </Form>
            </div>
        </Modal>
    );
}

type Props = IAnamnesisFieldFormModal;

export default AnamnesisFieldForm;