import * as React from 'react';
import Calendar from 'react-calendar';
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';
import './ReminderCalender.css'

export default function ReminderCalender() {
    const [value, onChange] = useState(new Date());

    const mark = [{
        date: '2023-07-28',
        timestamp: 1690482600000
    }
        ,
    ]
    console.log(new Date().valueOf())
    return (
        <div>
            <Calendar onChange={onChange} value={value}
                      tileClassName={({
                                          activeStartDate,
                                          date,
                                          view
                                      }) => view === 'month' && mark.some(item => date.valueOf() === item.timestamp) ? 'highlight' : null}

            />
        </div>
    );
}
