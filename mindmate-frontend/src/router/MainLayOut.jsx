import {Outlet} from "react-router-dom";
import './router.css'
import NavigationPanel from "../components/navigationPanels/NavigationPanel";
import NavigationPanelMobile from "../components/navigationPanels/NavigationPanelMobile";
import Grid from "@mui/material/Grid";
import HeadingBar from "../components/headingBar/HeadingBar";

const MainLayout = (props) => {
    // const {sideNavVisibility, setSideNavVisibility, matchesMedia768} = useContext(controlActivity)

    return (
        <>
            <Grid container>
                <Grid item xl={1} md={1.5} sm={0} xs={1}  className='background-color'>
                    <div className='NavDesktopDisplay'>
                        <NavigationPanel/>
                    </div>
                    <div className='NavMobileDisplay'>
                        <NavigationPanelMobile/>
                    </div>
                </Grid>
                <Grid item xl={11} md={10} sm={12}  xs={12} sx={{textAlign: 'center', justifyContent: 'center'}}>
                    <div className="heading-style">
                        <HeadingBar/>
                    </div>
                    <div className="center-div">
                        <Outlet/>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default MainLayout;