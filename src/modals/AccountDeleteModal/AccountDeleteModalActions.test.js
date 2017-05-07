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

    it('creates a valid setAccountDeletingMessage action', () => {
        const message = 'this is a test message';

        const object = {
            message,
            type: 'setAccountDeletingMessage',
        };

        expect(actions.setAccountDeletingMessage(message)).toEqual(object);
    });
});