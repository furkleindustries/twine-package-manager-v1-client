export default function unixTimeToSettingsTime(unixTimeInMs, dateStyle, timeStyle) {
	const date = new Date(unixTimeInMs);
	let dateStr = '';
	if (date) {
		if (dateStyle === 'ddmm') {
			dateStr = date.getDate() + '/' +
				(date.getMonth() + 1) + '/' +
				date.getFullYear() + ' ';
		} else {
			dateStr = (date.getMonth() + 1) + '/' +
				date.getDate() + '/' +
				date.getFullYear() + ' ';
		}

		let hours = date.getHours();
		let amPM = '';
		if (timeStyle === '12h') {
			if (hours === 0) {
				hours = 12;
			}

			if (hours < 12) {
				amPM = 'AM';
			} else if (hours > 12) {
				hours -= 12;
				amPM = 'PM';
			}
		} else {
			if (hours === 0) {
				hours = '00';
			}
		}

		hours = (String)(hours);

		let minutes = date.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes;
		} else {
			minutes = (String)(minutes);
		}

		dateStr += hours + ':' + minutes + amPM;
	}

	return dateStr;
}