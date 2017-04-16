import * as actions from './PackageOwnedActions';

describe('PackageOwned action unit tests', () => {
    it('creates a valid setPackagePublishing action', () => {
        const publishing = true;

        const object = {
            publishing,
            type: 'setPackagePublishing',
        };

        expect(actions.setPackagePublishing(publishing)).toEqual(object);
    });

    it('creates a valid setPackagePublishingError action', () => {
        const error = 'test error';

        const object = {
            error,
            type: 'setPackagePublishingError',
        };

        expect(actions.setPackagePublishingError(error)).toEqual(object);
    });

    it('creates a valid setPackageEditing action', () => {
        const editing = {};

        const object = {
            editing,
            type: 'setPackageEditing',
        };

        expect(actions.setPackageEditing(editing)).toEqual(object);
    });

    it('creates a valid setPackageEditingId action', () => {
        const id = 1;

        const object = {
            id,
            type: 'setPackageEditingId',
        };

        expect(actions.setPackageEditingId(id)).toEqual(object);
    });

    it('creates a valid setPackageEditingDateCreated action', () => {
        const dateCreated = 50;

        const object = {
            dateCreated,
            type: 'setPackageEditingDateCreated',
        };

        expect(actions.setPackageEditingDateCreated(dateCreated))
            .toEqual(object);
    });

    it('creates a valid setPackageEditingDateModified action', () => {
        const dateModified = 51;

        const object = {
            dateModified,
            type: 'setPackageEditingDateModified',
        };

        expect(actions.setPackageEditingDateModified(dateModified))
            .toEqual(object);
    });

    it('creates a valid setPackageEditingName action', () => {
        const name = 'tester';

        const object = {
            name,
            type: 'setPackageEditingName',
        };

        expect(actions.setPackageEditingName(name)).toEqual(object);
    });

    it('creates a valid setPackageEditingVersion action', () => {
        const version = '1.2.test';

        const object = {
            version,
            type: 'setPackageEditingVersion',
        };

        expect(actions.setPackageEditingVersion(version)).toEqual(object);
    });

    it('creates a valid setPackageEditingDescription action', () => {
        const description = 'this is a test description';

        const object = {
            description,
            type: 'setPackageEditingDescription',
        };

        expect(actions.setPackageEditingDescription(description)).toEqual(object);
    });

    it('creates a valid setPackageEditingHomepage action', () => {
        const homepage = 'testing.test';

        const object = {
            homepage,
            type: 'setPackageEditingHomepage',
        };

        expect(actions.setPackageEditingHomepage(homepage)).toEqual(object);
    });

    it('creates a valid setPackageEditingJs action', () => {
        const js = 'const test = "test";';

        const object = {
            js,
            type: 'setPackageEditingJs',
        };

        expect(actions.setPackageEditingJs(js)).toEqual(object);
    });

    it('creates a valid setPackageEditingCss action', () => {
        const css = '.test { position: absolute; }';

        const object = {
            css,
            type: 'setPackageEditingCss',
        };

        expect(actions.setPackageEditingCss(css)).toEqual(object);
    });

    it('creates a valid setPackageEditingKeywords action', () => {
        const keywords = 'test testing tests';

        const object = {
            keywords,
            type: 'setPackageEditingKeywords',
        };

        expect(actions.setPackageEditingKeywords(keywords)).toEqual(object);
    });

    it('creates a valid setPackageEditingTag action', () => {
        const tag = 'test tag';

        const object = {
            tag,
            type: 'setPackageEditingTag',
        };

        expect(actions.setPackageEditingTag(tag)).toEqual(object);
    });

    it('creates a valid setPackageEditingError action', () => {
        const error = 'testing error';

        const object = {
            error,
            type: 'setPackageEditingError',
        };

        expect(actions.setPackageEditingError(error)).toEqual(object);
    });

    it('creates a valid setPackageRemoving action', () => {
        const removing = {};

        const object = {
            removing,
            type: 'setPackageRemoving',
        };

        expect(actions.setPackageRemoving(removing)).toEqual(object);
    });

    it('creates a valid setPackageRemovingError action', () => {
        const error = 'error for test';

        const object = {
            error,
            type: 'setPackageRemovingError',
        };

        expect(actions.setPackageRemovingError(error)).toEqual(object);
    });
});