import React, { FC } from 'react';
import { Button as ButtonAnt } from 'antd';
import { ButtonProps } from 'antd/es/button';
import './button.css';

export interface IButtonProps extends ButtonProps {
    height?: number;
    width?: number | string;
}

const Button: FC<IButtonProps> = (props) => {
    return (
        <ButtonAnt {...props}>
            {props.children}
        </ButtonAnt>
    );
};

export default Button;
