import * as reducers from './PackageCreateModalReducers';

describe('PackageCreateModal reducer unit tests', () => {
    it('should return the initial packageCreating state', () => { 
        const object = {
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

        expect(reducers.packageCreatingReducer(undefined, {}))
            .toEqual(object);
    });

    it('should handle setPackageCreating with valid arguments', () => {     
        const previous = { 
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
            type: 'setPackageCreating',
            creating: object,
        };

        expect(reducers.packageCreatingReducer(previous, action))
            .toEqual(object);
    });

    it('should return the initial packageCreatingName state', () => {
        expect(reducers.packageCreatingNameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingName with valid arguments', () => {
        expect(
          reducers.packageCreatingNameReducer('', {
            type: 'setPackageCreatingName',
            name: 'test testerson',
          })
        ).toEqual('test testerson');
    });

    it('packageCreatingNameReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingNameReducer('', {
            type: 'setPackageCreatingTest',
            name: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingNameReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingNameReducer('', {
            type: 'setPackageCreatingName',
            name: 17,
          })
        ).toEqual('');
    });

    it('packageCreatingNameReducer should reject with setPackageCreating type and invalid name', () => {
        expect(
          reducers.packageCreatingNameReducer('', {
            type: 'setPackageCreating',
            creating: {
                name: 156,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingType state', () => {
        expect(reducers.packageCreatingTypeReducer(undefined, {}))
            .toEqual('macros');
    });

    it('should handle setPackageCreatingType with valid arguments', () => {
        expect(
          reducers.packageCreatingTypeReducer('', {
            type: 'setPackageCreatingType',
            creatingType: 'scripts',
          })
        ).toEqual('scripts');
    });

    it('packageCreatingTypeReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingTypeReducer('', {
            type: 'setPackageCreatingTest',
            creatingType: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingTypeReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingTypeReducer('', {
            type: 'setPackageCreatingType',
            creatingType: 52,
          })
        ).toEqual('');

        expect(
          reducers.packageCreatingTypeReducer('', {
            type: 'setPackageCreatingType',
            creatingType: 'foo',
          })
        ).toEqual('');
    });

    it('packageCreatingTypeReducer should reject with setPackageCreating type and invalid type', () => {
        expect(
          reducers.packageCreatingTypeReducer('', {
            type: 'setPackageCreating',
            creating: {
                type: new Date(),
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingVersion state', () => {
        expect(reducers.packageCreatingVersionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingVersion with valid arguments', () => {
        expect(
          reducers.packageCreatingVersionReducer('', {
            type: 'setPackageCreatingVersion',
            version: '1.2.4',
          })
        ).toEqual('1.2.4');
    });

    it('packageCreatingVersionReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingVersionReducer('', {
            type: 'setPackageCreatingTest',
            version: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingVersionReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingVersionReducer('', {
            type: 'setPackageCreatingVersion',
            version: 23,
          })
        ).toEqual('');
    });

    it('packageCreatingVersionReducer should reject with setPackageCreating type and invalid version', () => {
        expect(
          reducers.packageCreatingVersionReducer('', {
            type: 'setPackageCreating',
            creating: {
                version: 158,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingDescription state', () => {
        expect(reducers.packageCreatingDescriptionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingDescription with valid arguments', () => {
        expect(
          reducers.packageCreatingDescriptionReducer('', {
            type: 'setPackageCreatingDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('packageCreatingDescriptionReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingDescriptionReducer('', {
            type: 'setPackageCreatingTest',
            description: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingDescriptionReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingDescriptionReducer('', {
            type: 'setPackageCreatingDescription',
            description: 86,
          })
        ).toEqual('');
    });

    it('packageCreatingDescriptionReducer should reject with setPackageCreating type and invalid description', () => {
        expect(
          reducers.packageCreatingDescriptionReducer('', {
            type: 'setPackageCreating',
            creating: {
                description: 159,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingHomepage state', () => {
        expect(reducers.packageCreatingHomepageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingHomepage with valid arguments', () => {
        expect(
          reducers.packageCreatingHomepageReducer('', {
            type: 'setPackageCreatingHomepage',
            homepage: 'testerson.com',
          })
        ).toEqual('testerson.com');
    });

    it('packageCreatingHomepageReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingHomepageReducer('', {
            type: 'setPackageCreatingTest',
            homepage: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingHomepageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingHomepageReducer('', {
            type: 'setPackageCreatingHomepage',
            homepage: 7767,
          })
        ).toEqual('');
    });

    it('packageCreatingHomepageReducer should reject with setPackageCreating type and invalid homepage', () => {
        expect(
          reducers.packageCreatingHomepageReducer('', {
            type: 'setPackageCreating',
            creating: {
                homepage: 165,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingJs state', () => {
        expect(reducers.packageCreatingJsReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingJs with valid arguments', () => {
        expect(
          reducers.packageCreatingJsReducer('', {
            type: 'setPackageCreatingJs',
            js: 'test js',
          })
        ).toEqual('test js');
    });

    it('packageCreatingJsReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingJsReducer('', {
            type: 'setPackageCreatingTest',
            js: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingJsReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingJsReducer('', {
            type: 'setPackageCreatingJs',
            js: 7767,
          })
        ).toEqual('');
    });

    it('packageCreatingJsReducer should reject with setPackageCreating type and invalid js', () => {
        expect(
          reducers.packageCreatingJsReducer('', {
            type: 'setPackageCreating',
            creating: {
                js: 168,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingCss state', () => {
        expect(reducers.packageCreatingCssReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingCss with valid arguments', () => {
        expect(
          reducers.packageCreatingCssReducer('', {
            type: 'setPackageCreatingCss',
            css: 'test css',
          })
        ).toEqual('test css');
    });

    it('packageCreatingCssReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingCssReducer('', {
            type: 'setPackageCreatingTest',
            css: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingCssReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingCssReducer('', {
            type: 'setPackageCreatingCss',
            css: 324,
          })
        ).toEqual('');
    });

    it('packageCreatingCssReducer should reject with setPackageCreating type and invalid css', () => {
        expect(
          reducers.packageCreatingCssReducer('', {
            type: 'setPackageCreating',
            creating: {
                css: 1956,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingKeywords state', () => {
        expect(reducers.packageCreatingKeywordsReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingKeywords with valid arguments', () => {
        expect(
          reducers.packageCreatingKeywordsReducer('', {
            type: 'setPackageCreatingKeywords',
            keywords: 'test keywords keyword',
          })
        ).toEqual('test keywords keyword');
    });

    it('packageCreatingKeywordsReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingKeywordsReducer('', {
            type: 'setPackageCreatingTest',
            keywords: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingKeywordsReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingKeywordsReducer('', {
            type: 'setPackageCreatingKeywords',
            keywords: 659,
          })
        ).toEqual('');
    });

    it('packageCreatingKeywordsReducer should reject with setPackageCreating type and invalid keywords', () => {
        expect(
          reducers.packageCreatingKeywordsReducer('', {
            type: 'setPackageCreating',
            creating: {
                keywords: 659865,
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingTag state', () => {
        expect(reducers.packageCreatingTagReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingTag with valid arguments', () => {
        expect(
          reducers.packageCreatingTagReducer('', {
            type: 'setPackageCreatingTag',
            tag: 'test tag',
          })
        ).toEqual('test tag');
    });

    it('packageCreatingTagReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingTagReducer('', {
            type: 'setPackageCreatingTest',
            tag: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingTagReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingTagReducer('', {
            type: 'setPackageCreatingTag',
            tag: 345,
          })
        ).toEqual('');
    });

    it('packageCreatingTagReducer should reject with setPackageCreating type and invalid tag', () => {
        expect(
          reducers.packageCreatingTagReducer('', {
            type: 'setPackageCreating',
            creating: {
                tag: [],
            },
          })
        ).toEqual('');
    });

    it('should return the initial packageCreatingMessage state', () => {
        expect(reducers.packageCreatingMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setPackageCreatingMessage with valid arguments', () => {
        expect(
          reducers.packageCreatingMessageReducer('', {
            type: 'setPackageCreatingMessage',
            message: 'this is a test message',
          })
        ).toEqual('this is a test message');
    });

    it('packageCreatingMessageReducer should reject with invalid type', () => {
        expect(
          reducers.packageCreatingMessageReducer('', {
            type: 'setPackageCreatingTest',
            message: 'this will fail',
          })
        ).toEqual('');
    });

    it('packageCreatingMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.packageCreatingMessageReducer('', {
            type: 'setPackageCreatingMessage',
            message: 545,
          })
        ).toEqual('');
    });
});