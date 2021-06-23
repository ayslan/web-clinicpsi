import React, { FC } from 'react';

import styles from './BreadCrumb.module.scss';
import { Breadcrumb } from 'antd';
import { IconType } from 'react-icons/lib';
import { FaGreaterThan } from 'react-icons/fa';

export interface IBreadcrumb {
    breadcrumbs: IBreadcrumbItem[];
}

export interface IBreadcrumbItem {
    description?: string;
    href: string;
    Icon?: IconType;
}

const BreadCrumb: FC<IBreadcrumb> = ({ breadcrumbs }) => {
    return (
        <Breadcrumb className={styles['breadcrumb']}
            separator={<FaGreaterThan size={10} />}>
            {
                breadcrumbs.map((breadcrumb, index) => (
                    <Breadcrumb.Item href={breadcrumb.href} key={`breadCrumb${index}`}>
                        {breadcrumb.Icon ? <breadcrumb.Icon></breadcrumb.Icon> : ''}
                        {breadcrumb.description ? <span>{breadcrumb.description}</span> : ''}
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    );
};

export default BreadCrumb;
