export default function onlyFirstLetterCapitalized(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}