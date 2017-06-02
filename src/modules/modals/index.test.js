import modals from './';

describe('modals gestalt object unit tests', () => {
    it('contains get, post, and delete properties', () => {
        expect('close' in modals).toEqual(true);
        expect(typeof modals.close).toEqual('function');
        
        expect('closeListener' in modals).toEqual(true);
        expect(typeof modals.closeListener).toEqual('function');
        
        expect('create' in modals).toEqual(true);
        expect(typeof modals.create).toEqual('function');
        
        expect('factories' in modals).toEqual(true);
        expect(typeof modals.factories).toEqual('object');
    });
});