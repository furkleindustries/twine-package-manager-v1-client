import * as reducers from './loginReducers';

describe('login reducer unit tests', () => {
    it('should return the initial username state', () => {
        expect(reducers.usernameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setUsername with valid arguments', () => {
        expect(
          reducers.usernameReducer('', {
            type: 'setUsername',
            username: 'mr. test',
          })
        ).toEqual('mr. test');
    });

    it('usernameReducer should reject with invalid type', () => {
        expect(
          reducers.usernameReducer('', {
            type: 'setTest',
            username: 'will fail',
          })
        ).toEqual('');
    });

    it('usernameReducer should reject with invalid arguments', () => {
        expect(
          reducers.usernameReducer('', {
            type: 'setUsername',
            username: 15,
          })
        ).toEqual('');
    });

    it('should return the initial password state', () => {
        expect(reducers.passwordReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPassword with valid arguments', () => {
        expect(
          reducers.passwordReducer('', {
            type: 'setPassword',
            password: `mr. test's password`,
          })
        ).toEqual(`mr. test's password`);
    });

    it('passwordReducer should reject with invalid type', () => {
        expect(
          reducers.passwordReducer('', {
            type: 'setTest',
            password: 'will fail',
          })
        ).toEqual('');
    });

    it('passwordReducer should reject with invalid arguments', () => {
        expect(
          reducers.passwordReducer('', {
            type: 'setPassword',
            password: 16,
          })
        ).toEqual('');
    });

    it('should return the initial login message state', () => {
        expect(reducers.loginMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setLoginMessage with valid arguments', () => {
        expect(
          reducers.loginMessageReducer('', {
            type: 'setLoginMessage',
            message: 'mr. test is sending a message',
          })
        ).toEqual('mr. test is sending a message');
    });

    it('loginMessageReducer should reject with invalid type', () => {
        expect(
          reducers.loginMessageReducer('', {
            type: 'setTest',
            message: 'will fail',
          })
        ).toEqual('');
    });

    it('loginMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.loginMessageReducer('', {
            type: 'setLoginMessage',
            message: 18,
          })
        ).toEqual('');
    });
});