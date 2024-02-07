import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {MNavigationPanelData} from "./NaigationPanelData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useLocation} from "react-router";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import {Link} from "react-router-dom";
import "./navmobile.css";

const NavigationPanelMobile = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary {...props} />
    ))(({theme}) => ({
        backgroundColor: "#1e5d88",
        color: "white",
        textAlign: "center",
        marginTop: "10%",
        "& .MuiAccordionSummary-expandIconWrapper": {
            color: "white",
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(180deg)",
        },
    }));

    return (
        <Box sx={{flexGrow: 1}} className="mobile-nav-main">
            <div className="row mobile-row">
                {MNavigationPanelData.map((item) => (
                    <div className="col  m-navigation-item-link" key={item.path}>
                        <AccordionSummary
                            expandIcon={
                                item.subItems.length === 0 ? null : <ExpandMoreIcon/>
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="hover-icon"
                        >
                            <Link
                                to={item.path}
                                className={
                                    currentPath.endsWith(item.path)
                                        ? "navigation-item-link active"
                                        : "navigation-item-link"
                                }
                            >
                <span>
                  {currentPath.endsWith(item.path)
                      ? item.iconActive
                      : item.icon}
                    <div className="icon-title" style={{fontSize:'10px', marginTop:'5px',color:item.color}}>{item.title}</div>
                    {/*{item.iconVisibility ? item.icon : null}*/}
                </span>
                            </Link>
                        </AccordionSummary>
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default NavigationPanelMobile;
