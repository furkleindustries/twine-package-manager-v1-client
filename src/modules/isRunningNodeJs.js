export default function isRunningNodeJs() {
    return typeof process === 'object' && process + '' === '[object process]';
}