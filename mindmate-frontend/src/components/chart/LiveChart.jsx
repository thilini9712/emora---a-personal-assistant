import "./LiveChart.css";
import CustomButton from "../button/CustomButton";
import Grid from "@mui/material/Grid";
import LiveChartNew from "../LiveChart/LiveChart";

const LiveChart = ({title, width, height, display, marginTop}) => {
    return (
        <>
            <div className="checking-pattern-btn-set">
                <div className='emotion-chart-background mobile-display' style={{display: display,}}>
                    <p className="btn-title ">
                        {title}
                    </p>
                    <Grid container spacing={2} sx={{marginBottom: '20px'}}>
                        <Grid item xs={12} md={8} sx={{textAlign: 'left'}} className='grid-btn-set mobile-display'>
                            <CustomButton
                                type="button"
                                variant="active"
                                border='active'
                                radius="20"
                                size="sm"
                                className="chart-btn-responsive chart-responsive-btn-size"
                                fontSize="18"
                                width="130"
                                display={display}
                            >
                                Day
                            </CustomButton>
                            <CustomButton
                                type="button"
                                variant="active"
                                radius="20"
                                size="sm"
                                className="chart-btn-responsive chart-responsive-btn-size"
                                fontSize="18"
                                width="150"
                                display={display}
                            >
                                3 Days
                            </CustomButton>
                            <CustomButton
                                type="button"
                                variant="active"
                                radius="20"
                                size="sm"
                                className="chart-btn-responsive chart-responsive-btn-size"
                                fontSize="18"
                                width="150"
                                display={display}
                            >
                                Week
                            </CustomButton>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{textAlign: 'right'}} className='history-grid'>
                            <CustomButton
                                type="button"
                                variant="active"
                                radius="20"
                                size="sm"
                                className="chart-btn-responsive history-btn-style display-his-btn me-0"
                                fontSize="18"
                                width="180"
                                display={display}
                            >
                                Check History
                            </CustomButton>
                        </Grid>
                    </Grid>
                </div>

                {/*</div>*/}
                {/*sx={{border: '1px solid #1E5D88'}}*/}
                <div className="chart-border margine-bottm-res" style={{marginTop: marginTop}}>
                    <LiveChartNew displaying="none"/>
                </div>
                <Grid item xs={12} md={4} sx={{textAlign: 'right'}} className='history-grid'>
                    <CustomButton
                        type="button"
                        variant="active"
                        radius="20"
                        size="sm"
                        className="chart-btn-responsive history-btn-style display-his-btn-2  me-0"
                        fontSize="18"
                        width="180"
                    >
                        Check History
                    </CustomButton>
                </Grid>
            </div>
        </>

    );
}
export default LiveChart;
