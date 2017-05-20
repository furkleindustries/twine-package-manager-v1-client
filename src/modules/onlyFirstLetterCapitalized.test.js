import onlyFirstLetterCapitalized from './onlyFirstLetterCapitalized';

describe('onlyFirstLetterCapitalized unit tests', () => {
    it('tests that it correctly transforms a lower-case word', () => {
        const str = 'testcase';
        expect(onlyFirstLetterCapitalized(str)).toBe('Testcase');
    });

    it('tests that it correctly transforms an upper-case word', () => {
        const str = 'TESTCASE';
        expect(onlyFirstLetterCapitalized(str)).toBe('Testcase');
    });

    it('tests that a sentence with random capitalization is correctly transformed', () => {
        const str = 'fdkjADFDFjkdlsSfgcvDD';
        expect(onlyFirstLetterCapitalized(str)).toBe('Fdkjadfdfjkdlssfgcvdd');
    });

    it('returns an empty string when a non-string value is provided', () => {
        const notStr = 134;
        expect(onlyFirstLetterCapitalized(notStr)).toBe('');
    });
});