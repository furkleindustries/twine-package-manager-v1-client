/* modules */
import * as modalFactories from './factories';

jest.mock('./create');
import create from './create';

describe('modal factories unit tests', () => {
    beforeEach(() => {
        create.mockClear();
    });

    it('tests the accountCreate modal creator', () => {
        modalFactories.accountCreate();
        expect(location.hash).toEqual('#createAccount');
        expect(create.mock.calls.length).toEqual(1);
    });

    it('tests the accountDelete modal creator', () => {
        modalFactories.accountDelete();
        expect(location.hash).toEqual('#deleteAccount');
        expect(create.mock.calls.length).toEqual(1);
    });
    
    it('tests the packageCreate modal creator', () => {
        modalFactories.packageCreate();
        expect(location.hash).toEqual('#createNewPackage');
        expect(create.mock.calls.length).toEqual(1);
    });
    
    it('tests the togglePackagePublish modal creator', () => {
        modalFactories.togglePackagePublish(null, 12);
        expect(location.hash).toEqual('#togglePackagePublish-12');
        expect(create.mock.calls.length).toEqual(1);
    });
    
    it('tests the packageEdit modal creator', () => {
        modalFactories.packageEdit(null, 13);
        expect(location.hash).toEqual('#editPackage-13');
        expect(create.mock.calls.length).toEqual(1);
    });
    
    it('tests the packageDelete modal creator', () => {
        modalFactories.packageDelete(null, 14);
        expect(location.hash).toEqual('#deletePackage-14');
        expect(create.mock.calls.length).toEqual(1);
    });
    
    it('tests the rules modal creator', () => {
        modalFactories.rules();
        expect(location.hash).toEqual('#rules');
        expect(create.mock.calls.length).toEqual(1);
    });
});