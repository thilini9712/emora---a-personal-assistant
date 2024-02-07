// convert 12 hour time to 24hour with added second
function convert12HourTo24HourwithSecond(time12h) {
    const [time, period] = time12h.split(' ');
    const [seconds] = time.split(':');
    const [hours, minutes] = time.split(':');
    let hours24h = parseInt(hours, 10);
    if (period === 'PM' && hours24h !== 12) {
        hours24h += 12;
    } else if (period === 'AM' && hours24h === 12) {
        hours24h = 0;
    }
    const hours24hString = hours24h.toString().padStart(2, '0');
    const minutesString = minutes.padStart(2, '0');
    const secondsString = seconds ? seconds : '00';

    return `${hours24hString}:${minutesString}:${secondsString}`;
}

// convert 12 hour time to 24hour
function convert12HourTo24Hour(time12h) {
    const [time, period] = time12h.split(' ');
    const [hours, minutes] = time.split(':');
    let hours24h = parseInt(hours, 10);
    if (period === 'PM' && hours24h !== 12) {
        hours24h += 12;
    } else if (period === 'AM' && hours24h === 12) {
        hours24h = 0;
    }
    const hours24hString = hours24h.toString().padStart(2, '0');
    const minutesString = minutes.padStart(2, '0');
    return `${hours24hString}:${minutesString}`;
}

// Sun Oct 01 2023 00:00:00 GMT+0530 convert 2023-10-01 like this
function convertFullDate(date) {
    const inputDate = new Date(date);
    inputDate.setDate(inputDate.getDate());
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return (`${year}-${month}-${day}`);
}

//Get localTime
function getLocalTime(dateTime) {
    // eslint-disable-next-line no-unused-vars
    const [date, time] = dateTime.split('T');
    const [hours, minutes] = time.split(':')
    let hour = 0;
    let period = "AM";
    if(hours>12){
        hour = hours-12;
        period = "PM";
    }else{
        hour = hours;
        period = "AM";
    }
    return (`${hour}:${minutes} ${period}`)
}

export {
    convert12HourTo24HourwithSecond,
    convert12HourTo24Hour,
    convertFullDate,
    getLocalTime
}