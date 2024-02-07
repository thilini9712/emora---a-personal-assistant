import "./Preparances.css";
import React, {useState} from "react";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import happy from '../../assets/faceIcon/happy.svg'
import fear from '../../assets/faceIcon/fear.svg'
import angry from '../../assets/faceIcon/angry.svg'
import sad from '../../assets/faceIcon/sad.svg'
import disgusted from '../../assets/faceIcon/disgusted.svg'
import neutral from '../../assets/faceIcon/neutral.svg'
import surprised from '../../assets/faceIcon/surprised.svg'
import GoogleDriverPickerComponent from "../googleDriver/GoogleDriverPickerComponent";

const Preferences = (props) => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    // const [pictures, setPictures] = useState([]);
    // const [picturesBase64, setPicturesBase64] = useState([]);
    //
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    // const handleImageChange = (event) => {
    //     let image = event.target.files[0];
    //     let url = URL.createObjectURL(image);
    //     let items = [];
    //     let itemsBase64 = [];
    //     // {
    //     //     pictures.map((item) => items.push(item));
    //     //     picturesBase64.map((item) => itemsBase64.push(item));
    //     // }
    //     items.push(url);
    //     getBase64(image).then((data) => itemsBase64.push(data));
    //     setPictures(items);
    //     setPicturesBase64(itemsBase64);
    // };

    // function getBase64(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });
    // }

    return (
        <>
            <div>
                <p className="title-align-preferences title-align">Her Preferences</p>
                <p className="description-para">
                    We need some resources to use for Mihasa when <br className='dis-br'/>
                    she is in different moods
                </p>
            </div>
            <MDBContainer className="border-refs">
                <MDBTabs
                    pills
                    justify
                    className="mb-3 d-flex flex-row justify-content-between"
                >
                    <MDBTabsItem>
                        <div className="student-btn">
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab1")}
                                active={justifyActive === "tab1"}
                                className="selector-btn pre-selection-btn preferences-btn"
                            >
                                <img src={happy} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab2")}
                                active={justifyActive === "tab2"}
                                className="selector-btn pre-selection-btn pre-btn-bord"
                            >
                                <img src={surprised} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab3")}
                                active={justifyActive === "tab3"}
                                className="selector-btn pre-selection-btn pre-btn-bord"
                            >
                                <img src={sad} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab4")}
                                active={justifyActive === "tab4"}
                                className="selector-btn pre-selection-btn pre-btn-bord"
                            >
                                <img src={fear} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab5")}
                                active={justifyActive === "tab5"}
                                className="selector-btn pre-selection-btn pre-btn-bord"
                            >
                                <img src={angry} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab6")}
                                active={justifyActive === "tab6"}
                                className="selector-btn pre-selection-btn pre-btn-bord"
                            >
                                <img src={disgusted} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <div>
                            <MDBTabsLink
                                onClick={() => handleJustifyClick("tab7")}
                                active={justifyActive === "tab7"}
                                className="selector-btn pre-selection-btn preferences-btn-right"
                            >
                                <img src={neutral} alt='HappyMode' width='30' className='icon-img-repons'/>
                            </MDBTabsLink>
                        </div>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={justifyActive === "tab1"} className="center-title">
                        <GoogleDriverPickerComponent/>
                        {/*<div>*/}
                        {/*    <Button*/}
                        {/*        variant="primary"*/}
                        {/*        component="label"*/}
                        {/*        className="upload-btn"*/}
                        {/*        sx={{*/}
                        {/*            fontSize: "20px",*/}
                        {/*            textDecoration: "none",*/}
                        {/*            textTransform: "none",*/}
                        {/*            backgroundColor: "#171742",*/}
                        {/*            color: "#ffffff",*/}
                        {/*            borderRadius: "20px",*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        Upload New Resource*/}
                        {/*        <input*/}
                        {/*            hidden*/}
                        {/*            accept="image/jpeg"*/}
                        {/*            multiple*/}
                        {/*            type="file"*/}
                        {/*            onChange={handleImageChange}*/}
                        {/*        />*/}
                        {/*    </Button>*/}
                        {/*    <ImageList*/}
                        {/*        sx={{m: "2%", width: "96%", height: 450}}*/}
                        {/*        cols={3}*/}
                        {/*        rowHeight={3}*/}
                        {/*    >*/}
                        {/*        {pictures.map((item) => (*/}
                        {/*            <ImageListItem>*/}
                        {/*                <img*/}
                        {/*                    src={item}*/}
                        {/*                    alt="location attraction picture"*/}
                        {/*                    loading="lazy"*/}
                        {/*                />*/}
                        {/*            </ImageListItem>*/}
                        {/*        ))}*/}
                        {/*    </ImageList>*/}
                        {/*</div>*/}
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab2"} className="center-title">
                        Surprised
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab3"} className="center-title">
                        Sad
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab4"} className="center-title">
                        Fear
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab5"} className="center-title">
                        Anger
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab6"} className="center-title">
                        Disgust
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab7"} className="center-title">
                        Neutral
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </>
    );
};

export default Preferences;
