import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
import { FC } from 'react';
import PageContent from '../../components/ui/pageContent';
import styles from './Customers.module.scss';

const Customers: FC = () => {

    return <>
        <PageContent title='Clientes' className={styles['container']}></PageContent>
    </>;
}

export default Customers;