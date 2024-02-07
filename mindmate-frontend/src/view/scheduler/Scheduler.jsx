import {MDBContainer, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane} from "mdb-react-ui-kit";
import React, {useState} from "react";
import DailyTimetable from "../../components/dailyTimetable/DailyTimetable";
import "./Scheduler.css"
import SchedulerTimetable from "../../components/schedulerTimetable/SchedulerTimetable";
import {CalendarOutline} from "react-ionicons";
import HeadingTitle from "../../components/title/HeadingTitle";

const Scheduler = (props) => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    // style={{marginTop:'5%'}}
    let icon = <CalendarOutline
        color={'#4285f5'}
        title={"Scheduler"}
        height="20px"
        width="20px"
        style={{marginBottom: '5px'}}
    />
    return (
        <section className="">
            <HeadingTitle title={'Scheduler'} icon={icon} ml={'70px'}/>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100 m-0">
                    <div className="col-md-9 ">
                        {/*col-lg-6 col-xl-5*/}
                        <MDBContainer className="main-section ">
                            {/*<h1 className="setting-heading">Scheduler</h1>*/}

                            <MDBTabs
                                pills
                                justify
                                className="mb-3 d-flex flex-row justify-content-between btn-width"
                            >
                                <MDBTabsItem>
                                    <div className="student-btn">
                                        <MDBTabsLink
                                            onClick={() => handleJustifyClick("tab1")}
                                            active={justifyActive === "tab1"}
                                            className="selector-btn selection-btn student-btn"
                                        >
                                            Daily Timetable
                                        </MDBTabsLink>
                                    </div>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <div>
                                        <MDBTabsLink
                                            onClick={() => handleJustifyClick("tab2")}
                                            active={justifyActive === "tab2"}
                                            className="selector-btn selection-btn parant-btn"
                                        >
                                            Task Scheduling
                                        </MDBTabsLink>
                                    </div>
                                </MDBTabsItem>
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane
                                    show={justifyActive === "tab1"}
                                    className="center-title h-100 schedule-calender-side"
                                >
                                    <div className="row w-100">
                                        <DailyTimetable/>
                                    </div>
                                </MDBTabsPane>

                                <MDBTabsPane
                                    show={justifyActive === "tab2"}
                                    className="center-title"
                                >
                                    <SchedulerTimetable/>
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Scheduler;