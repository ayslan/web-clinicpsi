import React, { FC, ReactNode } from "react";
import { PageHeader } from 'antd';

import styles from './PageContent.module.scss';

export interface IPageHeader {
    title: string;
    children?: ReactNode;
    className?: string;
}

const PageContent: FC<IPageHeader> = (props) => {

    return (
        <div className={`${styles['container']} ${props.className ? props.className : ''}`}>
            <PageHeader title={props.title} className={styles['title']} />
            <div className={styles['children']}>{props.children}</div>
        </div>
    );
}

export default PageContent;