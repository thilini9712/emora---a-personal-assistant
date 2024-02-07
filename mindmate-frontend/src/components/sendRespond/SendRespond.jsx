import "./SendRespond.css"
import close from "../../assets/formImg/close.png";
import Grid from "@mui/material/Grid";
import CustomInput from "../inputField/InputField";
import CustomButton from "../button/CustomButton";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {MDBContainer, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane} from "mdb-react-ui-kit";
import {postResponse} from "../../repository/emotionRepository";
import Swal from "sweetalert2";

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

const SendRespond = ({setPopupVisible}) => {
    const [justifyActive, setJustifyActive] = useState("PHOTO");
    // const [content, setContent] = useState("")
    const [value, setValue] = React.useState();
    const [message, setMessage] = useState("");

    let id;
    let content;
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    }

    const handleChangeMessage = (event) => {
        setMessage(event.target.value);
    }
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }


    if (value === undefined) {
        id = 0
    } else {
        const array = value.match(/[a-zA-Z]+|[0-9]+/g)
        id = array[1]
    }
    console.log(id)
    console.log("valuev",value)


    if (value === "msg0") {
        content = message;
    } else {
        content = value;
    }
    if (id === undefined) {
        id = 0;
    }

    const response = {
        "type": justifyActive,
        "content": content,
        "id": id
    }

    console.log(response)
    function handleSendResponse() {
        Swal.fire({
            title: 'Do you want send response?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Send',
            denyButtonText: `Don't send`,
        }).then((result) => {
            if (result.isConfirmed) {
                postResponse(response).then((res) => {
                    if (res.status===200){
                        console.log("send")
                    } else {
                        Swal.fire(
                            'Failed',
                            'error'
                        )
                    }
                })
                Swal.fire('Response send Successful!', 'Updated data', 'success').then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true);
                    }
                })
            }
        })

    }


    return (
        <>
            <div id="add-new-main-section">
                <div id="add-record-background"></div>
                <div className="set-background record-form">
                    <img
                        src={close}
                        alt="close"
                        className="close-btn"
                        onClick={closePopUp(setPopupVisible)}
                    />
                    <p className="title-align-add-form">Response</p>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                            <MDBContainer className="main-secti on">
                                {/*<h1 className="setting-heading">Settings</h1>*/}
                                <MDBTabs
                                    pills
                                    justify
                                    className="mb-3 d-flex flex-row justify-content-between typeSelector-width"
                                >
                                    <MDBTabsItem>
                                        <div className="">
                                            <MDBTabsLink
                                                onClick={() => handleJustifyClick("PHOTO")}
                                                active={justifyActive === "PHOTO"}
                                                className="selector-btn selection-btn typeSelector"
                                            >
                                                Image
                                            </MDBTabsLink>
                                        </div>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <div>
                                            <MDBTabsLink
                                                onClick={() => handleJustifyClick("VOICE")}
                                                active={justifyActive === "VOICE"}
                                                className="selector-btn selection-btn typeSelector"
                                            >
                                                Audio
                                            </MDBTabsLink>
                                        </div>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <div>
                                            <MDBTabsLink
                                                onClick={() => handleJustifyClick("VIDEO")}
                                                active={justifyActive === "VIDEO"}
                                                className="selector-btn selection-btn typeSelector"
                                            >
                                                Video
                                            </MDBTabsLink>
                                        </div>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <div>
                                            <MDBTabsLink
                                                onClick={() => handleJustifyClick("TEXT")}
                                                active={justifyActive === "TEXT"}
                                                className="selector-btn selection-btn typeSelector"
                                            >
                                                Text
                                            </MDBTabsLink>
                                        </div>
                                    </MDBTabsItem>
                                </MDBTabs>
                                <MDBTabsContent>
                                    <MDBTabsPane
                                        show={justifyActive === "PHOTO"}
                                        className="center-title"
                                    >
                                        <div className="row ">
                                            <Item>
                                                <div>
                                                    <div className="form-check" onChange={handleChangeType}>
                                                        <div className="label-radio">
                                                            <input className="form-check-input" type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios1" value="image1"/>
                                                            <label className="form-check-label label-padding">
                                                                Image 1
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="image2"/>
                                                            <label className="form-check-label label-padding">
                                                                Image 2
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="image3"/>
                                                            <label className="form-check-label label-padding">
                                                                Image 3
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </div>
                                    </MDBTabsPane>

                                    <MDBTabsPane
                                        show={justifyActive === "VOICE"}
                                        className="center-title"
                                    >
                                        <div className="row w-100">
                                            <Item>
                                                <div>
                                                    <div className="form-check" onChange={handleChangeType}>
                                                        <div className="label-radio">
                                                            <input className="form-check-input" type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios1" value="audio1"/>
                                                            <label className="form-check-label label-padding">
                                                                Audio 1
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="audio2"/>
                                                            <label className="form-check-label label-padding">
                                                                Audio 2
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="audio3"/>
                                                            <label className="form-check-label label-padding">
                                                                Audio 3
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </div>
                                    </MDBTabsPane>
                                    <MDBTabsPane
                                        show={justifyActive === "VIDEO"}
                                        className="center-title"
                                    >
                                        <div className="row w-100">
                                            <Item>
                                                <div>
                                                    <div className="form-check" onChange={handleChangeType}>
                                                        <div className="label-radio">
                                                            <input className="form-check-input" type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios1" value="video1"/>
                                                            <label className="form-check-label label-padding">
                                                                Video 1
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="video2"/>
                                                            <label className="form-check-label label-padding">
                                                                Video 2
                                                            </label>
                                                        </div>
                                                        <div className="label-radio">
                                                            <input className="form-check-input " type="radio"
                                                                   name="exampleRadios"
                                                                   id="exampleRadios2" value="video3"/>
                                                            <label className="form-check-label label-padding">
                                                                Video 3
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Item>
                                        </div>
                                    </MDBTabsPane>
                                    <MDBTabsPane
                                        show={justifyActive === "TEXT"}
                                        className="center-title"
                                    >
                                        <div className="row w-100">
                                            <Item>
                                                <div className="form-check" onChange={handleChangeType}>
                                                    <div className="label-radio">
                                                        <input className="form-check-input " type="radio"
                                                               name="exampleRadios"
                                                               id="exampleRadios2" value="msg0"/>
                                                        <label className="form-check-label label-padding">
                                                            Text
                                                        </label>
                                                    </div>
                                                </div>
                                                    <Grid item xs={12}>
                                                        <Item>
                                                            <label className="label-align-add">Massage</label>
                                                            <br/>
                                                            <CustomInput
                                                                type="text"
                                                                size="20"
                                                                radius="10"
                                                                width="100%"
                                                                fontSize="17"
                                                                className="font-set"
                                                                onchange={handleChangeMessage}
                                                            />
                                                        </Item>
                                                    </Grid>
                                            </Item>
                                        </div>
                                    </MDBTabsPane>
                                </MDBTabsContent>
                            </MDBContainer>

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
                                onclick={handleSendResponse}
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
                                onclick={closePopUp(setPopupVisible)}
                            >
                                Cancel
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendRespond;