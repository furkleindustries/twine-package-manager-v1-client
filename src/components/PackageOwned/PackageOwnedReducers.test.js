import * as reducers from './PackageOwnedReducers';

describe('PackageOwned reducer unit tests', () => {
    it('should return the initial packageEditing state', () => { 
        const object = {
            id: null,
            dateCreated: 0,
            dateModified: 0,
            name: '',
            type: 'macros',
            version: '',
            description: '',
            homepage: '',
            js: '',
            css: '',
            keywords: '',
            tag: '',
        };

        expect(reducers.packageEditingReducer(undefined, {}))
            .toEqual(object);
    });

    it('should handle setPackageEditing with valid arguments', () => {     
        const previous = { 
            id: null,
            dateCreated: 0,
            dateModified: 0,
            name: '',
            type: 'macros',
            version: '',
            description: '',
            homepage: '',
            js: '',
            css: '',
            keywords: '',
            tag: '',
        };

        const object = {
            id: 12,
            dateCreated: 14,
            dateModified: 16,
            name: 'testerson',
            type: 'scripts',
            version: '1',
            description: 'test description',
            homepage: 'testerson.com',
            js: 'test js',
            css: 'test css',
            keywords: 'one two three',
            tag: 'test tag',
        };

        const action = {
            type: 'setPackageEditing',
            editing: object,
        };

        expect(reducers.packageEditingReducer(previous, action))
            .toEqual(object);
    });

    it('should return the initial packagePublishing state', () => {
        expect(reducers.packagePublishingReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setPackagePublishing with valid arguments', () => {
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

    it('packagePublishingReducer should reject with invalid type', () => {
        expect(
          reducers.packagePublishingReducer('', {
            type: 'setPackageTest',
            publishing: {},
          })
        ).toEqual('');
    });

    it('packagePublishingReducer should reject with invalid arguments', () => {
        expect(
          reducers.packagePublishingReducer('', {
            type: 'setPackagePublishing',
            publishing: 23,
          })
        ).toEqual('');
    });

    it('should return the initial packagePublishingMessage state', () => {
        expect(reducers.packagePublishingMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackagePublishingMessage with valid arguments', () => {
        expect(
          reducers.packagePublishingMessageReducer('', {
            type: 'setPackagePublishingMessage',
            message: 'testing messages',
          })
        ).toEqual('testing messages');
    });

    it('packagePublishingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.packagePublishingMessageReducer('', {
            type: 'setPackageTest',
            message: 'this will fail',
          })
        ).toEqual('');
    });

    it('packagePublishingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packagePublishingMessageReducer('', {
            type: 'setPackagePublishingMessage',
            message: 56,
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingNewOwner state', () => {
        expect(reducers.packageEditingNewOwnerReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingNewOwner with valid arguments', () => {
        expect(
          reducers.packageEditingNewOwnerReducer('', {
            type: 'setPackageEditingNewOwner',
            newOwner: 'hi i am new owner',
          })
        ).toEqual('hi i am new owner');
    });

    it('packageEditingIdReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingNewOwnerReducer('', {
            type: 'setPackageTest',
            newOwner: 'a new owner',
          })
        ).toEqual('');
    });

    it('packageEditingNewOwnerReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingNewOwnerReducer('', {
            type: 'setPackageEditingNewOwner',
            newOwner: 12456,
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingId state', () => {
        expect(reducers.packageEditingIdReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setPackageEditingId with valid arguments', () => {
        expect(
          reducers.packageEditingIdReducer('', {
            type: 'setPackageEditingId',
            id: 567,
          })
        ).toEqual(567);
    });

    it('packageEditingIdReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingIdReducer('', {
            type: 'setPackageTest',
            id: 4688,
          })
        ).toEqual('');
    });

    it('packageEditingIdReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingIdReducer('', {
            type: 'setPackageEditingId',
            id: 'foo bar baz',
          })
        ).toEqual('');
    });

    it('packageEditingIdReducer should reject with setPackageEditing type and invalid id', () => {
        expect(
          reducers.packageEditingIdReducer('', {
            type: 'setPackageEditing',
            editing: {
                id: 'foo bar baz',
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingDateCreated state', () => {
        expect(reducers.packageEditingDateCreatedReducer(undefined, {}))
            .toEqual(0);
    });

    it('should handle setPackageEditingDateCreated with valid arguments', () => {
        expect(
          reducers.packageEditingDateCreatedReducer('', {
            type: 'setPackageEditingDateCreated',
            dateCreated: 1235,
          })
        ).toEqual(1235);
    });

    it('packageEditingDateCreatedReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingDateCreatedReducer('', {
            type: 'setPackageTest',
            dateCreated: 4790,
          })
        ).toEqual('');
    });

    it('packageEditingDateCreatedReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingDateCreatedReducer('', {
            type: 'setPackageEditingDateCreated',
            dateCreated: 'failing argument',
          })
        ).toEqual('');
    });

    it('packageEditingDateCreatedReducer should reject with setPackageEditing type and invalid dateCreated', () => {
        expect(
          reducers.packageEditingDateCreatedReducer('', {
            type: 'setPackageEditing',
            editing: {
                dateCreated: 'not a real date',
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingDateModified state', () => {
        expect(reducers.packageEditingDateModifiedReducer(undefined, {}))
            .toEqual(0);
    });

    it('should handle setPackageEditingDateModified with valid arguments', () => {
        expect(
          reducers.packageEditingDateModifiedReducer('', {
            type: 'setPackageEditingDateModified',
            dateModified: 1236,
          })
        ).toEqual(1236);
    });

    it('packageEditingDateModifiedReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingDateModifiedReducer('', {
            type: 'setPackageTest',
            dateModified: 4791,
          })
        ).toEqual('');
    });

    it('packageEditingDateModifiedReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingDateModifiedReducer('', {
            type: 'setPackageEditingDateModified',
            dateModified: 'failing argument',
          })
        ).toEqual('');
    });

    it('packageEditingDateModifiedReducer should reject with setPackageEditing type and invalid dateModified', () => {
        expect(
          reducers.packageEditingDateModifiedReducer('', {
            type: 'setPackageEditing',
            editing: {
                dateModified: 'not a real date either',
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingName state', () => {
        expect(reducers.packageEditingNameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingName with valid arguments', () => {
        expect(
          reducers.packageEditingNameReducer('', {
            type: 'setPackageEditingName',
            name: 'tester',
          })
        ).toEqual('tester');
    });

    it('packageEditingNameReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingNameReducer('', {
            type: 'setPackageTest',
            name: 'terster',
          })
        ).toEqual('');
    });

    it('packageEditingNameReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingNameReducer('', {
            type: 'setPackageEditingName',
            name: 12,
          })
        ).toEqual('');
    });

    it('packageEditingNameReducer should reject with setPackageEditing type and invalid name', () => {
        expect(
          reducers.packageEditingNameReducer('', {
            type: 'setPackageEditing',
            editing: {
                name: 45,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingType state', () => {
        expect(reducers.packageEditingTypeReducer(undefined, {}))
            .toEqual('macros');
    });

    it('should handle setPackageEditingType with valid arguments', () => {
        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageEditingType',
            editingType: 'scripts',
          })
        ).toEqual('scripts');
    });

    it('packageEditingTypeReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageTest',
            editingType: 'storythemes',
          })
        ).toEqual('');
    });

    it('packageEditingTypeReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageEditingType',
            editingType: 12,
          })
        ).toEqual('');

        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageEditingType',
            editingType: 'bad arg',
          })
        ).toEqual('');
    });

    it('packageEditingTypeReducer should reject with setPackageEditing type and invalid type', () => {
        expect(
          reducers.packageEditingTypeReducer('', {
            type: 'setPackageEditing',
            editing: {
                type: 'buxbar',
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingVersion state', () => {
        expect(reducers.packageEditingVersionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingVersion with valid arguments', () => {
        expect(
          reducers.packageEditingVersionReducer('', {
            type: 'setPackageEditingVersion',
            version: '1.5.7',
          })
        ).toEqual('1.5.7');
    });

    it('packageEditingVersionReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingVersionReducer('', {
            type: 'setPackageTest',
            version: '1.6.0',
          })
        ).toEqual('');
    });

    it('packageEditingVersionReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingVersionReducer('', {
            type: 'setPackageEditingVersion',
            version: 18,
          })
        ).toEqual('');
    });

    it('packageEditingVersionReducer should reject with setPackageEditing type and invalid version', () => {
        expect(
          reducers.packageEditingVersionReducer('', {
            type: 'setPackageEditing',
            editing: {
                version: {},
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingDescription state', () => {
        expect(reducers.packageEditingDescriptionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingDescription with valid arguments', () => {
        expect(
          reducers.packageEditingDescriptionReducer('', {
            type: 'setPackageEditingDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('packageEditingDescriptionReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingDescriptionReducer('', {
            type: 'setPackageTest',
            description: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageEditingDescriptionReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingDescriptionReducer('', {
            type: 'setPackageEditingDescription',
            description: 21,
          })
        ).toEqual('');
    });

    it('packageEditingDescriptionReducer should reject with setPackageEditing type and invalid description', () => {
        expect(
          reducers.packageEditingDescriptionReducer('', {
            type: 'setPackageEditing',
            editing: {
                description: 157,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingHomepage state', () => {
        expect(reducers.packageEditingHomepageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingHomepage with valid arguments', () => {
        expect(
          reducers.packageEditingHomepageReducer('', {
            type: 'setPackageEditingHomepage',
            homepage: 'homepage.com',
          })
        ).toEqual('homepage.com');
    });

    it('packageEditingHomepageReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingHomepageReducer('', {
            type: 'setPackageTest',
            homepage: 'this will fail also',
          })
        ).toEqual('');
    });

    it('packageEditingHomepageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingHomepageReducer('', {
            type: 'setPackageEditingHomepage',
            homepage: 68,
          })
        ).toEqual('');
    });

    it('packageEditingHomepageReducer should reject with setPackageEditing type and invalid homepage', () => {
        expect(
          reducers.packageEditingHomepageReducer('', {
            type: 'setPackageEditing',
            editing: {
                homepage: 1346,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingJs state', () => {
        expect(reducers.packageEditingJsReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingJs with valid arguments', () => {
        expect(
          reducers.packageEditingJsReducer('', {
            type: 'setPackageEditingJs',
            js: 'testing js',
          })
        ).toEqual('testing js');
    });

    it('packageEditingJsReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingJsReducer('', {
            type: 'setPackageTest',
            js: 'this will fail too',
          })
        ).toEqual('');
    });

    it('packageEditingJsReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingJsReducer('', {
            type: 'setPackageEditingJs',
            js: 79,
          })
        ).toEqual('');
    });

    it('packageEditingJsReducer should reject with setPackageEditing type and invalid js', () => {
        expect(
          reducers.packageEditingJsReducer('', {
            type: 'setPackageEditing',
            editing: {
                js: [],
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingCss state', () => {
        expect(reducers.packageEditingCssReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingCss with valid arguments', () => {
        expect(
          reducers.packageEditingCssReducer('', {
            type: 'setPackageEditingCss',
            css: 'testing css',
          })
        ).toEqual('testing css');
    });

    it('packageEditingCssReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingCssReducer('', {
            type: 'setPackageTest',
            css: 'this will fail too',
          })
        ).toEqual('');
    });

    it('packageEditingCssReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingCssReducer('', {
            type: 'setPackageEditingCss',
            css: 79,
          })
        ).toEqual('');
    });

    it('packageEditingCssReducer should reject with setPackageEditing type and invalid css', () => {
        expect(
          reducers.packageEditingCssReducer('', {
            type: 'setPackageEditing',
            editing: {
                css: 1577,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingKeywords state', () => {
        expect(reducers.packageEditingKeywordsReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingKeywords with valid arguments', () => {
        expect(
          reducers.packageEditingKeywordsReducer('', {
            type: 'setPackageEditingKeywords',
            keywords: 'test tester testing',
          })
        ).toEqual('test tester testing');
    });

    it('packageEditingKeywordsReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingKeywordsReducer('', {
            type: 'setPackageTest',
            keywords: 'this will fail likewise',
          })
        ).toEqual('');
    });

    it('packageEditingKeywordsReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingKeywordsReducer('', {
            type: 'setPackageEditingKeywords',
            keywords: 84,
          })
        ).toEqual('');
    });

    it('packageEditingKeywordsReducer should reject with setPackageEditing type and invalid id', () => {
        expect(
          reducers.packageEditingKeywordsReducer('', {
            type: 'setPackageEditing',
            editing: {
                keywords: {},
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingTag state', () => {
        expect(reducers.packageEditingTagReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingTag with valid arguments', () => {
        expect(
          reducers.packageEditingTagReducer('', {
            type: 'setPackageEditingTag',
            tag: 'a test tag',
          })
        ).toEqual('a test tag');
    });

    it('packageEditingTagReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingTagReducer('', {
            type: 'setPackageTest',
            tag: 'this will fail for sure',
          })
        ).toEqual('');
    });

    it('packageEditingTagReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingTagReducer('', {
            type: 'setPackageEditingTag',
            tag: 217,
          })
        ).toEqual('');
    });

    it('packageEditingTagReducer should reject with setPackageEditing type and invalid tag', () => {
        expect(
          reducers.packageEditingTagReducer('', {
            type: 'setPackageEditing',
            editing: {
                tag: new Date(),
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageEditingMessage state', () => {
        expect(reducers.packageEditingMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageEditingMessage with valid arguments', () => {
        expect(
          reducers.packageEditingMessageReducer('', {
            type: 'setPackageEditingMessage',
            message: 'testing edit message',
          })
        ).toEqual('testing edit message');
    });

    it('packageEditingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.packageEditingMessageReducer('', {
            type: 'setPackageTest',
            message: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageEditingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageEditingMessageReducer('', {
            type: 'setPackageEditingMessage',
            message: 56,
          })
        ).toEqual('');
    });

    it('should return the initial packageDeleting state', () => {
        expect(reducers.packageDeletingReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setPackageDeleting with valid arguments', () => {
        expect(
          reducers.packageDeletingReducer('', {
            type: 'setPackageDeleting',
            deleting: { foo: 'bar', },
          })
        ).toEqual({ foo: 'bar', });
    });

    it('packageDeletingReducer should reject with invalid type', () => {
        expect(
          reducers.packageDeletingReducer('', {
            type: 'setPackageTest',
            deleting: {},
          })
        ).toEqual('');
    });

    it('packageDeletingReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageDeletingReducer('', {
            type: 'setPackageDeleting',
            deleting: 457,
          })
        ).toEqual('');
    });

    it('should return the initial packageDeletingMessage state', () => {
        expect(reducers.packageDeletingMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageDeletingMessage with valid arguments', () => {
        expect(
          reducers.packageDeletingMessageReducer('', {
            type: 'setPackageDeletingMessage',
            message: 'testing message',
          })
        ).toEqual('testing message');
    });

    it('packageDeletingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.packageDeletingMessageReducer('', {
            type: 'setPackageTest',
            message: 'will fail',
          })
        ).toEqual('');
    });

    it('packageDeletingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageDeletingMessageReducer('', {
            type: 'setPackageDeletingMessage',
            message: 812,
          })
        ).toEqual('');
    });
});