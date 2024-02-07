import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Swal from "sweetalert2";
import {AddCircleSharp, CreateOutline, TrashOutline} from "react-ionicons";
import NewReminder from "../addReminder/NewReminder";
import Calendar from "react-calendar";
import "./SchedulerTimetable.css"
import {deleteScheduledTasks, getScheduledTasks} from "../../repository/schedulerRepository";
import AddNewReminder from "../addReminder/AddNewReminder";
import {convert12HourTo24Hour, convertFullDate} from "../../function/function";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#000000' : '#050505',
    height: '100%',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const handleDeleteRow = (reminderId) => () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteScheduledTasks(1, reminderId)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.success) {
                            Swal.fire(
                                'Deleted!',
                                'Recode has been deleted.',
                                'success'
                            ).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload(true);
                                }
                            })
                        } else {
                            Swal.fire(
                                'error!',
                                'can not be delete!',
                                'error'
                            )
                        }
                    } else {
                        Swal.fire(
                            'Error!',
                            'Con not be delete',
                            'error'
                        )
                    }
                })

        }
    })
};

const SchedulerTimetable = (props) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisibles, setPopupVisibles] = useState(false);
    const [title, setTitle] = useState('Reminder');
    const [btnName, setBtnName] = useState('Update');
    const [eventsAvailable, setEventsAvailable] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedulerList, setSchedulerLists] = useState([])
    const [date, setDate] = useState()
    const [note, setNote] = useState("")
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("")
    const [reminderEarly, setReminderEarly] = useState("");
    const [selectDate, setSelectDate] = useState()
    const [reminderId, setReminderId] = useState("");
// {/*---------------------------------------------------- button handle-----------------------------------------------*/}
    const handlePopUp = (date, note, from, to, remind, reminderId) => () => {
        setPopupVisible(!popupVisible);
        setTitle('Reminder')
        setBtnName('Update')
        setDate(date)
        setNote(note)
        setFrom(from)
        setTo(to)
        setReminderEarly(remind)
        setReminderId(reminderId)
    }

    const handleWantAdded = (d) => () => {
        setPopupVisibles(!popupVisibles);
        setDate(d)
    }

    //Connect redux store
    useEffect(() => {
        getScheduledTasks(1,)
            .then((res) => {
                setSchedulerLists(res.data.body)
            })
            .catch(err => console.log(err))
    }, [setSchedulerLists,])

    const handleDayChange = (value) => {
        setSelectedDate(value);
        if (schedulerList.some(item => value.valueOf() === item.timestamp)) {
            setSelectDate((schedulerList.find(item => value.valueOf() === item.timestamp)).date)
            setEventsAvailable(true);
            setEvents(schedulerList.find(item => value.valueOf() === item.timestamp).events);
        } else {
            setEventsAvailable(false);
            setEvents([]);
        }
    }

    function getTimeString(t) {
        const time = new Date(t);
        return time.toLocaleTimeString();
    }

    return (
        <div className="row w-100 ">
            <div
                className="col-xl-5  col-lg-5 col-md-12 col-sm-12 col-sm-12    child-settings-sections schedule-responsive">
                {/*----------------------------------------------left side ....... Calendar---------------------------------------*/}
                <Calendar onChange={(value, event) => handleDayChange(value)} value={selectedDate}
                          tileClassName={({
                                              activeStartDate,
                                              date,
                                              view
                                          }) => view === 'month'
                          && schedulerList.some(item => date.valueOf() === item.timestamp) ? 'highlight' : null}

                />
            </div>
            {/*----------------------------------------------Right side ....... Item------------------------------------------------*/}

            <div className="col-xl-5  col-lg-5 col-md-12 col-sm-12 col-sm-12 ">
                <div className="m-1 mt-4">
                    {/*{getSchedulerList}*/}
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={{xs: 1, sm: 2, md: 2}}>
                            {eventsAvailable &&
                                <>
                                    {events.map((e) => (
                                        <Grid item xs={12} lg={12} key={e.id}>
                                            <Item
                                                sx={{
                                                    textAlign: "left",
                                                    marginBottom: "0",
                                                    fontSize: "20px",
                                                    bottom: "0",
                                                }}
                                            >
                                                <div className="item-text-align">
                                                    <div className="row w-100">
                                                        <div className="col-xl-10 col-9">
                                                            <div>
                                                                <h5>
                                                                    {e.note}
                                                                </h5>
                                                            </div>
                                                            <div
                                                                className="eventTime">From {convert12HourTo24Hour(getTimeString(e.from))} to {convert12HourTo24Hour(getTimeString(e.to))}</div>
                                                            <div className="eventRemindTime">Remind Earlier
                                                                At {convert12HourTo24Hour(getTimeString(e.remindTime))} date {e.date}</div>
                                                        </div>
                                                        <div className="col-xl-1 col-1 "
                                                             style={{cursor: "pointer", paddingRight: '10px'}}>
                                                            <CreateOutline
                                                                color={"#a3a3a3"}
                                                                height="30px"
                                                                width="30px"
                                                                onClick={handlePopUp(selectDate, e.note, getTimeString(e.from), getTimeString(e.to), getTimeString(e.remindTime), e.id)}
                                                                className="icon-size"
                                                            />
                                                        </div>
                                                        <div className="col-1 deleteIcon"
                                                             style={{cursor: "pointer"}}>
                                                            <TrashOutline
                                                                onClick={handleDeleteRow(e.id)}
                                                                color={"#ff0000"}
                                                                height="30px"
                                                                width="30px"
                                                                className="icon-size"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </Grid>
                                    ))}
                                </>
                            }
                            {!eventsAvailable &&
                                <Grid item xs={12} lg={12}>
                                    <Item
                                        sx={{
                                            textAlign: "left",
                                            marginBottom: "0",
                                            fontSize: "20px",
                                            bottom: "0",
                                        }}
                                    >
                                        <div className="item-text-align">
                                            <div className="row w-100">
                                                <div className="col-xl-12 col-12">No Events Available</div>
                                            </div>
                                        </div>
                                    </Item>
                                </Grid>
                            }
                        </Grid>

                    </Box>
                    <Box sx={{flexGrow: 1, marginTop: '25px'}}>
                        <Grid container spacing={{xs: 1, sm: 2, md: 2}}>
                            <Grid item xs={12} lg={12} sx={{cursor: 'pointer'}}>

                                <AddCircleSharp
                                    color={'#1E5D88'}
                                    height="30px"
                                    width="30px"
                                    onClick={handleWantAdded(selectedDate)}
                                />
                            </Grid>
                        </Grid>

                    </Box>
                    {popupVisible && (
                        <NewReminder
                            dates={date}
                            notes={note}
                            from={from}
                            to={to}
                            reminderTime={reminderEarly}
                            buttonName={btnName}
                            id="search-student-div"
                            title={title}
                            swalTitle="Reminder has been updated successfully!"
                            reminderId={reminderId}
                            setPopupVisible={setPopupVisible}
                        />
                    )}
                    {popupVisibles && (
                        <AddNewReminder
                            setPopupVisibles={setPopupVisibles}
                            dates={convertFullDate(date)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SchedulerTimetable;