import deepCopy from './deepCopy';

describe('deepCopy unit tests', () => {
    it('tests deepCopy with object source', () => {
        const obj = {
            test: 'testing',
        };

        const copy = deepCopy(obj);

        expect(copy).not.toBe(obj);
        expect(copy.test).toBe('testing');
    });

    it('tests deepCopy with a number source', () => {
        expect(deepCopy(2)).toBe(2);
    });

    it('tests deepCopy with a string source', () => {
        expect(deepCopy('foo')).toBe('foo');
    });

    it('throws an error with anything else', () => {
        expect(() => {
            deepCopy(new Function());
        }).toThrow();
    });
});