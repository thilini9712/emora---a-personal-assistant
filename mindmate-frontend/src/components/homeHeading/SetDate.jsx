import SetTime from "./SetTime";
import "./HomeHeading.css"

const SetDate = (props) => {
    const date = new Date();
    let m = date.getMonth();
    var b = "";
    var c = "";

    // eslint-disable-next-line default-case
    switch(m){
        case 0: b = "January";
            break;
        case 1: b = "February";
            break;
        case 2: b = "March";
            break;
        case 3: b = "April";
            break;
        case 4: b = "May";
            break;
        case 5: b = "June";
            break;
        case 6: b = "July";
            break;
        case 7: b = "August";
            break;
        case 8: b = "September";
            break;
        case 9: b = "October";
            break;
        case 10: b = "November";
            break;
        case 11: b = "December";
            break;
    }

    let d = date.getDay()
    // eslint-disable-next-line default-case
    switch(d){
        case 1: c = "Monday";
            break;
        case 2: c = "Tuesday";
            break;
        case 3: c = "Wednesday";
            break;
        case 4: c = "Thursday";
            break;
        case 5: c = "Friday";
            break;
        case 6: c = "Saturday";
            break;
        case 7: c = "Sunday";
            break;
    }

    let day = date.getDate();
    let year = date.getFullYear();
    return (
        <div className='date-time'>
            <SetTime/>
            {c}
            <br/>
            {b + " " + day + "," + year}

        </div>
    );
}

export default SetDate;