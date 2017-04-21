import * as actions from './AccountDeleteModalActions';

describe('AccountDeleteModal action unit tests', () => {
    it('creates a valid setAccountDeletingEnteredId action', () => {
        const enteredId = 12;

        const object = {
            enteredId,
            type: 'setAccountDeletingEnteredId',
        };

        expect(actions.setAccountDeletingEnteredId(enteredId)).toEqual(object);
    });

    it('creates a valid setAccountDeletingError action', () => {
        const error = 'this is a test error';

        const object = {
            error,
            type: 'setAccountDeletingError',
        };

        expect(actions.setAccountDeletingError(error)).toEqual(object);
    });
});