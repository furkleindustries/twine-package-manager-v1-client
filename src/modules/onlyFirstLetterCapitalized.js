export default function onlyFirstLetterCapitalized(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}