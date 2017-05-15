import database from './';

describe('database gestalt object unit tests', () => {
    it('contains get, post, and delete properties', () => {
        expect('get' in database).toEqual(true);
        expect(typeof database.get).toEqual('object');
        expect('post' in database).toEqual(true);
        expect(typeof database.post).toEqual('object');
        expect('delete' in database).toEqual(true);
        expect(typeof database.delete).toEqual('object');
    });
});