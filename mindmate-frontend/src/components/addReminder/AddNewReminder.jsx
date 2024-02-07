import Grid from "@mui/material/Grid";
import CustomInput from "../inputField/InputField";
import CustomButton from "../button/CustomButton";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import close from "../../assets/formImg/close.png";
import Swal from "sweetalert2";
import React, {useState} from "react";
import {addSchedulerTask} from "../../repository/schedulerRepository";
import {convert12HourTo24HourwithSecond} from "../../function/function";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const closePopUp = (setPopupVisibles) => (event) => {
    setPopupVisibles(false);
};

const AddNewReminder = ({setPopupVisibles, dates}) => {

    const [notes, setNotes] = useState("");
    const [date, setDate] = useState(dates);
    const [fromTime, setFromTime] = useState("::");
    const [toTime, setToTime] = useState("::");
    const [reminder, setReminder] = useState("::");

    const handleChangeNotes = (event) => {
        setNotes(event.target.value);
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
        id: 1,
        date: date,
        note: notes,
        remindTime: convert12HourTo24HourwithSecond(reminder),
        fromTime: convert12HourTo24HourwithSecond(fromTime),
        toTime: convert12HourTo24HourwithSecond(toTime)
    }

    function handleAddData() {
        addSchedulerTask(1, schedulerDetails)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.success) {
                        Swal.fire(
                            'Succuss!',
                            'Recode has been Added.',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload(true);
                            }
                        })
                    } else {
                        Swal.fire(
                            'Error!',
                            'Recode can not be add.',
                            'error'
                        )
                    }
                } else {
                    Swal.fire(
                        'Error!',
                        'Recode can not be add.',
                        'error'
                    )
                }
            })

    }

    return (
        <div id="add-new-main-section">
            <div id="add-record-background"></div>
            <div className="set-background record-form" style={{zIndex: '100'}}>
                <img
                    src={close}
                    alt="cloase"
                    className="close-btn"
                    onClick={closePopUp(setPopupVisibles)}
                />
                <p className="title-align-add-form">Add New Reminder</p>
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
                                value={notes}
                                size="20"
                                radius="10"
                                width="100%"
                                fontSize="17"
                                className="font-set"
                                onchange={handleChangeNotes}
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
                            variant="primary"
                            radius="20"
                            size="sm"
                            className="mt-3 mb-4"
                            fontSize="17"
                            width="120"
                            onclick={handleAddData}
                        >
                            Add
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
                            onclick={closePopUp(setPopupVisibles)}
                        >
                            Cancel
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewReminder;
