import React, { FC, useEffect } from 'react';
import styles from './TopBar.module.scss';
import { connect, ConnectedProps, useDispatch } from 'react-redux';

import logo from '../../../static/images/logo.svg'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { IGlobalReducerState } from '../../../store/base/interface/IGlobalReducerState';
// import { AuthActions } from '../../../store/auth/Auth.actions';
import { Skeleton } from 'antd';
import { AuthUtils } from '../../../utils/AuthUtils';

export interface ITopBar {
    onCollapseClick: () => void;
}

const TopBar: FC<Props> = (props) => {
    const dispatch = useDispatch();
    var isCollapsed = localStorage.getItem('menuCollapsed') == "true";

    // useEffect(() => {
    //     if (!props.user) {
    //         dispatch(AuthActions.getUserInfo());
    //     }
    // }, [props.user]);

    // var avatarImageUrl;
    // var avatarFileName = props.user?.avatarFileName;

    // if (avatarFileName && avatarFileName.length > 0)
    //     avatarImageUrl = `${process.env.REACT_APP_BASE_URL_STORAGE}${avatarFileName}`;

    return (
        <div className={styles['container']}>
            <div className={styles['contentLogo']}>
                <img src={logo} />
            </div>
            <div onClick={props.onCollapseClick} className={styles['contentCollapse']}>
                {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className={styles['nomeUsuario']}>
                {/* {!props.user ?
                    <>
                        <Skeleton.Input style={{ width: 200 }} active={true} size={'small'} />
                    </> :
                    <>
                        <label>Olá, {props.user?.name}</label>
                        <img src={avatarImageUrl} />
                    </>
                } */}
            </div>
        </div>
    )
}

const mapState = (state: IGlobalReducerState) => ({
    ...state.auth
});

const connector = connect(
    mapState,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ITopBar;

export default connector(TopBar);