import "./AddNewRecord.css";
import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import CustomInput from "../inputField/InputField";
import CustomButton from "../button/CustomButton";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import close from "../../assets/formImg/close.png";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {
    updateOneDailyTimeTable
} from "../../store/slices/dailyTimeTableSlice";
import {updateTimeTableRecordForDay} from "../../repository/timeTableRepository";
import {convert12HourTo24Hour} from "../../function/function";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const closePopUp = (setPopupVisible) => (event) => {
    setPopupVisible(false);
};

const UpdateRecord = ({
                          ids,
                          days,
                          title,
                          from,
                          to,
                          task,
                          setPopupVisible,
                          swalTitle,
                      }) => {

    const [day, setDay] = useState(days)
    const [fromTime, setFromTime] = useState(convert12HourTo24Hour(from))
    const [toTime, setToTime] = useState(convert12HourTo24Hour(to))
    const [tasks, setTasks] = useState(task)

    const dispatcher = useDispatch()

    const handleChangeDay = (event) => {
        setDay(event.target.value);
    }
    const handleChangeFromTime = (event) => {
        setFromTime(event.target.value);
    }
    const handleChangeToTime = (event) => {
        setToTime(event.target.value);
    }
    const handleChangTasks = (event) => {
        setTasks(event.target.value);
    }

    function timeConvertor(time) {
        const digitalTime = time; // Replace with your digital time
        const parts = digitalTime.split(":");
        const hour = parseInt(parts[0]);
        const minute = parseInt(parts[1]);

        const date = new Date();
        date.setHours(hour, minute, 0);

        const localTime = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });

        return localTime;
    }

    const id1 = {ids}

    const updateDetails = {
        id: id1.ids,
        childId: 1,
        day: day,
        fromTime: timeConvertor(fromTime),
        toTime: timeConvertor(toTime),
        task: tasks,
    }

    const handleAddData = (swalTitle) => (event) => {
        console.log(updateDetails)
        updateTimeTableRecordForDay(updateDetails).then(res => {
            console.log("error")
            console.log(res)
            if (res.status === 200) {
                console.log("pass")
                dispatcher(updateOneDailyTimeTable({...res.data}));
                Swal.fire("Updated!", swalTitle, "success").then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true);
                    }
                });
            } else {
                Swal.fire(
                    'Failed',
                    'error'
                )
            }
        });

    };


    return (
        <div id="add-new-main-section">
            <div id="add-record-background"></div>
            <div className="set-background record-form">
                <img
                    src={close}
                    alt="close"
                    className="close-btn"
                    onClick={closePopUp(setPopupVisible)}
                />
                <p className="title-align-add-form">{title}</p>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={12}>
                        <Item>
                            <label className="label-align-add">Day</label>
                            <br/>
                            <select
                                id="day"
                                name="gender"
                                className="selection-gender"
                                style={{fontSize: "17px", textAlign: "left"}}
                                value={day}
                                onChange={handleChangeDay}
                            >
                                <option value="SUN" className="g-gender">
                                    Sunday
                                </option>
                                <option value="MON" className="g-gender">
                                    Monday
                                </option>
                                <option value="TUE" className="g-gender">
                                    Tuesday
                                </option>
                                <option value="WED" className="g-gender">
                                    Wednesday
                                </option>
                                <option value="THU" className="g-gender">
                                    Thursday
                                </option>
                                <option value="FRI" className="g-gender">
                                    Friday
                                </option>
                                <option value="SAT" className="g-gender">
                                    Saturday
                                </option>
                            </select>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <label className="label-align-add">From</label>
                            <br/>
                            <CustomInput
                                type="time"
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className='font-set'
                                value={fromTime}
                                onchange={handleChangeFromTime}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <label className="label-align-add">To</label>
                            <br/>
                            <CustomInput
                                type="time"
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                value={toTime}
                                onchange={handleChangeToTime}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <label className="label-align-add">Task</label>
                            <br/>
                            <CustomInput
                                type="text"
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                value={tasks}
                                onchange={handleChangTasks}
                            />
                        </Item>
                    </Grid>
                </Grid>
                <div className="row" style={{width: "100%"}}>
                    <div className="col">
                        <CustomButton
                            type="button"
                            variant="primary"
                            radius="20"
                            size="sm"
                            className="mt-3 mb-4"
                            fontSize="17"
                            width="120"
                            onclick={handleAddData(swalTitle)}
                        >
                            Update
                        </CustomButton>
                    </div>

                    <div className="col">
                        <CustomButton
                            type="button"
                            variant="cancel"
                            radius="20"
                            size="xsm"
                            className="mt-3 mb-4"
                            fontSize="17"
                            width="120"
                            onclick={closePopUp(setPopupVisible)}
                        >
                            Cancel
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateRecord;
