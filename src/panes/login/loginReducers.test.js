import * as reducers from './loginReducers';

describe('login reducer unit tests', () => {
    it('should return the initial username state', () => {
        expect(reducers.usernameReducer(undefined, {})).toEqual('');
    });

    it('should handle setUsername', () => {
        expect(
          reducers.usernameReducer('', {
            type: 'setUsername',
            username: 'testUsername'
          })
        ).toEqual('testUsername');
    });

    it('should return the initial password state', () => {
        expect(reducers.passwordReducer(undefined, {})).toEqual('');
    });

    it('should handle setPassword', () => {
        expect(
          reducers.passwordReducer('', {
            type: 'setPassword',
            password: 'testPassword'
          })
        ).toEqual('testPassword');
    });

    it('should return the initial login error state', () => {
        expect(reducers.loginErrorReducer(undefined, {})).toEqual('');
    });

    it('should handle setLoginError', () => {
        expect(
          reducers.loginErrorReducer('', {
            type: 'setLoginError',
            error: 'testing login error'
          })
        ).toEqual('testing login error');
    });

    it('should return the initial create account error state', () => {
        expect(reducers.createAccountErrorReducer(undefined, {})).toEqual('');
    });

    it('should handle setCreateAccountError', () => {
        expect(
          reducers.createAccountErrorReducer('', {
            type: 'setCreateAccountError',
            error: 'testing create account error'
          })
        ).toEqual('testing create account error');
    });
});