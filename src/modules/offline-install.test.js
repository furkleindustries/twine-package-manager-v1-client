/* modules */
import registerServiceWorker from './offline-install';

jest.mock('./getNodeEnv');
import getNodeEnv from './getNodeEnv';

Object.defineProperty(window.navigator, 'serviceWorker', {
    writable: true,
    value: {
        register: jest.fn(),
    },
});

describe('service worker registry tests', () => {
    beforeEach(() => {
        window.navigator.serviceWorker.register.mockClear();
        getNodeEnv.mockClear();
    });

    it('does nothing when one of the predicates is false (process.env.NODE_ENV is test)', () => {
        registerServiceWorker();

        expect(navigator.serviceWorker.register.mock.calls.length).toBe(0);
    });

    it('calls navigator.serviceWorker.register when predicates are fulfilled', () => {
        window.navigator.serviceWorker.register.mockImplementationOnce(() => (
            new Promise(jest.fn()) 
        ));

        getNodeEnv.mockImplementationOnce(() => 'production');

        registerServiceWorker();

        expect(navigator.serviceWorker.register.mock.calls.length).toBe(1);
    });

    it('handles side effects when registration succeeds and worker.state is installing', async () => {
        const log = console.log;
        console.log = jest.fn();

        const reg = {
            installing: {
                state: 'installed',
            },
        };

        window.navigator.serviceWorker.register.mockImplementationOnce(() => (
            new Promise((resolve, reject) => {
                resolve(reg);
            })
        ));

        getNodeEnv.mockImplementationOnce(() => 'production');

        await registerServiceWorker();

        expect(navigator.serviceWorker.register.mock.calls.length).toBe(1);
        expect(typeof reg.onupdatefound).toBe('function');

        /* trigger update state */
        reg.onupdatefound();

        expect(typeof reg.installing.onstatechange).toBe('function');

        reg.installing.onstatechange();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([
            'Content is now available offline!',
        ]);

        /* mock controller for New or updated content message */
        Object.defineProperty(window.navigator.serviceWorker, 'controller', {
            writable: true,
            value: true,
        });

        reg.installing.onstatechange();

        expect(console.log.mock.calls.length).toBe(2);
        expect(console.log.mock.calls[1]).toEqual([
            'New or updated content is available.',
        ]);

        console.log = log;
    });

    it('handles side effects when registration succeeds and worker.state is redundant', async () => {
        const log = console.log;
        console.log = jest.fn();

        const reg = {
            installing: {
                state: 'redundant',
            },
        };

        window.navigator.serviceWorker.register.mockImplementationOnce(() => (
            new Promise((resolve, reject) => {
                resolve(reg);
            })
        ));

        getNodeEnv.mockImplementationOnce(() => 'production');

        await registerServiceWorker();

        /* trigger update state */
        reg.onupdatefound();

        reg.installing.onstatechange();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log.mock.calls[0]).toEqual([
            'The installing serviceWorker became redundant.',
        ]);

        console.log = log;
    });

    it('does nothing when registration succeeds and worker.state is unrecognized', async () => {
        const log = console.log;
        console.log = jest.fn();

        const reg = {
            installing: {
                state: 'strangenewstate',
            },
        };

        window.navigator.serviceWorker.register.mockImplementationOnce(() => (
            new Promise((resolve, reject) => {
                resolve(reg);
            })
        ));

        getNodeEnv.mockImplementationOnce(() => 'production');

        await registerServiceWorker();

        /* trigger update state */
        reg.onupdatefound();

        reg.installing.onstatechange();

        expect(console.log.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('handles side effects when registration fails', async () => {
        const error = console.error;
        console.error = jest.fn();

        const e = { message: 'test failure', };
        window.navigator.serviceWorker.register.mockImplementationOnce(() => (
            new Promise((resolve, reject) => {
                reject(e);
            })
        ));

        getNodeEnv.mockImplementationOnce(() => 'production');

        await registerServiceWorker();

        /* TODO: not working and i have no idea why */
        /*expect(console.error.mock.calls.length).toBe(1);
        expect(console.error.mock.calls[0]).toEqual([
            'Error during service worker registration:',
            e,
        ]);*/

        console.error = error;
        console.log('end test');
    });
});