import "./Settings.css";
import React, {useEffect, useState} from "react";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import FormComponent from "../../components/form/FormComponent";
import Preferences from "../../components/preferences/Preferences";
import Password from "../../components/form/Password";
import {SettingsOutline} from "react-ionicons";
import HeadingTitle from "../../components/title/HeadingTitle";
import {getParentDetails} from "../../repository/perantRepository";
import {getChildDetails} from "../../repository/childRepository";
import {addOneParent, selectByIdParent} from "../../store/slices/parentSlice";
import {useDispatch, useSelector} from "react-redux";
import {addOneChild, selectByIdChild} from "../../store/slices/childSlice";

const Settings = (props) => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const parent = useSelector((state) => selectByIdParent(state, 1))
    const child = useSelector((state) => selectByIdChild(state, 1))
    const dispatcher = useDispatch()

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    let icon = <SettingsOutline
        color={'#4285f5'}
        title={"Settings"}
        height="20px"
        width="20px"
        style={{marginBottom: '5px'}}
    />

    useEffect(() => {
        getParentDetails(1)
            .then((res) => {
                dispatcher(addOneParent({...res.data.body}))
            })
            .catch(err => console.log(err))
    })

    useEffect(() => {
        getChildDetails(1,)
            .then((res) => {
                dispatcher(addOneChild({...res.data.body}))
            })
            .catch(err => console.log(err))
    })

    return (
        <section className="">
            <HeadingTitle title={'Settings'} icon={icon} ml={'60px'}/>
            <div className="container-fluid h-custom">
                {/*<HeadingBar/>*/}
                <div className="row d-flex justify-content-center align-items-center  m-0">
                    <div className="col-md-9   ">
                        <MDBContainer className="main-secti on">
                            {/*<h1 className="setting-heading">Settings</h1>*/}
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
                                            Child Settings
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
                                            Profile Settings
                                        </MDBTabsLink>
                                    </div>
                                </MDBTabsItem>
                            </MDBTabs>

                            <MDBTabsContent>
                                <MDBTabsPane
                                    show={justifyActive === "tab1"}
                                    className="center-title"
                                >
                                    <div className="row ">
                                        <div className="col child-settings-sections">
                                            {child != null ?
                                                <FormComponent
                                                    title="Mihasa's Profile"
                                                    firstname={child?.firstName}
                                                    lastname={child?.lastName}
                                                    address={child?.address}
                                                    contactNo={child?.emergencyContactNumber}
                                                    age={child?.age}
                                                    genders={child?.gender}
                                                    display='ture'
                                                    relDis='none'
                                                    type='child'
                                                />
                                                : child}

                                        </div>
                                        <div className="col-md child-settings-sections mobile-display" style={{width: '98%'}}>
                                            <Preferences/>
                                        </div>
                                    </div>
                                </MDBTabsPane>

                                <MDBTabsPane
                                    show={justifyActive === "tab2"}
                                    className="center-title"
                                >
                                    <div className="row w-100">
                                        <div className="col-md child-settings-sections">

                                            {parent != null ?
                                                <FormComponent
                                                    title="My Profile"
                                                    firstname={parent?.firstName}
                                                    lastname={parent?.lastName}
                                                    address={parent?.address}
                                                    contactNo={parent?.emergencyContactNumber}
                                                    age={parent?.age}
                                                    relationship={parent?.relationship}
                                                    genders={parent?.gender}
                                                    relDis='gride'
                                                    display='ture'
                                                    type='parent'
                                                />
                                                : null}

                                        </div>
                                        <div className="col-md child-settings-sections">
                                            <Password title="Change Password"/>
                                        </div>
                                    </div>
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </MDBContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Settings;
