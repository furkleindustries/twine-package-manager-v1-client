import * as reducers from './profileReducers';

describe('profile reducer unit tests', () => {
    it('should return the initial profile ID state', () => {
        expect(reducers.profileIdReducer(undefined, {})).toEqual(null);
    });

    it('should handle setProfileId', () => {
        expect(
          reducers.profileIdReducer('', {
            type: 'setProfileId',
            id: 64,
          })
        ).toEqual(64);
    });

    it('should return the initial profile name state', () => {
        expect(reducers.profileNameReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileName', () => {
        expect(
          reducers.profileNameReducer('', {
            type: 'setProfileName',
            name: 'test testerson',
          })
        ).toEqual('test testerson');
    });

    it('should return the initial profile name visible state', () => {
        expect(reducers.profileNameVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setProfileNameVisible', () => {
        expect(
          reducers.profileNameVisibleReducer('', {
            type: 'setProfileNameVisible',
            nameVisible: true,
          })
        ).toEqual(true);
    });

    it('should return the initial profile description state', () => {
        expect(reducers.profileDescriptionReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileDescription', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('should return the initial profile description state', () => {
        expect(reducers.profileDescriptionReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileDescription', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('should return the initial profile dateCreated state', () => {
        expect(reducers.profileDateCreatedReducer(undefined, {})).toEqual(null);
    });

    it('should handle setProfileDateCreated', () => {
        expect(
          reducers.profileDateCreatedReducer('', {
            type: 'setProfileDateCreated',
            dateCreated: 60000,
          })
        ).toEqual(60000);
    });

    it('should return the initial profile description state', () => {
        expect(reducers.profileDescriptionReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileDescription', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileDescription',
            description: 'this is a test description',
          })
        ).toEqual('this is a test description');
    });

    it('should return the initial profile dateCreatedVisible state', () => {
        expect(reducers.profileDateCreatedVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setProfileDateVisibleCreated', () => {
        expect(
          reducers.profileDateCreatedVisibleReducer('', {
            type: 'setProfileDateCreatedVisible',
            dateCreatedVisible: true,
          })
        ).toEqual(true);
    });

    it('should return the initial profile email state', () => {
        expect(reducers.profileEmailReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileEmail', () => {
        expect(
          reducers.profileEmailReducer('', {
            type: 'setProfileEmail',
            email: 'test@testerson.test',
          })
        ).toEqual('test@testerson.test');
    });

    it('should return the initial profile email visible state', () => {
        expect(reducers.profileEmailVisibleReducer(undefined, {})).toEqual(false);
    });

    it('should handle setProfileEmailVisible', () => {
        expect(
          reducers.profileEmailVisibleReducer('', {
            type: 'setProfileEmailVisible',
            emailVisible: true,
          })
        ).toEqual(true);
    });

    it('should return the initial profile homepage state', () => {
        expect(reducers.profileHomepageReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileHomepage', () => {
        expect(
          reducers.profileHomepageReducer('', {
            type: 'setProfileHomepage',
            homepage: 'testerson.com/testing',
          })
        ).toEqual('testerson.com/testing');
    });

    it('should return the initial profile dateStyle state', () => {
        expect(reducers.profileDateStyleReducer(undefined, {})).toEqual('mmdd');
    });

    it('should handle setProfileDateStyle', () => {
        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileDateStyle',
            dateStyle: 'ddmm',
          })
        ).toEqual('ddmm');
    });

    it('should return the initial profile timeStyle state', () => {
        expect(reducers.profileTimeStyleReducer(undefined, {})).toEqual('12h');
    });

    it('should handle setProfileTimeStyle', () => {
        expect(
          reducers.profileTimeStyleReducer('', {
            type: 'setProfileTimeStyle',
            timeStyle: '24h',
          })
        ).toEqual('24h');
    });

    it('should return the initial profile packages state', () => {
        expect(reducers.profilePackagesReducer(undefined, {})).toEqual([]);
    });

    it('should handle setProfilePackages', () => {
        expect(
          reducers.profilePackagesReducer('', {
            type: 'setProfilePackages',
            packages: [1, 2, 3],
          })
        ).toEqual([1, 2, 3]);
    });

    it('should return the initial profile editing state', () => {
        expect(reducers.profileEditingReducer(undefined, {})).toEqual(false);
    });

    it('should handle setProfileEditing', () => {
        expect(
          reducers.profileEditingReducer('', {
            type: 'setProfileEditing',
            editing: true,
          })
        ).toEqual(true);
    });

    it('should return the initial profile error state', () => {
        expect(reducers.profileErrorReducer(undefined, {})).toEqual('');
    });

    it('should handle setProfileError', () => {
        expect(
          reducers.profileErrorReducer('', {
            type: 'setProfileError',
            error: 'this is a testing error',
          })
        ).toEqual('this is a testing error');
    });

    it('should return the initial profile rollback state', () => {
        expect(reducers.profileRollbackReducer(undefined, {})).toEqual(null);
    });

    it('should handle setProfileRollback', () => {
        expect(
          reducers.profileRollbackReducer('', {
            type: 'setProfileRollback',
            rollback: {},
          })
        ).toEqual({});
    });
});