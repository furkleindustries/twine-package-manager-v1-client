/* react */
import React from 'react';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* redux */
const store = {};
store.dispatch = jest.fn();

/* components */
import { App, } from './App';
import { Home, } from '../pages/index';

/* modules */
jest.mock('./modules/loginRender');
import loginRender from './modules/loginRender';

jest.mock('./modules/isRunningNodeJs');
import isRunningNodeJs from './modules/isRunningNodeJs';

jest.mock('./modules/modals/factories');
import * as modalFactories from './modules/modals/factories';

describe('app unit tests', () => {
    beforeEach(() => {
        delete window.onhashchange;
        store.dispatch.mockClear();
    });

    it('renders App', () => {
        const wrapper = shallow(<App children={Home} />);
        expect(wrapper.length).toEqual(1);
    });

    it('unhides modal container when modal prop is present', () => {
        const modal = <div className="__test"></div>
        const wrapper = shallow(<App modal={modal} children={Home} />);
        expect(wrapper.find('.Modal-container').length).toBe(1);
        expect(wrapper.find('.Modal-container.hidden').length).toBe(0);
    });

    it('saves anti-csrf token', () => {
        window.localStorage = {
            twinepmCSRFToken: 'foobarbaz',
        };

        const wrapper = shallow(<App dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual(
            [
                {
                    csrfToken: 'foobarbaz',
                    type: 'setCSRFToken',
                },
            ],
        );
    });

    it('saves search options', () => {
        window.localStorage = {
            twinepmSearchOptions: '{}',
        };

        const wrapper = shallow(<App dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual(
            [
                {
                    searchOptions: {},
                    type: 'setSearchOptions',
                },
            ],
        );
    });

    it('rejects search options and logs message if not deserializable', () => {
        const log = console.log;
        console.log = jest.fn();

        window.localStorage = {
            twinepmSearchOptions: 'fdj{kl',
        };

        const wrapper = shallow(<App dispatch={store.dispatch} />);
        wrapper.instance().componentDidMount();

        expect(store.dispatch.mock.calls.length).toEqual(0);
        expect(console.log.mock.calls.length).toBe(1);

        console.log = log;
    });

    it('handles #rules hash change', () => {
        const app = <App
            children={Home}
            appSelectedPane="about"
            dispatch={store.dispatch} />;

        window.location.hash = '#rules';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.rules.mock.calls.length).toEqual(1);
        expect(modalFactories.rules.mock.calls[0]).toEqual([
            store.dispatch,
        ]);
    });

    it('adds a hash change listener to the window if we\'re running client-side', () => {
        isRunningNodeJs.mockImplementationOnce(() => false)

        const app = <App />;
        const wrapper = shallow(app);
        wrapper.instance().componentDidMount();

        expect(window.onhashchange).toBe(wrapper.instance().handleHashChange);
    });

    it('does not add a hash change listener to the window if we\'re running server-side', () => {
        isRunningNodeJs.mockImplementationOnce(() => true)


        const app = <App />;
        const wrapper = shallow(app);
        wrapper.instance().componentDidMount();

        expect(window.onhashchange).toBe(undefined);
    });

    it('handles #createAccount hash change', () => {
        const app = <App
            children={Home}
            appSelectedPane="login"
            dispatch={store.dispatch} />;

        window.location.hash = '#createAccount';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.accountCreate.mock.calls.length).toEqual(1);
        expect(modalFactories.accountCreate.mock.calls[0]).toEqual([
            store.dispatch,
        ]);
    });

    it('handles #deleteAccount hash change', () => {
        const app = <App
            children={Home}
            appSelectedPane="profile"
            dispatch={store.dispatch} />;

        window.location.hash = '#deleteAccount';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.accountDelete.mock.calls.length).toEqual(1);
        expect(modalFactories.accountDelete.mock.calls[0]).toEqual([
            store.dispatch,
        ]);
    });

    it('handles #togglePackagePublish-\d+ hash change', () => {
        const profile = {
            packages: [
                {
                    id: 14,
                    published: true,
                },
            ],
        };

        const app = <App
            children={Home}
            appSelectedPane="profile"
            profile={profile}
            dispatch={store.dispatch} />;

        window.location.hash = '#togglePackagePublish-14';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.togglePackagePublish.mock.calls.length)
            .toEqual(1);
        expect(modalFactories.togglePackagePublish.mock.calls[0])
            .toEqual([ store.dispatch, 14, ]);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                publishing: {
                    id: 14,
                    published: true,
                },

                type: 'setPackagePublishing',
            },
        ]);
    });

    it('rejects #togglePackagePublish-\d+ hash change with invalid \d+', () => {
        modalFactories.togglePackagePublish.mockClear();

        const profile = {
            packages: [
                {
                    id: 17,
                    published: true,
                },
            ],
        };

        const app = <App
            children={Home}
            appSelectedPane="profile"
            profile={profile} />;

        window.location.hash = '#togglePackagePublish-14';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.togglePackagePublish.mock.calls.length)
            .toEqual(0);
        expect(store.dispatch.mock.calls.length).toEqual(0);
    });

    it('handles #editPackage-\d+ hash change', () => {
        const profile = {
            packages: [
                {
                    id: 15,
                },
            ],
        };

        const app = <App
            children={Home}
            appSelectedPane="profile"
            profile={profile}
            dispatch={store.dispatch} />;

        window.location.hash = '#editPackage-15';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.packageEdit.mock.calls.length).toEqual(1);
        expect(modalFactories.packageEdit.mock.calls[0]).toEqual([
            store.dispatch,
            15,
        ]);
        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            {
                editing: {
                    id: 15,
                },

                type: 'setPackageEditing',
            },
        ]);
    });

    it('rejects #editPackage-\d+ hash change with invalid \d+', () => {
        modalFactories.packageEdit.mockClear();

        const profile = {
            packages: [
                {
                    id: 21,
                },
            ],
        };

        const app = <App
            children={Home}
            appSelectedPane="profile"
            profile={profile}
            dispatch={store.dispatch} />;


        window.location.hash = '#editPackage-12';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.packageEdit.mock.calls.length).toEqual(0);
        expect(store.dispatch.mock.calls.length).toEqual(0);
    });

    it('handles #deletePackage-\d+ hash change', () => {
        const profile = {
            packages: [
                {
                    id: 16,
                },
            ],
        };

        const app = <App
            children={Home}
            appSelectedPane="profile"
            profile={profile}
            dispatch={store.dispatch} />;

        window.location.hash = '#deletePackage-16';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.packageDelete.mock.calls.length).toEqual(1);
        expect(modalFactories.packageDelete.mock.calls[0]).toEqual([
            store.dispatch,
            16,
        ]);

        expect(store.dispatch.mock.calls.length).toEqual(1);
        expect(store.dispatch.mock.calls[0]).toEqual([{
            deleting: 16,
            type: 'setPackageDeleting',
        }]);
    });

    it('handles #createNewPackage hash change', () => {
        const app = <App
            children={Home}
            appSelectedPane="profile"
            dispatch={store.dispatch} />;

        window.location.hash = '#createNewPackage';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.packageCreate.mock.calls.length).toEqual(1);
        expect(modalFactories.packageCreate.mock.calls[0]).toEqual([
            store.dispatch,
        ]);
    });

    it('handles handleHashChange with invalid selectedPane', () => {
        modalFactories.packageCreate.mockClear();

        const app = <App children={Home} appSelectedPane="foobar" />;

        window.location.hash = '#createNewPackage';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.packageCreate.mock.calls.length).toEqual(0);
    });

    it('handles handleHashChange on profile with invalid hash', () => {
        Object.keys(modalFactories).forEach(name => {
            if (typeof modalFactories[name] === 'function' &&
                'mockClear' in modalFactories[name])
            {
                modalFactories[name].mockClear();
            }
        });

        const app = <App children={Home} appSelectedPane="profile" />;

        window.location.hash = '#foobarbux';

        const wrapper = shallow(app);

        wrapper.instance().handleHashChange();

        expect(modalFactories.accountDelete.mock.calls.length).toEqual(0);
        expect(modalFactories.togglePackagePublish.mock.calls.length)
            .toEqual(0);
        expect(modalFactories.packageEdit.mock.calls.length).toEqual(0);
        expect(modalFactories.packageDelete.mock.calls.length).toEqual(0);
        expect(modalFactories.packageCreate.mock.calls.length).toEqual(0);
    });
});