import React, { FC, ReactNode } from "react";
import { Breadcrumb, BreadcrumbProps, PageHeader } from 'antd';
import styles from './PageContent.module.scss';
import { HomeOutlined } from "@ant-design/icons";
import { history } from "../../../store";
import { IBreadCrumb } from "../../interfaces/IBreadCrumb";

export interface IPageHeader {
    title: string;
    children?: ReactNode;
    className?: string;
    breadCrumb?: IBreadCrumb[];
}

const PageContent: FC<IPageHeader> = (props) => {

    var breadCrumbDefault = <Breadcrumb>
        <Breadcrumb.Item className={styles['link']} onClick={() => history.push('/')}><HomeOutlined /></Breadcrumb.Item>
        <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
    </Breadcrumb>;

    if (props.breadCrumb) {
        breadCrumbDefault = <Breadcrumb>
            <Breadcrumb.Item className={styles['link']} onClick={() => history.push('/')}><HomeOutlined /></Breadcrumb.Item>
            {
                props.breadCrumb.map((item: any) => (
                    <Breadcrumb.Item className={item.location ? styles['link'] : ''} onClick={() => item.location ? history.push(item.location) : null}>{item.name}</Breadcrumb.Item>
                ))
            }
        </Breadcrumb>;
    }

    return (
        <div className={`${styles['container']} ${props.className ? props.className : ''}`}>
            <PageHeader title={props.title} className={styles['title']} breadcrumb={breadCrumbDefault} />
            <div className={styles['children']}>{props.children}</div>
        </div>
    );
}

export default PageContent;