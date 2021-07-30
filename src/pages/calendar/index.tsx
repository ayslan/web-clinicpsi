import { Skeleton } from "antd";
import React from "react";
import { FC } from "react";
import PageContent from "../../components/ui/pageContent";
import styles from './Calendar.module.scss';

const Calendar: FC = () => {



    return <>
        <PageContent title='Agenda' className={styles['container']}>
            {false ?
                <Skeleton active />
                :
                <div></div>}
        </PageContent>
    </>;
}

export default Calendar;