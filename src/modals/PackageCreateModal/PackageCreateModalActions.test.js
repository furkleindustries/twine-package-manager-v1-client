import * as actions from './PackageCreateModalActions';

describe('PackageCreateModal action unit tests', () => {
    it('creates a valid setPackageCreating action', () => {
        const creating = { foo: 'bar', };

        const object = {
            creating,
            type: 'setPackageCreating',
        };

        expect(actions.setPackageCreating(creating)).toEqual(object);
    });

    it('creates a valid setPackageCreatingId action', () => {
        const id = 14;

        const object = {
            id,
            type: 'setPackageCreatingId',
        };

        expect(actions.setPackageCreatingId(id)).toEqual(object);
    });

    it('creates a valid setPackageCreatingDateCreated action', () => {
        const dateCreated = 10000;

        const object = {
            dateCreated,
            type: 'setPackageCreatingDateCreated',
        };

        expect(actions.setPackageCreatingDateCreated(dateCreated))
            .toEqual(object);
    });

    it('creates a valid setPackageCreatingDateModified action', () => {
        const dateModified = 10001;

        const object = {
            dateModified,
            type: 'setPackageCreatingDateModified',
        };

        expect(actions.setPackageCreatingDateModified(dateModified))
            .toEqual(object);
    });

    it('creates a valid setPackageCreatingName action', () => {
        const name = 'test testerson';

        const object = {
            name,
            type: 'setPackageCreatingName',
        };

        expect(actions.setPackageCreatingName(name)).toEqual(object);
    });

    it('creates a valid setPackageCreatingType action', () => {
        const creatingType = 'scripts';

        const object = {
            creatingType,
            type: 'setPackageCreatingType',
        };

        expect(actions.setPackageCreatingType(creatingType)).toEqual(object);
    });

    it('creates a valid setPackageCreatingVersion action', () => {
        const version = '1.2.3';

        const object = {
            version,
            type: 'setPackageCreatingVersion',
        };

        expect(actions.setPackageCreatingVersion(version)).toEqual(object);
    });

    it('creates a valid setPackageCreatingVersion action', () => {
        const version = '1.2.3';

        const object = {
            version,
            type: 'setPackageCreatingVersion',
        };

        expect(actions.setPackageCreatingVersion(version)).toEqual(object);
    });

    it('creates a valid setPackageCreatingDescription action', () => {
        const description = 'this is a test description';

        const object = {
            description,
            type: 'setPackageCreatingDescription',
        };

        expect(actions.setPackageCreatingDescription(description))
            .toEqual(object);
    });

    it('creates a valid setPackageCreatingHomepage action', () => {
        const homepage = 'testerson.com';

        const object = {
            homepage,
            type: 'setPackageCreatingHomepage',
        };

        expect(actions.setPackageCreatingHomepage(homepage)).toEqual(object);
    });

    it('creates a valid setPackageCreatingJs action', () => {
        const js = 'alert("test");';

        const object = {
            js,
            type: 'setPackageCreatingJs',
        };

        expect(actions.setPackageCreatingJs(js)).toEqual(object);
    });

    it('creates a valid setPackageCreatingCss action', () => {
        const css = 'body { display: none; }';

        const object = {
            css,
            type: 'setPackageCreatingCss',
        };

        expect(actions.setPackageCreatingCss(css)).toEqual(object);
    });

    it('creates a valid setPackageCreatingKeywords action', () => {
        const keywords = 'one two three';

        const object = {
            keywords,
            type: 'setPackageCreatingKeywords',
        };

        expect(actions.setPackageCreatingKeywords(keywords)).toEqual(object);
    });

    it('creates a valid setPackageCreatingTag action', () => {
        const tag = 'foo bar baz';

        const object = {
            tag,
            type: 'setPackageCreatingTag',
        };

        expect(actions.setPackageCreatingTag(tag)).toEqual(object);
    });

    it('creates a valid setPackageCreatingMessage action', () => {
        const message = 'testing message';

        const object = {
            message,
            type: 'setPackageCreatingMessage',
        };

        expect(actions.setPackageCreatingMessage(message)).toEqual(object);
    });
});