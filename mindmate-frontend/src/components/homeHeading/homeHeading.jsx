import WishPerTime from "./WishPerTime";
import "./HomeHeading.css"
import SetDate from "./SetDate";
import SetTime from "./SetTime";
import Grid from "@mui/material/Grid";


const HomeHeading = (props) => {
    return (
        <div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div className="name-div">
                        <span className="name-subtitle">
                            Hi Mihiri !
                        </span>
                        <WishPerTime className='wishPerTime'/>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="name-div">
                        <span className="name-subtitle">
                            <SetDate/>
                        </span>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="name-div">
                        <span className="name-subtitle">
                            <SetTime/>
                        </span>
                    </div>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>





        </div>
    );
}

export default HomeHeading;