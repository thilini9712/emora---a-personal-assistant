import React from "react";
import fear from '../../assets/faceIcon/fear.svg'
import sad from '../../assets/faceIcon/sad.svg'
import angry from '../../assets/faceIcon/angry.svg'
import happy from '../../assets/faceIcon/happy.svg'
import disgusted from '../../assets/faceIcon/disgusted.svg'
import neutral from '../../assets/faceIcon/neutral.svg'
import surprised from '../../assets/faceIcon/surprised.svg'


const images = [
    angry,
    disgusted,
    fear,
    sad,
    neutral,
    surprised,
    happy,
]
const HomeMood = ({moodId, display, loading}) => {
    const mood = ["angry", "disgusted", "fear", "sad", "neutral", "surprised", "happy"];
    let moodDescription = "Mihasa is Now in a " + mood[moodId - 1] + " Mood"

    let im = images[moodId - 1];

    return (
        <>
            <div style={{display: display}}>
                <img src={im} alt='mood' className='mood-section'/>
                <br/>
                <span className='mt-3 mood-des'>
                {moodDescription}
            </span>
            </div>
        </>
    );
};

export default HomeMood;