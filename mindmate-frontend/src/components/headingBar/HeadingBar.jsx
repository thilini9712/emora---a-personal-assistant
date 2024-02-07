import pic from '../../assets/profilePic/DrMihir.jpg'
import './HeadingBar.css'
import Grid from "@mui/material/Grid";
import SetDate from "../homeHeading/SetDate";
import WishPerTime from "../homeHeading/WishPerTime";
import React from "react";
import robotAnimate from "../../assets/robotPicture/animate-robot.gif"
const HeadingBar = (props) => {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={9} md={11} xl={11}>
                    <div className = 'heading-bar'>
                        <div className = 'row'>
                            <div className="col">
                                <SetDate/>
                            </div>
                            <div className = 'col ms-5 display-set'>
                                <div className="row">
                                    <div className='col-4'>
                                       <div className='Emora-name'>
                                        Emora
                                    </div>
                                    </div>
                                    <div className='col-8 text-sm-start'>
                                     <img src={robotAnimate} alt='Animate Robot' width='120px' height='80px'/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <WishPerTime/>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} md={1} xl={1}>
                    <img src={pic} alt="ProfilePic" className='profile-pic-img'/>
                </Grid>
            </Grid>
        </div>
    );
}

export default HeadingBar;