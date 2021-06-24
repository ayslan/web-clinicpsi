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
} from '@ant-design/icons';
import { AuthUtils, ILoggedUser } from '../../../utils/AuthUtils';

export interface ILeftBar {
    isCollapsed: boolean;
}

const rootSubmenuKeys = ['/pedidos', '/pedidoItens', '/produtos', '/clientes', '/dashboards', '/api'];

const LeftBar: FC<ILeftBar> = ({ isCollapsed }) => {

    var defaultOpenKeys: string[] = [];
    var defaultSelectedKeys: string[] = [];

    var pathName = window.location.pathname;

    if (pathName.split('/').length == 2) {
        defaultOpenKeys = [];
        defaultSelectedKeys = [pathName];
    }
    else {
        defaultOpenKeys = [pathName.substr(0, pathName.indexOf('/', 2))];
        defaultSelectedKeys = [`/${pathName.split('/')[1]}/${pathName.split('/')[2]}`];
    }

    const [openKeys, setOpenKeys] = useState(isCollapsed ? [] : defaultOpenKeys);

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
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
                style={{ height: '100%' }}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={onChange}
            >
                <SubMenu key='/pedidos' icon={<FormOutlined />} title='Pedidos'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>Pedidos</Menu.Item>
                    <Menu.Item key='/pedidos/importador'>Importador <Link to='/pedidos/importador' /></Menu.Item>
                </SubMenu>
                {/* <SubMenu key='/pedidoItens' icon={<AppstoreOutlined />} title='Itens do Pedido'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>Itens do Pedido</Menu.Item>
                    <Menu.Item style={{ ...setVisibleAccessAdmin }} key='/pedidoItens/atualizar'>Atualizar <Link to='/pedidoItens/atualizar' /></Menu.Item>
                    <Menu.Item key='/pedidoItens/atualizarItens'>Lista de Itens Atualizados <Link to='/pedidoItens/atualizarItens' /></Menu.Item>
                </SubMenu>
                <SubMenu style={{ ...setVisibleAccessAdmin }} key='/produtos' icon={<HddOutlined />} title='Produtos'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>Produtos</Menu.Item>
                    <Menu.Item key='/produtos/atualizar'>Atualizar <Link to='/produtos/atualizar' /></Menu.Item>
                </SubMenu>
                <SubMenu style={{ ...setVisibleAccessAdmin }} key='/clientes' icon={<SmileOutlined />} title='Clientes'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>Clientes</Menu.Item>
                    <Menu.Item key='/clientes'>Clientes/Indústrias <Link to='/clientes' /></Menu.Item>
                    <Menu.Item key='/clientes/categorias'>Categorias <Link to='/clientes/categorias' /></Menu.Item>
                </SubMenu>
                <Menu.Item style={{ ...setVisibleAccessAdmin }} key='/projecaoVenda' icon={<RiseOutlined />}>
                    Projeção de Venda
                </Menu.Item>
                <Menu.Item style={{ ...setVisibleAccessAdmin }} key='/usuarios' icon={<UserOutlined />} >
                    Usuários
                    <Link to='/usuarios' />
                </Menu.Item>
                <SubMenu key='/dashboards' icon={<PieChartOutlined />} title='Dashboards'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>Dashboards</Menu.Item>
                    <Menu.Item key='/dashboards/vendas'>Vendas <Link to='/dashboards/vendas' /></Menu.Item>
                    <Menu.Item key='/dashboards/comparativo'>Comparativo <Link to='/dashboards/comparativo' /></Menu.Item>
                    <Menu.Item key='/dashboards/projecao'>Projeção <Link to='/dashboards/projecao' /></Menu.Item>
                    <Menu.Item key='/dashboards/diassemcomprar'>Dias sem Comprar <Link to='/dashboards/diassemcomprar' /></Menu.Item>
                </SubMenu>
                <SubMenu style={{ ...setVisibleAccessAdmin }} key='/api' icon={<LaptopOutlined />} title='API'>
                    <Menu.Item hidden={!isCollapsed} className={styles['parentMenuCollapsed']}>API</Menu.Item>
                    <Menu.Item key='/api/campos-api'>Campos API <Link to='/api/campos-api' /></Menu.Item>
                    <Menu.Item key='/api/campos-integracao'>Campos Integração <Link to='/api/campos-integracao' /></Menu.Item>
                </SubMenu>
                <Menu.Item style={{ ...setVisibleAccessAdmin }} key='/config' icon={<SettingOutlined />}>
                    Configurações
                    <Link to='/config' />
                </Menu.Item> */}
                <Menu.Item key='/logout' icon={<LogoutOutlined />} onClick={onLogout}>
                    Sair
                </Menu.Item>
            </Menu>
        </div >
    );
};

export default LeftBar;