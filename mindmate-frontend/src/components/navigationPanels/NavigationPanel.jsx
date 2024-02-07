import React from "react";
import {Link} from "react-router-dom";
import {NavigationPanelData} from "./NaigationPanelData";
import "./NavigationPanel.css";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useLocation} from "react-router";
import emora from "../../assets/logo/EmoraNew.png";
import {LogOutOutline} from 'react-ionicons'

const NavigationPanel = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({theme}) => ({
        border: `none`,
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary {...props} />
    ))(({theme}) => ({
        backgroundColor: "#1e5d88",
        color: "white",
        textAlign: "center",
        marginTop: "20%",
        "& .MuiAccordionSummary-expandIconWrapper": {
            color: "white",
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(180deg)",
        },
    }));

    function handleSignOutClick() {
        localStorage.removeItem("loggedUserToken");
        window.location.reload(true);
    }

    return (
        <>
            <div className="side-bar">
                <div className="logo-name">
                    <img src={emora} alt="Mindmate" width={120}/>
                </div>
                <div className="navigation-item-list">
                    {NavigationPanelData.map((item) => (
                        <Accordion className="accordion-div" key={item.path}>
                            <AccordionSummary
                                expandIcon={
                                    item.subItems.length === 0 ? null : <ExpandMoreIcon/>
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className="hover-icon"
                            >
                                <Grid
                                    container
                                    spacing={0}
                                    className="navigation-item align-icons"
                                >
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={9} style={{padding: "5px"}}>
                                        <Link
                                            to={item.path}
                                            className={
                                                currentPath.endsWith(item.path)
                                                    ? "navigation-item-link active"
                                                    : "navigation-item-link"
                                            }
                                        >
                                            <span>{currentPath.endsWith(item.path) ? item.iconActive : item.icon}</span>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                        </Accordion>
                    ))}
                </div>
            </div>
            <span style={{textDecoration: "none", cursor: "pointer"}} onClick={handleSignOutClick}>

                <span className="sign-out-btn">
                    <LogOutOutline
                        color={'#ffffff'}
                        height="40px"
                        width="40px"
                    />
                    <br/>
                    Sign Out</span>

            </span>
        </>
    );
}

export default NavigationPanel;
