import React from "react";
import Grid from "@mui/material/Grid";
import CustomButton from "../button/CustomButton";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import close from "../../assets/formImg/close.png";

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

const SendReminder = ({setPopupVisibles, upcomingEvent, time}) => {

    return (
        <>
            {time && (
                <div id="add-new-main-section">
                    <div id="add-record-background"></div>
                    <div className="set-background record-form">
                        <img
                            src={close}
                            alt="close"
                            className="close-btn"
                            onClick={closePopUp(setPopupVisibles)}
                        />
                        <p className="title-align-add-form"></p>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={12}>
                                <Item>
                                    <div style={{paddingTop: '15%'}}>
                                <span className='mt-3 mood-des mb-3'
                                      style={{fontSize: '1.5rem', marginTop: '50px'}}>
                                Upcoming Task For Mihasa
                            </span>
                                        <br/>
                                        <div className='mt-4 upcoming'>
                                            {upcomingEvent}
                                        </div>
                                        <br/>
                                        <div className='upcoming'>
                                            {time}
                                        </div>
                                        <br/>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>

                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>

                                </Item>
                            </Grid>
                            <Grid item xs={12}>
                                <Item>

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
                                >
                                    Send
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
            )}
        </>
    );
};

export default SendReminder;
