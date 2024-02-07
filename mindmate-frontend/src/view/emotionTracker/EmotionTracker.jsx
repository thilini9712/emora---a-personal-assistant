import LiveChart from "../../components/chart/LiveChart";
import "./EmotionTracker.css"
import EmotionFaceSection from "../../components/emotionFaces/EmotionFaceSection";
import happy from '../../assets/faceIcon/fear.svg';
import {FitnessOutline} from "react-ionicons";
import HeadingTitle from "../../components/title/HeadingTitle";
import HeadingMood from "../../components/hedingMood/HeadingMood";

const EmotionTracker = (props) => {
    let icon = <FitnessOutline
        color={'#4285f5'}
        title={"Scheduler"}
        height="20px"
        width="20px"
        style={{marginBottom: '5px'}}
    />
    return (
        <div className="">
            <HeadingTitle title={'EmotionTracker'} icon={icon} ml={'90px'} className='emo-help'/>
            <div className="container-fluid h-custom">
                <div className="row d-flex   m-0">
                    <div className="col-md-4 emotion-display">
                        <EmotionFaceSection face={happy} mood='Happy'/>
                    </div>
                    <div className="col-md-7 graph-border">
                        <div className="moodheding-display">
                            <HeadingMood/>
                        </div>

                        <LiveChart width='700' height='400' title='Her Past Emotion Changing Pattern' marginTop='10px'/>
                    </div>
                    <div className="col-md-4 emotion-display-2" style={{width: '35%'}}>
                        <EmotionFaceSection face={happy} mood='Happy'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmotionTracker;
