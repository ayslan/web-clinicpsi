import React, { FC, useState } from 'react';
import styles from './Login.module.scss';
import Background from '../background/Background';
import Form from '../../../components/ui/form';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import Field from '../../../components/ui/field';
import schema from './Login.schema';
import logo from '../../../static/images/logo.png'
import carImg from '../../../static/images/car-login.jpg'
import { Button } from 'antd';
import { IGlobalReducerState } from '../../../store/base/interface/IGlobalReducerState';
// import { ILoginRequest } from '../../../data/interfaces/auth/ILoginRequest';
// import { AuthActions } from '../../../store/auth/Auth.actions';
import { history } from '../../../store';
// import $ from 'jquery';

const Login: FC<Props> = (props) => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState<string>('');
    const [ipClient, setIPClient] = useState<string>('');

    if (window.location.pathname != '/' && window.location.pathname != '/login') {
        history.push(`/login?redirectUrl=${window.location.pathname}`);
    }

    // $(function () {

    //     $.getJSON('https://ipapi.co/json/')
    //         .then(function (data) {
    //             setIPClient(data.ip);
    //             setLocation(data.city + ", " + data.region);
    //         })
    //         .fail(function (e) {
    //             setIPClient("ERRO");
    //         });
    // });

    // const submit = (data: ILoginRequest) => {
    //     data.ipClient = ipClient;
    //     data.location = location;
    //     dispatch(AuthActions.userLogin(data));
    // };

    return (
        <>
            <Background>
                <div className={styles['containerWrapper']}>
                    <div className={styles['imgWrapper']} style={{ backgroundImage: 'url(' + carImg + ')' }}>
                    </div>
                    <div className={styles['loginWrapper']}>
                        <img src={logo}></img>
                        <div className={styles['contentWrapper']}>
                            <Form onSubmit={() => null} schema={schema}>
                                <Field label='Em2ail' name='email' className='inputLogin'></Field>
                                <Field label='Senha' name='password' type='password' className='inputLogin'></Field>
                                <Button loading={props.isLoading || !location} type='primary' htmlType='submit'>Entrar</Button>
                            </Form>
                        </div>
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