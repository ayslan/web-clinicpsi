import FullCalendar from "@fullcalendar/react";
import { Skeleton } from "antd";
import React from "react";
import { FC } from "react";
import PageContent from "../../components/ui/pageContent";
import styles from './Calendar.module.scss';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


const Calendar: FC = () => {

    const INITIAL_EVENTS = [
        {
            id: '12',
            title: 'All-day event',
            start: todayStr
        },
        {
            id: '123123',
            title: 'Timed event',
            start: todayStr + 'T12:00:00'
        },
        {
            id: '123123',
            title: 'Timed event',
            start: todayStr + 'T24:00:00'
        }
    ]


    return <>
        <PageContent title='Agenda' className={styles['container']}>
            {false ?
                <Skeleton active />
                :
                <>
                    <div style={{ width: 1000, height: 1000, marginLeft: 380 }}>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            height={1000}
                            locale={ptBrLocale}
                            initialView='dayGridMonth'
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={5}
                            weekends={true}
                            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        //initialEvents={undefined} // alternatively, use the `events` setting to fetch from a feed
                        //select={this.handleDateSelect}
                        //eventContent={renderEventContent} // custom render function
                        //eventClick={this.handleEventClick}
                        //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                        />
                    </div>
                </>}
        </PageContent>
    </>;
}

export default Calendar;