export default function unixTimeToSettingsTime(unixTimeInMs, dateStyle, timeStyle) {
    const date = new Date(unixTimeInMs);

    /* isNaN on a function result seems like the only way to assert
     * invalidity */ 
    if (Number.isNaN(date.getDay())) {
        return '';
    }

    let dateStr = '';

    if (dateStyle === 'ddmm') {
        dateStr = date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ' ';
    } else if (dateStyle === 'mmdd') {
        dateStr = (date.getMonth() + 1) + '/' +
            date.getDate() + '/' +
            date.getFullYear() + ' ';
    } else {
        return '';
    }

    let hours = date.getHours();
    let amPM = '';
    if (timeStyle === '12h') {
        if (hours === 0) {
            hours = 12;
            amPM = 'AM';
        } else if (hours < 12) {
            amPM = 'AM';
        } else {
            hours -= 12;
            amPM = 'PM';
        }
    } else if (timeStyle === '24h') {
        if (hours === 0) {
            hours = '00';
        }
    } else {
        return '';
    }

    hours = (String)(hours);

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    } else {
        minutes = (String)(minutes);
    }

    dateStr += hours + ':' + minutes + amPM;

    return dateStr;
}