import * as reducers from './AccountDeleteModalReducers';

describe('AccountDeleteModal reducer unit tests', () => {
    it('should return the initial accountDeletingEnteredId state', () => {
        expect(reducers.accountDeletingEnteredIdReducer(undefined, {}))
            .toEqual(null);
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

    it('should return the initial accountDeletingError state', () => {
        expect(reducers.accountDeletingErrorReducer(undefined, {})).toEqual('');
    });

    it('should handle setAccountDeletingError with valid arguments', () => {
        expect(
          reducers.accountDeletingErrorReducer('', {
            type: 'setAccountDeletingError',
            error: 'this is a test error',
          })
        ).toEqual('this is a test error');
    });

    it('accountDeletingErrorReducer should reject with invalid type', () => {
        expect(
          reducers.accountDeletingErrorReducer('', {
            type: 'setAccountDeletingTest',
            error: 'this is a test error',
          })
        ).toEqual('');
    });

    it('accountDeletingErrorReducer should reject with invalid arguments', () => {
        expect(
          reducers.accountDeletingErrorReducer('', {
            type: 'setAccountDeletingTest',
            error: 12,
          })
        ).toEqual('');
    });
});