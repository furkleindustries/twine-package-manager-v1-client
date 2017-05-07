import * as reducers from './AccountCreateModalReducers';

describe('AccountCreateModal reducer unit tests', () => {
    it('should return the initial accountCreatingName state', () => {
        expect(reducers.accountCreatingNameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setAccountCreatingName with valid arguments', () => {
        expect(
          reducers.accountCreatingNameReducer('', {
            type: 'setAccountCreatingName',
            name: 'test testerson',
          })
        ).toEqual('test testerson');
    });

    it('accountCreatingNameReducer should reject with invalid type', () => {
        expect(
          reducers.accountCreatingNameReducer('', {
            type: 'setAccountCreatingTest',
            name: 'failing lol',
          })
        ).toEqual('');
    });

    it('accountCreatingNameReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountCreatingNameReducer('', {
            type: 'setAccountCreatingName',
            name: 14,
          })
        ).toEqual('');
    });

    it('should return the initial accountCreatingPassword state', () => {
        expect(reducers.accountCreatingPasswordReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setAccountCreatingPassword with valid arguments', () => {
        expect(
          reducers.accountCreatingPasswordReducer('', {
            type: 'setAccountCreatingPassword',
            password: 'this is a test password',
          })
        ).toEqual('this is a test password');
    });

    it('accountCreatingPasswordReducer should reject with invalid type', () => {
        expect(
          reducers.accountCreatingPasswordReducer('', {
            type: 'setAccountCreatingTest',
            password: 'this is a test password',
          })
        ).toEqual('');
    });

    it('accountCreatingPasswordReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountCreatingPasswordReducer('', {
            type: 'setAccountCreatingPassword',
            password: new Date(),
          })
        ).toEqual('');
    });

    it('should return the initial accountCreatingEmail state', () => {
        expect(reducers.accountCreatingEmailReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setAccountCreatingEmail with valid arguments', () => {
        expect(
          reducers.accountCreatingEmailReducer('', {
            type: 'setAccountCreatingEmail',
            email: 'test@testerson.com',
          })
        ).toEqual('test@testerson.com');
    });

    it('accountCreatingEmailReducer should reject with invalid type', () => {
        expect(
          reducers.accountCreatingEmailReducer('', {
            type: 'setAccountCreatingTest',
            email: 'test@testerson.com',
          })
        ).toEqual('');
    });

    it('accountCreatingEmailReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountCreatingEmailReducer('', {
            type: 'setAccountCreatingEmail',
            email: {},
          })
        ).toEqual('');
    });

    it('should return the initial accountCreatingMessage state', () => {
        expect(reducers.accountCreatingMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setAccountCreatingMessage with valid arguments', () => {
        expect(
          reducers.accountCreatingMessageReducer('', {
            type: 'setAccountCreatingMessage',
            message: 'test message',
          })
        ).toEqual('test message');
    });

    it('accountCreatingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.accountCreatingMessageReducer('', {
            type: 'setAccountCreatingTest',
            message: 'test message',
          })
        ).toEqual('');
    });

    it('accountCreatingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountCreatingMessageReducer('', {
            type: 'setAccountCreatingMessage',
            message: [],
          })
        ).toEqual('');
    });
});