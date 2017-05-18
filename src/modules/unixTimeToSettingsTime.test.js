/* modules */
import unixTimeToSettingsTime from './unixTimeToSettingsTime';

describe('unixTimeToSettingsTime tests', () => {
    it('converts a test time with ddmm and 12h to a valid datestring', () => {
        const expected = '5/17/2017 5:15AM';

        expect(unixTimeToSettingsTime(1495012531000, 'mmdd', '12h'))
            .toBe(expected);
    });

    it('converts a test time with mmdd and 12h to a valid datestring', () => {
        const expected = '17/7/2020 3:11PM';

        expect(unixTimeToSettingsTime(1595013071000, 'ddmm', '12h'))
            .toBe(expected);
    });

    it('converts a test time with mmdd and 24h to a valid datestring', () => {
        const expected = '9/18/2023 00:57';
        expect(unixTimeToSettingsTime(1695013071000, 'mmdd', '24h'))
            .toBe(expected);
    });

    it('converts a test time with ddmm and 24h to a valid datestring', () => {
        const expected = '18/11/2026 18:04';
        expect(unixTimeToSettingsTime(1795043071000, 'ddmm', '24h'))
            .toBe(expected);
    });

    it('converts 0 to 12 and uses AM when using 12h', () => {
        const expected = '11/19/2026 12:11AM';
        expect(unixTimeToSettingsTime(1795065071000, 'mmdd', '12h'))
            .toBe(expected); 
    });

    it('uses AM with hours between 1 and 11 when using 12h', () => {
        const expected = '11/19/2026 1:17AM';
        expect(unixTimeToSettingsTime(1795069071000, 'mmdd', '12h'))
            .toBe(expected); 
    });

    it('uses PM with hours between 12 and 23 and subtracts 12 hours from hours when using 12h', () => {
        const expected = '11/19/2026 4:51PM';
        expect(unixTimeToSettingsTime(1795125071000, 'mmdd', '12h'))
            .toBe(expected); 
    });

    it('converts 0 hours to 00 when using 24h', () => {
        const expected = '11/20/2026 00:21';
        expect(unixTimeToSettingsTime(1795152070000, 'mmdd', '24h'))
            .toBe(expected);
    });

    it('returns an empty string for invalid unixTimeInMs', () => {
        expect(unixTimeToSettingsTime('not a time', 'ddmm', '12h')).toBe('');
    });

    it('returns an empty string for invalid dateStyle', () => {
        expect(unixTimeToSettingsTime(12345, 'not dateStyle', '12h')).toBe('');
    });

    it('returns an empty string for invalid timeStyle', () => {
        expect(unixTimeToSettingsTime(12345, 'ddmm', 'not timeStyle')).toBe('');
    });
});