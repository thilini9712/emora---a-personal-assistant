import {useEffect, useState} from "react";

const SetTime = (props) => {
    const [clockState, setClockState] = useState();
    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div className="time-style">
            {clockState}
        </div>
    );
}

export default SetTime;