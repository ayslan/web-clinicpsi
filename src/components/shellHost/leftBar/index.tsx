import React, { FC, useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import styles from './LeftBar.module.scss';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import {
    AppstoreOutlined,
    PieChartOutlined,
    FormOutlined,
    HddOutlined,
    UserOutlined,
    RiseOutlined,
    SettingOutlined,
    SmileOutlined,
    LogoutOutlined,
    LaptopOutlined,
    DashboardOutlined,
    CalendarOutlined,
    DollarCircleOutlined,
    FontSizeOutlined,
} from '@ant-design/icons';
import { AuthUtils, ILoggedUser } from '../../../utils/AuthUtils';

export interface ILeftBar {
    isCollapsed: boolean;
}

const rootSubmenuKeys = ['/pedidos', '/pedidoItens', '/produtos', '/clientes', '/dashboards', '/api'];

const LeftBar: FC<ILeftBar> = ({ isCollapsed }) => {

    var defaultOpenKeys: string[] = [];
    var defaultSelectedKeys: string[] = [];

    // if (pathName.split('/').length == 2) {
    //     defaultOpenKeys = [];
    //     defaultSelectedKeys = [pathName];
    // }
    // else {
    //     defaultOpenKeys = [pathName.substr(0, pathName.indexOf('/', 2))];
    //     defaultSelectedKeys = [`/${pathName.split('/')[1]}/${pathName.split('/')[2]}`];
    // }

    const [openKeys, setOpenKeys] = useState(isCollapsed ? [] : defaultOpenKeys);

    const onOpenChange = (keys: any) => {
        // const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
        // if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        //     setOpenKeys(keys);
        // } else {
        //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        // }
    };

    const onChange = (e: any) => {
        if (e.keyPath && e.keyPath.length == 1) {
            setOpenKeys([]);
        }
    }

    const onLogout = () => {
        AuthUtils.setLoggedUser({} as ILoggedUser);
        window.location.href = '/login';
    }

    return (
        <div className={`${styles['containerBar']} ${styles[isCollapsed ? 'containerBarCollapsed' : '']}`}>
            <Menu
                defaultSelectedKeys={defaultSelectedKeys}
                mode='inline'
                theme='dark'
                inlineCollapsed={isCollapsed}
                style={{ height: '100%', backgroundColor: '#313a46' }}
                onClick={onChange}
            >
                <Menu.Item key='/' icon={<DashboardOutlined className={styles['icon']} />} title='Dashboard'>
                    Dashboard
                    <Link to='/' />
                </Menu.Item>
                <Menu.Item key='/clients' icon={<SmileOutlined className={styles['icon']} />} title='Clientes'>
                    Clientes
                    <Link to='/clients' />
                </Menu.Item>
                <Menu.Item key='/calendar' icon={<CalendarOutlined className={styles['icon']} />} title='Agenda'>
                    Agenda
                    <Link to='/calendar' />
                </Menu.Item>
                <Menu.Item key='/finance' icon={<DollarCircleOutlined className={styles['icon']} />} title='Financeiro'>
                    Financeiro
                    <Link to='/finance'></Link>
                </Menu.Item>
                <Menu.Item key='/users' icon={<UserOutlined className={styles['icon']} />} >
                    Usuários
                    <Link to='/users' />
                </Menu.Item>
                <SubMenu key="/settings" icon={<SettingOutlined className={styles['icon']} />} title="Configurações">
                    <Menu.Item key="3">Usuários<Link to='/settings/users' /></Menu.Item>
                    <Menu.Item key="4">Cobrança<Link to='/settings/billing' /></Menu.Item>
                </SubMenu>
                <Menu.Item key='/logout' icon={<LogoutOutlined className={styles['icon']} />} onClick={onLogout}>
                    Sair
                </Menu.Item>
            </Menu>
        </div >
    );
};

export default LeftBar;