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

    it('creates a valid setLoginMessage action', () => {
        const message = 'test message';

        const object = {
            message,
            type: 'setLoginMessage',
        };

        expect(actions.setLoginMessage(message)).toEqual(object);
    });
 });