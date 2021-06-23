import { Modal } from "antd";
import React from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

function Confirm(title: string, content: string, onConfirm: () => void, onCancel?: () => void) {

    const { confirm } = Modal;

    return (
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: <b>{title}</b>,
            content: <div>{content}</div>,
            onOk() {
                onConfirm();
            },
            onCancel() {
                if (onCancel)
                    onCancel()
            },
            okText: 'Confirmar',
            cancelText: 'Cancelar',
        })
    );
}

export default Confirm;