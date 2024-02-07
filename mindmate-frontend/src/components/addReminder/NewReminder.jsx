import Grid from "@mui/material/Grid";
import CustomInput from "../inputField/InputField";
import CustomButton from "../button/CustomButton";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import close from "../../assets/formImg/close.png";
import Swal from "sweetalert2";
import React, {useState} from "react";
import {updateSchedulerTask} from "../../repository/schedulerRepository";
import {convert12HourTo24Hour, convert12HourTo24HourwithSecond} from "../../function/function";

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


const NewReminder = ({
                         dates,
                         notes,
                         from,
                         to,
                         reminderTime,
                         setPopupVisible,
                         swalTitle,
                         buttonName,
                         title,
                         reminderId
                     }) => {

    const [date, setDate] = useState({dates}.dates);
    const [note, setNote] = useState({notes}.notes);
    const [fromTime, setFromTime] = useState(convert12HourTo24Hour({from}.from));
    const [toTime, setToTime] = useState(convert12HourTo24Hour({to}.to));
    const [reminder, setReminder] = useState(convert12HourTo24Hour({reminderTime}.reminderTime));

    const handleChangeNote = (event) => {
        setNote(event.target.value);
    }
    const handleChangeReminder = (event) => {
        setReminder(event.target.value);
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    }

    const handleChangeFromTime = (event) => {
        setFromTime(event.target.value)
    }
    const handleChangeToTime = (event) => {
        setToTime(event.target.value)
    }

    const schedulerDetails = {
        id: reminderId,
        date: date,
        note: note,
        remindTime: convert12HourTo24HourwithSecond(reminder),
        fromTime: convert12HourTo24HourwithSecond(fromTime),
        toTime: convert12HourTo24HourwithSecond(toTime)
    }

    const handleAddData = (swalTitle) => (event) => {
        updateSchedulerTask(1, schedulerDetails).then(res => {
            console.log(res)
            if (res.status === 200) {
                if (res.data.success === true) {
                    console.log("pass")
                    Swal.fire("Updated!", swalTitle, "success").then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(true);
                        }
                    });
                } else {
                    console.log("error")
                    Swal.fire("Error!", swalTitle, "error").then((result) => {
                    });
                }
            } else {
                console.log("error")
                Swal.fire("Error!", swalTitle, "error").then((result) => {
                });
            }
        })

    };

    return (
        <div id="add-new-main-section">
            <div id="add-record-background"></div>
            <div className="set-background record-form" style={{zIndex: '100'}}>
                <img
                    src={close}
                    alt="cloase"
                    className="close-btn"
                    onClick={closePopUp(setPopupVisible)}
                />
                <p className="title-align-add-form">{title}</p>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={12}>
                        <Item>
                            <label className="label-align-add">Day</label>
                            <br/>
                            <CustomInput
                                value={date}
                                type="date"
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className='font-set'
                                onchange={handleChangeDate}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <label className="label-align-add">Note</label>
                            <br/>
                            <CustomInput
                                type="text"
                                value={note}
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                onchange={handleChangeNote}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <label className="label-align-add">From</label>
                            <br/>
                            <CustomInput
                                type="time"
                                value={fromTime}
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className='font-set'
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
                                value={toTime}
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                onchange={handleChangeToTime}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <label className="label-align-add">Remind Earlier</label>
                            <br/>
                            <CustomInput
                                type="time"
                                value={reminder}
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                onchange={handleChangeReminder}
                            />
                        </Item>
                    </Grid>
                </Grid>
                <div className="row" style={{width: "100%"}}>
                    <div className="col">
                        <CustomButton
                            type="button"
                            // reminder={reminder}
                            variant="primary"
                            radius="20"
                            size="sm"
                            className="mt-3 mb-4"
                            fontSize="17"
                            width="120"
                            onclick={handleAddData(swalTitle)}
                        >
                            {buttonName}
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
};

export default NewReminder;
