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

    it('creates a valid setPackagePublishingMessage action', () => {
        const message = 'test message';

        const object = {
            message,
            type: 'setPackagePublishingMessage',
        };

        expect(actions.setPackagePublishingMessage(message)).toEqual(object);
    });

    it('creates a valid setPackageEditingNewOwner action', () => {
        const newOwner = 'hi i am the newest owner!';

        const object = {
            newOwner,
            type: 'setPackageEditingNewOwner',
        };

        expect(actions.setPackageEditingNewOwner(newOwner)).toEqual(object);
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

    it('creates a valid setPackageEditingType action', () => {
        const editingType = 'macros';

        const object = {
            editingType,
            type: 'setPackageEditingType',
        };

        expect(actions.setPackageEditingType(editingType)).toEqual(object);
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

    it('creates a valid setPackageEditingMessage action', () => {
        const message = 'testing message';

        const object = {
            message,
            type: 'setPackageEditingMessage',
        };

        expect(actions.setPackageEditingMessage(message)).toEqual(object);
    });

    it('creates a valid setPackageDeleting action', () => {
        const deleting = {};

        const object = {
            deleting,
            type: 'setPackageDeleting',
        };

        expect(actions.setPackageDeleting(deleting)).toEqual(object);
    });

    it('creates a valid setPackageDeletingMessage action', () => {
        const message = 'message for test';

        const object = {
            message,
            type: 'setPackageDeletingMessage',
        };

        expect(actions.setPackageDeletingMessage(message)).toEqual(object);
    });
});