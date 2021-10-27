import React, { FC, useState } from 'react';
import styles from './Register.module.scss';
import Background from '../background/Background';
import Form from '../../../components/ui/form';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import Field from '../../../components/ui/field';
import schema from './Register.schema';
import logo from '../../../static/images/logo.png'
import { Button, Checkbox } from 'antd';
import { IGlobalReducerState } from '../../../store/base/interface/IGlobalReducerState';

const Register: FC<Props> = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <Background>
                <div className={styles['containerWrapper']}>
                    <div>
                        <img src={logo}></img>
                    </div>
                    <h3>Crie sua conta gratuitamente!</h3>
                    <p>Informe seus dados e tenha acesso ao ClinicPsi. Leva menos de um minuto!</p>
                    <div className={styles['contentWrapper']}>
                        <Form onSubmit={() => null} schema={schema}>
                            <Field label='Nome Completo' name='name' className={styles['input']}></Field>
                            <Field label='Email' name='email' className={styles['input']}></Field>
                            <Field label='Senha' name='password' type='password' className={styles['input']}></Field>
                            <Field label='Confirme a Senha' name='confirmPassword' type='password' className={styles['input']}></Field>
                            <Checkbox>Eu aceito os Termos de Uso</Checkbox>
                            <Button loading={props.isLoading} type='primary' htmlType='submit'>Cadastrar</Button>
                        </Form>
                    </div>
                </div>
            </Background>
        </>
    );
};

const mapState = (state: IGlobalReducerState) => ({
    ...state.auth,
});


const connector = connect(
    mapState,
);

type Props = ConnectedProps<typeof connector>;

export default connector(Register);