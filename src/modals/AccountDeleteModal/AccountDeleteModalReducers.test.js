import * as reducers from './AccountDeleteModalReducers';

describe('AccountDeleteModal reducer unit tests', () => {
    it('should return the initial accountDeletingEnteredId state', () => {
        expect(reducers.accountDeletingEnteredIdReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setAccountDeletingEnteredId with valid arguments', () => {
        expect(
          reducers.accountDeletingEnteredIdReducer('', {
            type: 'setAccountDeletingEnteredId',
            enteredId: '12',
          })
        ).toEqual('12');
    });

    it('accountDeletingEnteredIdReducer should reject with invalid type', () => {
        expect(
          reducers.accountDeletingEnteredIdReducer('', {
            type: 'setAccountDeletingTest',
            id: '12',
          })
        ).toEqual('');
    });

    it('accountDeletingEnteredIdReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountDeletingEnteredIdReducer('', {
            type: 'setAccountDeletingEnteredId',
            id: 12,
          })
        ).toEqual('');
    });

    it('should return the initial accountDeletingMessage state', () => {
        expect(reducers.accountDeletingMessageReducer(undefined, {}))
          .toEqual('');
    });

    it('should handle setAccountDeletingMessage with valid arguments', () => {
        expect(
          reducers.accountDeletingMessageReducer('', {
            type: 'setAccountDeletingMessage',
            message: 'this is a test message',
          })
        ).toEqual('this is a test message');
    });

    it('accountDeletingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.accountDeletingMessageReducer('', {
            type: 'setAccountDeletingTest',
            message: 'this is a test message',
          })
        ).toEqual('');
    });

    it('accountDeletingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountDeletingMessageReducer('', {
            type: 'setAccountDeletingMessage',
            message: 12,
          })
        ).toEqual('');
    });
});