// redux
import store from '../store';

// nock
import nock from 'nock';

// modules
import login from './login';

jest.unmock('nock');

describe('login unit tests', () => {
    it('does something', () => {
        nock('https://furkleindustries.com')
            .post('/twinepm/login/login.php')
            .reply(200, {
                status: 200,
                csrfToken: 'testToken',
            });

        login('usertest', 'passtest');

        expect(store.getState().csrfToken).toEqual('testToken');
    });
});