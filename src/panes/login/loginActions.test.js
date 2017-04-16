import * as actions from './loginActions';

describe('login action unit tests', () => {
    it('creates a valid setUsername action', () => {
        const username = 'tester';

        const object = {
            username,
            type: 'setUsername',
        };

        expect(actions.setUsername(username)).toEqual(object);
    });

    it('creates a valid setPassword action', () => {
        const password = 'testpass';

        const object = {
            password,
            type: 'setPassword',
        };

        expect(actions.setPassword(password)).toEqual(object);
    });

    it('creates a valid setLoginError action', () => {
        const error = 'test error';

        const object = {
            error,
            type: 'setLoginError',
        };

        expect(actions.setLoginError(error)).toEqual(object);
    });

    it('creates a valid setCreateAccountError action', () => {
        const error = 'testing error';

        const object = {
            error,
            type: 'setCreateAccountError',
        };

        expect(actions.setCreateAccountError(error)).toEqual(object);
    });
 });