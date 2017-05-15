export default function deepCopy(source) {
	if (typeof source === 'object') {
		return JSON.parse(JSON.stringify(source));
	} else if (typeof source === 'string' || typeof source === 'number') {
		return source;
	} else {
        throw new Error('Invalid type passed to deepCopy.');
    }
}