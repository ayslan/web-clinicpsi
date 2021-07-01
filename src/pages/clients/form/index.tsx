import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Skeleton, Tabs, } from "antd";
import React, { FC } from "react";
import { IBreadCrumb } from "../../../components/interfaces/IBreadCrumb";
import PageContent from "../../../components/ui/pageContent";
import { history } from "../../../store";
import styles from './ClientForm.module.scss';
const { TabPane } = Tabs;

const ClientForm: FC = () => {

    const breadCrumb = [{ name: 'Clientes', location: '/clients' }, { name: 'Novo Cliente' }] as IBreadCrumb[];

    return <>
        <PageContent title='Novo Cliente' className={styles['container']} breadCrumb={breadCrumb}>
            {false ?
                <Skeleton active />
                :
                <>
                    <div>
                        <Tabs >
                            <TabPane tab="Dados Pessoais" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Dados Complementares" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Dados de Cobrança" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>
                </>
            }
        </PageContent>
    </>;
}

export default ClientForm;