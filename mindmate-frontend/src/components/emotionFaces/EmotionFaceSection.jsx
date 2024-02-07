import CustomButton from "../button/CustomButton";
import "./EmotionFaceSection.css"
import LiveChartNew from "../LiveChart/LiveChart";
import React, {useState} from "react";
import SendRespond from "../sendRespond/SendRespond";


const EmotionFaceSection = ({face, mood}) => {
    const [popupVisible, setPopupVisible] = useState(false);

    const handleRespondPopUp = (value) => {
        setPopupVisible(!popupVisible);
    };

    return (
        <div className=''>
            <LiveChartNew displays="none"/>
            <br/>
            <CustomButton
                type="button"
                variant="history"
                radius="20"
                size="sm"
                className="chart-btn-responsive me-0"
                fontSize="18"
                width="180"
                onclick={handleRespondPopUp}
            >
                Respond to Her
            </CustomButton>
            <div className="response-div">
                <p style={{textAlign:'justify'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,

                </p>
            </div>
            {popupVisible && (
                <SendRespond
                    setPopupVisible={setPopupVisible}
                />
            )}
        </div>
    );
}

export default EmotionFaceSection;