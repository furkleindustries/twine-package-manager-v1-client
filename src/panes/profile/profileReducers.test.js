import * as reducers from './profileReducers';

describe('profile reducer unit tests', () => {
    it('should return the initial profile state', () => {
        const object = {
            id: null,
            dateCreated: null,
            dateCreatedVisible: false,
            name: '',
            nameVisible: false,
            email: '',
            emailVisible: false,
            description: '',
            homepage: '',
            dateStyle: 'mmdd',
            timeStyle: '12h',
            rollback: null,
            packages: [],
        };

        expect(reducers.profileReducer(undefined, {}))
            .toEqual(object);
    });

    it('should handle setProfile with valid arguments', () => {
        const previous = {
            id: null,
            dateCreated: null,
            dateCreatedVisible: false,
            name: '',
            nameVisible: false,
            email: '',
            emailVisible: false,
            description: '',
            homepage: '',
            dateStyle: 'mmdd',
            timeStyle: '12h',
            rollback: null,
            packages: [],
        };

        const object = {
            id: 15,
            dateCreated: 16878,
            dateCreatedVisible: true,
            name: 'foobar',
            nameVisible: true,
            email: 'bazbar@buxbaz.com',
            emailVisible: true,
            description: 'test description',
            homepage: 'testing.com',
            dateStyle: 'ddmm',
            timeStyle: '24h',
            rollback: { foo: 'bar', },
            packages: [6, 8, 9],
        };

        const action = {
            type: 'setProfile',
            profile: object,
        };

        expect(reducers.profileReducer(previous, action)).toEqual(object);
    });

    it('should return the initial profileId state', () => {
        expect(reducers.profileIdReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setProfileId with valid arguments', () => {
        expect(
          reducers.profileIdReducer('', {
            type: 'setProfileId',
            id: 12,
          })
        ).toEqual(12);
    });

    it('profileIdReducer should reject with invalid type', () => {
        expect(
          reducers.profileIdReducer('', {
            type: 'setProfileTest',
            id: 'will fail',
          })
        ).toEqual('');
    });

    it('profileIdReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileIdReducer('', {
            type: 'setProfileId',
            id: 'not a number',
          })
        ).toEqual('');
    });

    it('handles profileIdReducer correctly when type is setProfile and profile.id is null', () => {
        expect(
            reducers.profileIdReducer('', {
                type: 'setProfile',
                profile: { id: null, },
            })
        ).toEqual(null);
    });

    it('handles profileIdReducer correctly when type is setProfile and profile.id is out of band', () => {
        expect(
            reducers.profileIdReducer('', {
                type: 'setProfile',
                profile: {}
            })
        ).toEqual('');
    });

    it('should return the initial profileName state', () => {
        expect(reducers.profileNameReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setProfileName with valid arguments', () => {
        expect(
          reducers.profileNameReducer('', {
            type: 'setProfileName',
            name: 'ms. tester',
          })
        ).toEqual('ms. tester');
    });

    it('profileNameReducer should reject with invalid type', () => {
        expect(
          reducers.profileNameReducer('', {
            type: 'setProfileTest',
            name: 'must fail',
          })
        ).toEqual('');
    });

    it('profileNameReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileNameReducer('', {
            type: 'setProfileName',
            name: 447,
          })
        ).toEqual('');
    });

    it('profileNameReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileNameReducer('', {
                type: 'setProfile',
                profile: { name: 23435, }
            })
        );
    });

    it('should return the initial profileNameVisible state', () => {
        expect(reducers.profileNameVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setProfileNameVisible with valid arguments', () => {
        expect(
          reducers.profileNameVisibleReducer('', {
            type: 'setProfileNameVisible',
            visible: true,
          })
        ).toEqual(true);
    });

    it('profileNameVisibleReducer should reject with invalid type', () => {
        expect(
          reducers.profileNameVisibleReducer('', {
            type: 'setProfileTest',
            visible: false,
          })
        ).toEqual('');
    });

    it('profileNameVisibleReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileNameVisibleReducer('', {
            type: 'setProfileNameVisible',
            visible: 'not a boolean',
          })
        ).toEqual('');
    });

    it('profileNameVisibleReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileNameVisibleReducer('', {
                type: 'setProfile',
                profile: { nameVisible: [], },
            })
        );
    });

    it('should return the initial profileDescription state', () => {
        expect(reducers.profileDescriptionReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setProfileDescription with valid arguments', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileDescription',
            description: 'test description',
          })
        ).toEqual('test description');
    });

    it('profileDescriptionReducer should reject with invalid type', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileTest',
            description: 'will fail',
          })
        ).toEqual('');
    });

    it('profileDescriptionReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileDescriptionReducer('', {
            type: 'setProfileDescription',
            description: 4498,
          })
        ).toEqual('');
    });

    it('profileDescriptionReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileDescriptionReducer('', {
                type: 'setProfile',
                profile: { description: {}, },
            })
        );
    });

    it('should return the initial profileDateCreated state', () => {
        expect(reducers.profileDateCreatedReducer(undefined, {}))
            .toEqual(null);
    });

    it('should handle setProfileDateCreated with valid arguments', () => {
        expect(
          reducers.profileDateCreatedReducer('', {
            type: 'setProfileDateCreated',
            dateCreated: 19,
          })
        ).toEqual(19);
    });

    it('profileDateCreatedReducer should reject with invalid type', () => {
        expect(
          reducers.profileDateCreatedReducer('', {
            type: 'setProfileTest',
            dateCreated: 1246,
          })
        ).toEqual('');
    });

    it('profileDateCreatedReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileDateCreatedReducer('', {
            type: 'setProfileDateCreated',
            dateCreated: 'not a number',
          })
        ).toEqual('');
    });

    it('profileDateCreatedReducer should succeed with type of setProfile and action.dateCreated of null', () => {
        expect(
            reducers.profileDateCreatedReducer('', {
                type: 'setProfile',
                profile: { dateCreated: null, },
            })
        ).toBe(null);
    });

    it('profileDateCreatedReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileDateCreatedReducer('', {
                type: 'setProfile',
                profile: { dateCreated: 'not a number', },
            })
        ).toBe('');
    });

    it('should return the initial profileDateCreatedVisible state', () => {
        expect(reducers.profileDateCreatedVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setProfileDateCreatedVisible with valid arguments', () => {
        expect(
          reducers.profileDateCreatedVisibleReducer('', {
            type: 'setProfileDateCreatedVisible',
            visible: true,
          })
        ).toEqual(true);
    });

    it('profileDateCreatedVisibleReducer should reject with invalid type', () => {
        expect(
          reducers.profileDateCreatedVisibleReducer('', {
            type: 'setProfileTest',
            visible: false,
          })
        ).toEqual('');
    });

    it('profileDateCreatedVisibleReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileDateCreatedVisibleReducer('', {
            type: 'setProfileDateCreatedVisible',
            visible: 'not a boolean',
          })
        ).toEqual('');
    });

    it('profileDateCreatedVisibleReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileDateCreatedVisibleReducer('', {
                type: 'setProfile',
                profile: { dateCreatedVisible: 'not a boolean', },
            })
        ).toBe('');
    });

    it('should return the initial profileEmail state', () => {
        expect(reducers.profileEmailReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setProfileEmail with valid arguments', () => {
        expect(
          reducers.profileEmailReducer('', {
            type: 'setProfileEmail',
            email: 'email@email.com',
          })
        ).toEqual('email@email.com');
    });

    it('profileEmailReducer should reject with invalid type', () => {
        expect(
          reducers.profileEmailReducer('', {
            type: 'setProfileTest',
            email: 'will@fail.com',
          })
        ).toEqual('');
    });

    it('profileEmailReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileEmailReducer('', {
            type: 'setProfileEmail',
            email: 124,
          })
        ).toEqual('');
    });

    it('profileEmailReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileEmailReducer('', {
                type: 'setProfile',
                profile: { email: 12466, },
            })
        ).toBe('');
    });

    it('should return the initial profileEmailVisible state', () => {
        expect(reducers.profileEmailVisibleReducer(undefined, {}))
            .toEqual(false);
    });

    it('should handle setProfileEmailVisible with valid arguments', () => {
        expect(
          reducers.profileEmailVisibleReducer('', {
            type: 'setProfileEmailVisible',
            visible: true,
          })
        ).toEqual(true);
    });

    it('profileEmailVisibleReducer should reject with invalid type', () => {
        expect(
          reducers.profileEmailVisibleReducer('', {
            type: 'setProfileTest',
            visible: false,
          })
        ).toEqual('');
    });

    it('profileEmailVisibleReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileEmailVisibleReducer('', {
            type: 'setProfileEmailVisible',
            visible: 'not a boolean either',
          })
        ).toEqual('');
    });

    it('profileEmailVisibleReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileEmailVisibleReducer('', {
                type: 'setProfile',
                profile: { emailVisible: 'not a bool', },
            })
        ).toBe('');
    });

    it('should return the initial profileHomepage state', () => {
        expect(reducers.profileHomepageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setProfileHomepage with valid arguments', () => {
        expect(
          reducers.profileHomepageReducer('', {
            type: 'setProfileHomepage',
            homepage: 'test.com',
          })
        ).toEqual('test.com');
    });

    it('profileHomepageReducer should reject with invalid type', () => {
        expect(
          reducers.profileHomepageReducer('', {
            type: 'setProfileTest',
            homepage: 'will fail too',
          })
        ).toEqual('');
    });

    it('profileHomepageReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileHomepageReducer('', {
            type: 'setProfileHomepage',
            homepage: 16,
          })
        ).toEqual('');
    });

    it('profileHomepageReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileHomepageReducer('', {
                type: 'setProfile',
                profile: { homepage: 1345, },
            })
        ).toBe('');
    });

    it('should return the initial profileDateStyle state', () => {
        expect(reducers.profileDateStyleReducer(undefined, {}))
            .toEqual('mmdd');
    });

    it('should handle setProfileDateStyle with valid arguments', () => {
        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileDateStyle',
            dateStyle: 'ddmm',
          })
        ).toEqual('ddmm');
    });

    it('profileDateStyleReducer should reject with invalid type', () => {
        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileTest',
            dateStyle: 'will fail',
          })
        ).toEqual('');
    });

    it('profileDateStyleReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileDateStyle',
            dateStyle: 1443,
          })
        ).toEqual('');

        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileDateStyle',
            dateStyle: 'foobaz',
          })
        ).toEqual('');
    });

    it('profileDateStyleReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileDateStyleReducer('', {
                type: 'setProfile',
                profile: { dateStyle: 'not mmdd or ddmm', },
            })
        ).toBe('');
    });

    it('should return the initial profileTimeStyle state', () => {
        expect(reducers.profileTimeStyleReducer(undefined, {}))
            .toEqual('12h');
    });

    it('should handle setProfileTimeStyle with valid arguments', () => {
        expect(
          reducers.profileTimeStyleReducer('', {
            type: 'setProfileTimeStyle',
            timeStyle: '24h',
          })
        ).toEqual('24h');
    });

    it('profileTimeStyleReducer should reject with invalid type', () => {
        expect(
          reducers.profileTimeStyleReducer('', {
            type: 'setProfileTest',
            timeStyle: '12h',
          })
        ).toEqual('');
    });

    it('profileTimeStyleReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileTimeStyleReducer('', {
            type: 'setProfileTimeStyle',
            timeStyle: 1444,
          })
        ).toEqual('');

        expect(
          reducers.profileTimeStyleReducer('', {
            type: 'setProfileTimeStyle',
            timeStyle: 'bazbar',
          })
        ).toEqual('');
    });

    it('profileTimeStyleReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileTimeStyleReducer('', {
                type: 'setProfile',
                profile: { timeStyle: 'not 12h or 24h', },
            })
        ).toBe('');
    });

    it('should return the initial profilePackages` state', () => {
        expect(reducers.profilePackagesReducer(undefined, {}))
            .toEqual([]);
    });

    it('should handle setProfilePackages with valid arguments', () => {
        expect(
          reducers.profilePackagesReducer('', {
            type: 'setProfilePackages',
            packages: [1, 2, 3],
          })
        ).toEqual([1, 2, 3]);
    });

    it('profilePackagesReducer should reject with invalid type', () => {
        expect(
          reducers.profilePackagesReducer('', {
            type: 'setProfileTest',
            packages: [4, 5, 6],
          })
        ).toEqual('');
    });

    it('profilePackagesReducer should reject with invalid arguments', () => {
        expect(
          reducers.profilePackagesReducer('', {
            type: 'setProfilePackages',
            packages: 1447,
          })
        ).toEqual('');

        expect(
          reducers.profileDateStyleReducer('', {
            type: 'setProfileDateStyle',
            packages: {},
          })
        ).toEqual('');
    });

    it('profilePackagesReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profilePackagesReducer('', {
                type: 'setProfile',
                profile: { packages: 'not an array-like-object', },
            })
        ).toBe('');
    });

    it('should return the initial profileMessage state', () => {
        expect(reducers.profileMessageReducer(undefined, {}))
            .toEqual('');
    });

    it('should handle setProfileMessage with valid arguments', () => {
        expect(
          reducers.profileMessageReducer('', {
            type: 'setProfileMessage',
            message: 'foo bar basz',
          })
        ).toEqual('foo bar basz');
    });

    it('profileMessage should reject with invalid type', () => {
        expect(
          reducers.profileMessageReducer('', {
            type: 'setProfileTest',
            message: 'will fail',
          })
        ).toEqual('');
    });

    it('profileMessageReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileMessageReducer('', {
            type: 'setProfileMessage',
            message: 1447,
          })
        ).toEqual('');
    });

    it('should return the initial profileRollback state', () => {
        expect(reducers.profileRollbackReducer(undefined, {})).toEqual(null);
    });

    it('should handle setProfileRollback with valid arguments', () => {
        expect(
          reducers.profileRollbackReducer('', {
            type: 'setProfileRollback',
            rollback: { foo: 'bar', },
          })
        ).toEqual({ foo: 'bar', });
    });

    it('profileRollbackReducer should reject with invalid type', () => {
        expect(
          reducers.profileRollbackReducer('', {
            type: 'setProfileTest',
            rollback: { foo: 'bar', },
          })
        ).toEqual('');
    });

    it('profileRollbackReducer should reject with invalid arguments', () => {
        expect(
          reducers.profileRollbackReducer('', {
            type: 'setProfileRollback',
            rollback: 1448,
          })
        ).toEqual('');
    });

    it('profileRollbackReducer should reject with type of setProfile and invalid arguments', () => {
        expect(
            reducers.profileRollbackReducer('', {
                type: 'setProfile',
                profile: { rollback: 'not an object', },
            })
        ).toBe('');
    });
});