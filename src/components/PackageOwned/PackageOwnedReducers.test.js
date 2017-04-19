import * as reducers from './PackageOwnedReducers';

describe('PackageOwned reducer unit tests', () => {
    it('should return the initial package publishing state', () => {
        expect(reducers.packagePublishingReducer(undefined, {})).toEqual(null);
    });

    it('should handle setPackagePublishing', () => {
        expect(
          reducers.packagePublishingReducer('', {
            type: 'setPackagePublishing',
            publishing: {
                id: 201,
                publishing: true,
            },
          })
        ).toEqual({ id: 201, publishing: true });
    });

    it('should return the initial package publishing error state', () => {
        expect(reducers.packagePublishingErrorReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackagePublishingError', () => {
        expect(
          reducers.packagePublishingErrorReducer('', {
            type: 'setPackagePublishingError',
            error: 'this is a test error',
          })
        ).toEqual('this is a test error');
    });

    it('should return the initial package editing error state', () => {
        expect(reducers.packageEditingErrorReducer(undefined, {})).toEqual('');
    });

    it('should handle setPackageEditingError', () => {
        expect(
          reducers.packageEditingErrorReducer('', {
            type: 'setPackageEditingError',
            error: 'this is also a test error',
          })
        ).toEqual('this is also a test error');
    });

    it('should return the initial package editing id state', () => {
        expect(reducers.packageEditingIdReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setPackageEditingId', () => {
        expect(
          reducers.packageEditingIdReducer('', {
            type: 'setPackageEditingId',
            id: 245,
          })
        ).toEqual(245);
    });

    it('should return the initial package editing date created state', () => {
        expect(reducers.packageEditingDateCreatedReducer(undefined, {}))
            .toEqual(0);
    });

    it('should handle setPackageEditingDateCreated', () => {
        expect(
          reducers.packageEditingDateCreatedReducer('', {
            type: 'setPackageEditingDateCreated',
            dateCreated: 60000,
          })
        ).toEqual(60000);
    });

    it('should return the initial package editing date modified state', () => {
        expect(reducers.packageEditingDateModifiedReducer(undefined, {}))
            .toEqual(0);
    });

    it('should handle setPackageEditingDateModified', () => {
        expect(
          reducers.packageEditingDateModifiedReducer('', {
            type: 'setPackageEditingDateModified',
            dateModified: 60001,
          })
        ).toEqual(60001);
    });

    it('should return the initial package editing name state', () => {
        expect(reducers.packageEditingNameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingName', () => {
        expect(
          reducers.packageEditingNameReducer('', {
            type: 'setPackageEditingName',
            name: 'test testerson',
          })
        ).toEqual('test testerson');
    });

    it('should return the initial package editing type state', () => {
        expect(reducers.packageEditingTypeReducer(undefined, {}))
            .toEqual('macros');
    });

    it('should handle setPackageEditingType', () => {
        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageEditingType',
            editingType: 'scripts',
          })
        ).toEqual('scripts');
    });

    it('should return the initial package editing version state', () => {
        expect(reducers.packageEditingVersionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingVersion', () => {
        expect(
          reducers.packageEditingVersionReducer('', {
            type: 'setPackageEditingVersion',
            version: '1.2.4',
          })
        ).toEqual('1.2.4');
    });

    it('should return the initial package editing description state', () => {
        expect(reducers.packageEditingDescriptionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingDescription', () => {
        expect(
          reducers.packageEditingDescriptionReducer('', {
            type: 'setPackageEditingDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('should return the initial package editing homepage state', () => {
        expect(reducers.packageEditingHomepageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingHomepage', () => {
        expect(
          reducers.packageEditingHomepageReducer('', {
            type: 'setPackageEditingHomepage',
            homepage: 'test.testing.com',
          })
        ).toEqual('test.testing.com');
    });

    it('should return the initial package editing js state', () => {
        expect(reducers.packageEditingJsReducer(undefined, {})).toEqual('');
    });

    it('should handle setPackageEditingJs', () => {
        expect(
          reducers.packageEditingJsReducer('', {
            type: 'setPackageEditingJs',
            js: 'const test = "testing";',
          })
        ).toEqual('const test = "testing";');
    });

    it('should return the initial package editing css state', () => {
        expect(reducers.packageEditingCssReducer(undefined, {})).toEqual('');
    });

    it('should handle setPackageEditingCss', () => {
        expect(
          reducers.packageEditingCssReducer('', {
            type: 'setPackageEditingCss',
            css: '.test { display: block; }',
          })
        ).toEqual('.test { display: block; }');
    });

    it('should return the initial package editing keywords state', () => {
        expect(reducers.packageEditingKeywordsReducer(undefined, {})).toEqual('');
    });

    it('should handle setPackageEditingKeywords', () => {
        expect(
          reducers.packageEditingKeywordsReducer('', {
            type: 'setPackageEditingKeywords',
            keywords: 'test testing tests',
          })
        ).toEqual('test testing tests');
    });

    it('should return the initial package editing tag state', () => {
        expect(reducers.packageEditingTagReducer(undefined, {})).toEqual('');
    });

    it('should handle setPackageEditingTag', () => {
        expect(
          reducers.packageEditingTagReducer('', {
            type: 'setPackageEditingTag',
            tag: 'testtag',
          })
        ).toEqual('testtag');
    });

    it('should return the initial package removing state', () => {
        expect(reducers.packageRemovingReducer(undefined, {})).toEqual(null);
    });

    it('should handle setPackageRemoving', () => {
        expect(
          reducers.packageRemovingReducer('', {
            type: 'setPackageRemoving',
            removing: {},
          })
        ).toEqual({});
    });

    it('should return the initial package removing error state', () => {
        expect(reducers.packageRemovingErrorReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageRemovingError', () => {
        expect(
          reducers.packageRemovingErrorReducer('', {
            type: 'setPackageRemovingError',
            error: 'this, too, is a test error',
          })
        ).toEqual('this, too, is a test error');
    });
});