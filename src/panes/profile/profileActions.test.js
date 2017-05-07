import * as actions from './profileActions';

describe('profile action unit tests', () => {
    it('creates a valid setProfile action', () => {
        const profile = {
        	test: 'testing',
        };

        const object = {
            profile,
            type: 'setProfile',
        };

        expect(actions.setProfile(profile)).toEqual(object);
    });

    it('creates a valid setProfileId action', () => {
        const id = 4;

        const object = {
            id,
            type: 'setProfileId',
        };

        expect(actions.setProfileId(id)).toEqual(object);
    });

    it('creates a valid setProfileDateCreated action', () => {
        const dateCreated = 10000;

        const object = {
            dateCreated,
            type: 'setProfileDateCreated',
        };

        expect(actions.setProfileDateCreated(dateCreated)).toEqual(object);
    });

    it('creates a valid setProfileDateCreatedVisible action', () => {
        const visible = false;

        const object = {
            visible,
            type: 'setProfileDateCreatedVisible',
        };

        expect(actions.setProfileDateCreatedVisible(visible)).toEqual(object);
    });

    it('creates a valid setProfileName action', () => {
        const name = 'tester';

        const object = {
            name,
            type: 'setProfileName',
        };

        expect(actions.setProfileName(name)).toEqual(object);
    });

    it('creates a valid setProfileNameVisible action', () => {
        const visible = false;

        const object = {
            visible,
            type: 'setProfileNameVisible',
        };

        expect(actions.setProfileNameVisible(visible)).toEqual(object);
    });

    it('creates a valid setProfileDescription action', () => {
        const description = 'we are testing';

        const object = {
            description,
            type: 'setProfileDescription',
        };

        expect(actions.setProfileDescription(description)).toEqual(object);
    });

    it('creates a valid setProfileEmail action', () => {
        const email = 'testing@tester.test';

        const object = {
            email,
            type: 'setProfileEmail',
        };

        expect(actions.setProfileEmail(email)).toEqual(object);
    });

    it('creates a valid setProfileEmailVisible action', () => {
        const visible = false;

        const object = {
            visible,
            type: 'setProfileEmailVisible',
        };

        expect(actions.setProfileEmailVisible(visible)).toEqual(object);
    });

    it('creates a valid setProfileHomepage action', () => {
        const homepage = 'tester.test';

        const object = {
            homepage,
            type: 'setProfileHomepage',
        };

        expect(actions.setProfileHomepage(homepage)).toEqual(object);
    });

    it('creates a valid setProfilePackages action', () => {
        const packages = [];

        const object = {
            packages,
            type: 'setProfilePackages',
        };

        expect(actions.setProfilePackages(packages)).toEqual(object);
    });

    it('creates a valid setProfileDateStyle action', () => {
        const dateStyle = 'ddmm';

        const object = {
            dateStyle,
            type: 'setProfileDateStyle',
        };

        expect(actions.setProfileDateStyle(dateStyle)).toEqual(object);
    });

    it('creates a valid setProfileTimeStyle action', () => {
        const timeStyle = '24h';

        const object = {
            timeStyle,
            type: 'setProfileTimeStyle',
        };

        expect(actions.setProfileTimeStyle(timeStyle)).toEqual(object);
    });

    it('creates a valid setProfileMessage action', () => {
        const message = 'this is a test message';

        const object = {
            message,
            type: 'setProfileMessage',
        };

        expect(actions.setProfileMessage(message)).toEqual(object);
    });

    it('creates a valid setProfileRollback action', () => {
        const rollback = {};

        const object = {
            rollback,
            type: 'setProfileRollback',
        };

        expect(actions.setProfileRollback(rollback)).toEqual(object);
    });
});