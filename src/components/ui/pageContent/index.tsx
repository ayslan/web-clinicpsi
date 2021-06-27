import React, { FC, ReactNode } from "react";
import { Breadcrumb, BreadcrumbProps, PageHeader } from 'antd';

import styles from './PageContent.module.scss';
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export interface IPageHeader {
    title: string;
    children?: ReactNode;
    className?: string;
    breadCrumb?: BreadcrumbProps | React.ReactElement<typeof Breadcrumb>;
}

const PageContent: FC<IPageHeader> = (props) => {

    const breadCrumb = <Breadcrumb>
        <Breadcrumb.Item href="">
            <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
    </Breadcrumb>;

    return (
        <div className={`${styles['container']} ${props.className ? props.className : ''}`}>
            <PageHeader title={props.title} className={styles['title']} breadcrumb={props.breadCrumb ?? breadCrumb} />
            <div className={styles['children']}>{props.children}</div>
        </div>
    );
}

export default PageContent;