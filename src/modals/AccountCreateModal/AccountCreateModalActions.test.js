import * as actions from './AccountCreateModalActions';

describe('AccountCreateModal action unit tests', () => {
    it('creates a valid setAccountCreatingName action', () => {
        const name = 'tester';

        const object = {
            name,
            type: 'setAccountCreatingName',
        };

        expect(actions.setAccountCreatingName(name)).toEqual(object);
    });

    it('creates a valid setAccountCreatingPassword action', () => {
        const password = 'this is a test password';

        const object = {
            password,
            type: 'setAccountCreatingPassword',
        };

        expect(actions.setAccountCreatingPassword(password)).toEqual(object);
    });

    it('creates a valid setAccountCreatingEmail action', () => {
        const email = 'email@email.com';

        const object = {
            email,
            type: 'setAccountCreatingEmail',
        };

        expect(actions.setAccountCreatingEmail(email)).toEqual(object);
    });

    it('creates a valid setAccountCreatingError action', () => {
        const error = 'this is a test error';

        const object = {
            error,
            type: 'setAccountCreatingError',
        };

        expect(actions.setAccountCreatingError(error)).toEqual(object);
    });
});