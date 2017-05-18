/* modules */
import changePassword from './changePassword';

describe('changePassword tests', () => {
    it('meaninglessly fires changePassword', async () => {
        await changePassword();
    });
});