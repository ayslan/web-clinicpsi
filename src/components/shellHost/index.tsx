import React, { FC, ReactNode, useState } from 'react';
import LeftBar from './leftBar';
import TopBar from './topBar';

import styles from './ShellHost.module.scss';
import AppStorage from '../../utils/AppStorage';

export interface IShellHost {
    children?: ReactNode;
}

const ShellHost: FC<IShellHost> = ({ children }) => {
    const [isCollapsed, setCollapse] = useState<boolean>(localStorage.getItem('menuCollapsed') == "true");

    const toggleCollapse = () => {
        setCollapse(!isCollapsed);
        localStorage.setItem('menuCollapsed', (!isCollapsed).toString());
    };

    return (
        <div className={styles['container']}>
            <TopBar onCollapseClick={toggleCollapse}></TopBar>
            <LeftBar isCollapsed={isCollapsed}></LeftBar>
            <main className={isCollapsed ? styles['mainCollapsed'] : styles['main']}>
                {children}
            </main>
        </div>
    );
}

export default ShellHost;