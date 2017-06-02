import getNodeEnv from './getNodeEnv';

export default async function registerServiceWorker() {
    if (getNodeEnv() === 'production' &&
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator)
    {
        navigator.serviceWorker
            .register('service-worker.js', { scope: './', })
            .then(swRegistrySucceed)
            .catch(swRegistryFail);
    }
}

function swRegistrySucceed(reg) {
    reg.onupdatefound = function() {
        const installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
            if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                    console.log('New or updated content is available.');
                } else {
                    console.log('Content is now available offline!');
                }
            } else if (installingWorker.state === 'redundant') {
                console.log('The installing serviceWorker became redundant.');
            }
        };
    };
}

function swRegistryFail(e) {
    console.error('Error during service worker registration:', e);
}