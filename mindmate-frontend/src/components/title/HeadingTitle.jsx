import React from "react";
import "./HeadingTitle.css"
import {ChevronForwardOutline, HelpCircleOutline} from "react-ionicons";

const HeadingTitle = ({title, icon, ml}) => {
    return (
        <>
            <div className="heading-title">
                {title}
                <span className='m-3' style={{opacity:'0.2'}} >
                   |
                </span>

                {/*<span style={{borderRight: '0.5px solid #d6dce1', marginRight: '8px'}} className='m-2'/>*/}
                <span className='m-2'>
                    {icon}
                </span>
                <ChevronForwardOutline
                    color={'rgba(110,107,123,0.22)'}
                    height="15px"
                    width="15px"
                    style={{marginBottom: '5px'}}
                    className='m-2'
                />
                <span className='subtitle-name'>
                   {title}
                </span>
                <HelpCircleOutline
                    color={'#4285f5'}
                    title={"Help"}
                    height="20px"
                    width="20px"
                    style={{marginBottom: '4px',marginLeft:ml}}
                    className='m-2'
                />
            </div>
        </>
    );
}

export default HeadingTitle;