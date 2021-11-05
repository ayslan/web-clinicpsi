import React, { FC } from 'react';
import styles from './Login.module.scss';
import Background from '../background/Background';
import Form from '../../../components/ui/form';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import Field from '../../../components/ui/field';
import schema from './Login.schema';
import logo from '../../../static/images/logo.png'
import { Button, Checkbox } from 'antd';
import { IGlobalReducerState } from '../../../store/base/interface/IGlobalReducerState';

const Login: FC<Props> = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <Background>
                <div className={styles['containerWrapper']}>
                    <div>
                        <img src={logo}></img>
                    </div>
                    <h3>Acesse sua Conta</h3>
                    <p>Informe seu email e senha para acessar sua conta!</p>
                    <div className={styles['contentWrapper']}>
                        <Form onSubmit={() => null} schema={schema}>
                            <Field label='Email' name='email' className={styles['input']}></Field>
                            <Field label='Senha' name='password' type='password' className={styles['input']}></Field>
                            <Checkbox>Manter conectado</Checkbox>
                            <Button loading={props.isLoading} type='primary' htmlType='submit'>Login</Button>
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

export default connector(Login);