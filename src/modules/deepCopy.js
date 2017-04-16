export default function deepCopy(source) {
	if (typeof(source) === 'object') {
		return JSON.parse(JSON.stringify(source));
	} else {
		return source;
	}
}