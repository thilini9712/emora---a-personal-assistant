import {useState} from "react";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {CreateOutline, TrashOutline} from 'react-ionicons'
import Swal from "sweetalert2";
import "./DailyTimetable.css"
import {deleteTimeTableRecordForDay} from "../../repository/timeTableRepository";
import {useDispatch} from "react-redux";
import {removeOneDailyTimeTable} from "../../store/slices/dailyTimeTableSlice";
import UpdateRecord from "../addNewRecord/UpdateRecord";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#000000' : '#050505',
    height: '100%',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));


const TimetableRecode = ({startTime, endTime, description, id, day}) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const dispatcher = useDispatch()

    const handleDeleteRow = (event) => {
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
                deleteTimeTableRecordForDay(id)
                    .then((res) => {
                        dispatcher(removeOneDailyTimeTable)
                    })
                    .catch(err => console.error(err))

                Swal.fire(
                    'Deleted!',
                    'Recode has been deleted.',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true);
                    }
                })
            }
        })

    };

    const handlePopUp = (value) => {
        setPopupVisible(!popupVisible);
    }

    return (
        <div className="m-1">
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 1, sm: 2, md: 2}}>
                    <Grid item xs={3} lg={1.5}>
                        <Item sx={{backgroundColor: "#1e5d88", color: "#ffffff"}} className='schedule-time'>
                            {startTime} <br/> to <br/> {endTime}
                        </Item>
                    </Grid>
                    <Grid item xs={9} lg={10.5}>
                        <Item
                            sx={{
                                textAlign: "left",
                                marginBottom: "0",
                                fontSize: "20px",
                                bottom: "0",
                            }}
                            className='background-tras'
                        >
                            <div className="item-text-align background-tras">
                                <div className="row">
                                    <div className="col-xl-10 col-8">{description}</div>
                                    <div className="col-xl-1 col-2" style={{cursor: "pointer"}}>
                                        <CreateOutline
                                            color={"#a3a3a3"}
                                            height="30px"
                                            width="30px"
                                            onClick={handlePopUp}
                                            className="icon-size"
                                        />
                                    </div>
                                    <div className="col-1 deleteIcon" style={{cursor: "pointer"}}>
                                        <TrashOutline
                                            onClick={handleDeleteRow}
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
                </Grid>
            </Box>
            {popupVisible && (
                <UpdateRecord
                    title="Edit Timetable Record"
                    id="search-student-div"
                    swalTitle="Record has been updated successfully!"
                    setPopupVisible={setPopupVisible}
                    days={day}
                    from={startTime}
                    to={endTime}
                    task={description}
                    ids={id}
                />
            )}
        </div>
    );
}

export default TimetableRecode;