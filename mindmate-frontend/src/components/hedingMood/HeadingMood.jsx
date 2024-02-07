import "./HeadingMood.css"
import angry from "../../assets/faceIcon/angry.svg"
import disgusted from "../../assets/faceIcon/disgusted.svg"
import fear from "../../assets/faceIcon/fear.svg"
import sad from "../../assets/faceIcon/sad.svg"
import neutral from "../../assets/faceIcon/neutral.svg"
import surprised from "../../assets/faceIcon/surprised.svg"
import happy from "../../assets/faceIcon/happy.svg"

const HeadingMood = ({display}) => {
    return (
        <>
            <div style={{width: "91%", marginLeft:"10px"}}>
                <div className='emotion-chart-background' style={{display: display, padding:"30px"}}>
                    <div className="row">
                        <div className="col">
                            <img src={angry} alt="angry" className="moodSize"/>
                            <span className="mood-number">
                               - 1
                            </span>
                        </div>
                        <div className="col">
                            <img src={disgusted} alt="disgusted" className="moodSize"/>
                            <span className="mood-number">
                               - 2
                            </span>
                        </div>
                        <div className="col">
                            <img src={fear} alt="fear" className="moodSize"/>
                            <span className="mood-number">
                               - 3
                            </span>
                        </div>
                        <div className="col">
                            <img src={sad} alt="sad" className="moodSize"/>
                            <span className="mood-number">
                               - 4
                            </span>
                        </div>
                        <div className="col">
                            <img src={neutral} alt="neutral" className="moodSize"/>
                            <span className="mood-number">
                               - 5
                            </span>
                        </div>
                        <div className="col">
                            <img src={surprised} alt="surprised" className="moodSize"/>
                            <span className="mood-number">
                               - 6
                            </span>
                        </div>
                        <div className="col">
                            <img src={happy} alt="happy" className="moodSize"/>
                            <span className="mood-number">
                               - 7
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeadingMood;