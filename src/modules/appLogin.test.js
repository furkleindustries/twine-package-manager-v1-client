// redux
import store from '../store';

// nock
import nock from 'nock';

// modules
import appLogin from './appLogin';

jest.unmock('nock');

describe('appLogin unit tests', () => {
    it('does something', () => {
        nock('https://furkleindustries.com')
            .post('/twinepm/login/login.php')
            .reply(200, {
                status: 200,
                csrfToken: 'testToken',
            });

        appLogin('usertest', 'passtest');

        expect(store.getState().csrfToken).toEqual('testToken');
    });
});