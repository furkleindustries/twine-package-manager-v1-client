/* react */
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Router from 'next/router';

/* enzyme */
import { shallow, mount, } from 'enzyme';

/* next */
jest.mock('next/router');

/* redux */
const store = {};
store.dispatch = jest.fn();
store.getState = jest.fn();

jest.mock('../../appActions');
import {
    setAppSelectedPane,
    setSideBarVisible,
} from '../../appActions';

jest.mock('./searchActions');
import {
    setSearchedYet,
    setSearchQuery,
    setSearchResults,
    setSearchOptionsVisible,
    setSearchType,
    setSearchSubtype,
    setSearchFilterTargets,
    setSearchFilterStyle,
    setSearchSortTarget,
    setSearchSortStyle,
    setSearchSortDirection,
    setSearchDateCreatedRange,
    setSearchDateModifiedRange,
    setSearchVersionRange,
    setSearchMessage,
} from './searchActions';

const actionMocks = {
    setAppSelectedPane,
    setSideBarVisible,
    setSearchedYet,
    setSearchQuery,
    setSearchResults,
    setSearchOptionsVisible,
    setSearchType,
    setSearchSubtype,
    setSearchFilterTargets,
    setSearchFilterStyle,
    setSearchSortTarget,
    setSearchSortStyle,
    setSearchSortDirection,
    setSearchDateCreatedRange,
    setSearchDateModifiedRange,
    setSearchVersionRange,
    setSearchMessage,
};

Object.keys(actionMocks).forEach(key => {
    actionMocks[key].mockImplementation(() => ( { type: key, } ));
});

/* modules */
jest.mock('../../modules/unixTimeToSettingsTime');
import unixTimeToSettingsTime from '../../modules/unixTimeToSettingsTime';

jest.mock('../../modules/search');
import search from '../../modules/search';

/* components */
import ConnectedSearch, {
    SearchPage,
    getInitialProps,
} from '../../../pages/search';

describe('Search tests', () => {
    beforeEach(() => {
        window.localStorage = {};
        unixTimeToSettingsTime.mockClear();
        store.dispatch.mockClear();

        Object.keys(actionMocks).forEach(key => {
            actionMocks[key].mockClear();
        });

    });

    it('renders the connected Search component', () => {
        const wrapper = mount(<ConnectedSearch />);
        expect(wrapper.length).toEqual(1);
    });

    it('hides the sidebar when mounted', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);    
        wrapper.instance().componentDidMount();

        expect(setSideBarVisible.mock.calls.length).toBe(1);
        expect(setSideBarVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSideBarVisible', },
        ]);
    });

    it('creates Result components from props.results', () => {
        const results = [
            { id: 101, },
            { id: 102, },
        ];

        const wrapper = mount(<SearchPage dispatch={store.dispatch} results={results} />);

        expect(wrapper.find('Result').length).toBe(2);
    });

    it('writes a message if there are no results and props.searchedYet is truthy', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} searchedYet={true} />);
        expect(wrapper.text().indexOf('No results.')).not.toBe(-1);
    });

    it('makes the description form element disabled when props.filterStyle is out of band', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} filterStyle="similarity" />);
        const targetWrapper = wrapper.find('#Search-filterTargetDescription');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.disabled).toBe('disabled');
    });

    it('properly formats displayed filter style when props.filterStyle is metaphone/contains', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} filterStyle="metaphone/contains" />);
        const targetWrapper = wrapper.find('#Search-filterStyle');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('Metaphone/Contains');
    });

    it('properly formats displayed filter style when props.filterStyle is soundex/levenshtein', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} filterStyle="soundex/levenshtein" />);
        const targetWrapper = wrapper.find('#Search-filterStyle');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('Soundex/Levenshtein');
    });

    it('properly formats displayed filter style when props.filterStyle is metaphone/levenshtein', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} filterStyle="metaphone/levenshtein" />);
        const targetWrapper = wrapper.find('#Search-filterStyle');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('Metaphone/Levenshtein');
    });

    it('properly formats displayed sort style when props.filterStyle is soundex/levenshtein', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} sortStyle="soundex/levenshtein" />);
        const targetWrapper = wrapper.find('#Search-sortStyle');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('Soundex/Levenshtein');
    });

    it('properly formats displayed sort style when initial result is metaphone/levenshtein', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} sortStyle="metaphone/levenshtein" />);
        const targetWrapper = wrapper.find('#Search-sortStyle');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('Metaphone/Levenshtein');
    });

    it('does not hide the optionsContainer when props.optionsVisible is truthy', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} optionsVisible={true} />);
        const targetWrapper = wrapper.find('.Search-optionsContainer');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.className.indexOf('hidden')).toBe(-1);
    });

    it('displays the sort target as ID rather than id or Id', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} sortTarget="id" />);
        const targetWrapper = wrapper.find('#Search-sortTarget');
        expect(targetWrapper.length).toBe(1);
        expect(targetWrapper.node.props.value).toBe('ID');
    });

    it('does not break when props.type is packages', () => {
        expect(() => {
            shallow(<SearchPage dispatch={store.dispatch} type="packages" />);
        }).not.toThrow();
    });

    it('does not break when autocomplete is called', () => {
        expect(() => {
            shallow(<SearchPage dispatch={store.dispatch} />).instance().autocomplete();
        }).not.toThrow();
    });

    it('calls search when searchKeyUp is called with e.keyCode of 13', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().search = jest.fn();
        wrapper.instance().searchKeyUp({ keyCode: 13, });
        expect(wrapper.instance().search.mock.calls.length).toBe(1);
    });

    it('does not call search when searchKeyUp is called with e.keyCode !== 13', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().search = jest.fn();
        wrapper.instance().searchKeyUp({
            keyCode: 14,
            target: { value: 'test', },
        });

        expect(wrapper.instance().search.mock.calls.length).toBe(0);
    });

    it('dispatches a created setSearchQuery action if e.keyCode !== 13', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().searchKeyUp({
            keyCode: 14,
            target: { value: 'testing', },
        });

        expect(setSearchQuery.mock.calls.length).toBe(1);
        expect(setSearchQuery.mock.calls[0]).toEqual([ 'testing', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchQuery', },
        ]);
    });

    it('fires autocomplete when e.keyCode !== 13, 32, and 46', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().autocomplete = jest.fn();
        wrapper.instance().searchKeyUp({
            keyCode: 15,
            target: { value: 'foo', },
        });

        expect(wrapper.instance().autocomplete.mock.calls.length).toBe(1);
    });

    it('does not fire autocomplete when e.keyCode === 13, 32, and 46', () => {
        let wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().search = jest.fn();
        wrapper.instance().autocomplete = jest.fn();
        wrapper.instance().searchKeyUp({
            keyCode: 13,
            target: { value: 'foo', },
        });
        
        expect(wrapper.instance().autocomplete.mock.calls.length).toBe(0);
        wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().search = jest.fn();
        wrapper.instance().autocomplete = jest.fn();
        wrapper.instance().searchKeyUp({
            keyCode: 32,
            target: { value: 'foo', },
        });

        expect(wrapper.instance().autocomplete.mock.calls.length).toBe(0);

        wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().search = jest.fn();
        wrapper.instance().autocomplete = jest.fn();
        wrapper.instance().searchKeyUp({
            keyCode: 46,
            target: { value: 'foo', },
        });
        
        expect(wrapper.instance().autocomplete.mock.calls.length).toBe(0);
    });

    it('handles side effects when toggleOptions is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} optionsVisible={true} />);
        wrapper.instance().toggleOptions();

        expect(setSearchOptionsVisible.mock.calls.length).toBe(1);
        expect(setSearchOptionsVisible.mock.calls[0]).toEqual([ false, ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchOptionsVisible', },
        ]);
    });

    it('handles side effects when serializeSearchOptions is called', () => {
        const component = (
            <SearchPage
                dispatch={store.dispatch}
                searchedYet={false}
                query="test query"
                results={[]}
                message="test message"
                optionsVisible={true}
                testing="test" />
        );

        const wrapper = shallow(component);

        wrapper.instance().serializeSearchOptions();

        expect(localStorage.twinepmSearchOptions).toBe(`{"testing":"test"}`);
    });

    it('handles side effects when setType is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setType({
            target: { value: 'foobar', },
        });

        expect(setSearchType.mock.calls.length).toBe(1);
        expect(setSearchType.mock.calls[0]).toEqual([ 'foobar', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchType', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setSubtype is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setSubtype({
            target: { value: 'test', },
        });

        expect(setSearchSubtype.mock.calls.length).toBe(1);
        expect(setSearchSubtype.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchSubtype', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends id to setSearchFilterStyle if this.filterTargetId is checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetId = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([ [ 'id', ], ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends name to setSearchFilterStyle if this.filterTargetName is checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetName = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([ [ 'name', ], ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends description to setSearchFilterStyle if this.filterTargetDescription is checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetDescription = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([
            [ 'description', ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends keywords to setSearchFilterStyle if this.filterTargetKeywords is checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetKeywords = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([
            [ 'keywords', ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends keywords to setSearchFilterStyle if this.filterTargetHomepage is checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetHomepage = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([
            [ 'homepage', ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('sends all fields to setSearchFilterStyle if all this.filterTargetX are checked', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().filterTargetId = { checked: true, };
        wrapper.instance().filterTargetName = { checked: true, };
        wrapper.instance().filterTargetDescription = { checked: true, };
        wrapper.instance().filterTargetKeywords = { checked: true, };
        wrapper.instance().filterTargetHomepage = { checked: true, };

        wrapper.instance().setFilterTargets();

        expect(setSearchFilterTargets.mock.calls.length).toBe(1); 
        expect(setSearchFilterTargets.mock.calls[0]).toEqual([
            [
                'id',
                'name',
                'description',
                'keywords',
                'homepage',
            ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterTargets', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setFilterStyle is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setFilterStyle({
            target: { value: 'test', },
        });

        expect(setSearchFilterStyle.mock.calls.length).toBe(1);
        expect(setSearchFilterStyle.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchFilterStyle', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setSortTarget is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setSortTarget({
            target: { value: 'test', },
        });

        expect(setSearchSortTarget.mock.calls.length).toBe(1);
        expect(setSearchSortTarget.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchSortTarget', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setSortStyle is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setSortStyle({
            target: { value: 'test', },
        });

        expect(setSearchSortStyle.mock.calls.length).toBe(1);
        expect(setSearchSortStyle.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchSortStyle', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setSortDirection is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();

        wrapper.instance().setSortDirection({
            target: { value: 'test', },
        });

        expect(setSearchSortDirection.mock.calls.length).toBe(1);
        expect(setSearchSortDirection.mock.calls[0]).toEqual([ 'test', ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchSortDirection', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setDateCreatedRange is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().dateCreatedRangeLower = { value: 14, };
        wrapper.instance().dateCreatedRangeUpper = { value: 15, };

        wrapper.instance().setDateCreatedRange({
            target: { value: 'test', },
        });

        expect(setSearchDateCreatedRange.mock.calls.length).toBe(1);
        expect(setSearchDateCreatedRange.mock.calls[0]).toEqual([
            [ 14, 15, ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchDateCreatedRange', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setDateModifiedRange is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().dateModifiedRangeLower = { value: 14, };
        wrapper.instance().dateModifiedRangeUpper = { value: 15, };

        wrapper.instance().setDateModifiedRange({
            target: { value: 'test', },
        });

        expect(setSearchDateModifiedRange.mock.calls.length).toBe(1);
        expect(setSearchDateModifiedRange.mock.calls[0]).toEqual([
            [ 14, 15, ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchDateModifiedRange', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when setVersionRange is called', () => {
        const wrapper = shallow(<SearchPage dispatch={store.dispatch} />);
        wrapper.instance().serializeSearchOptions = jest.fn();
        wrapper.instance().versionRangeLower = { value: '15', };
        wrapper.instance().versionRangeUpper = { value: '16', };

        wrapper.instance().setVersionRange({
            target: { value: 'test', },
        });

        expect(setSearchVersionRange.mock.calls.length).toBe(1);
        expect(setSearchVersionRange.mock.calls[0]).toEqual([
            [ '15', '16', ],
        ]);

        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setSearchVersionRange', },
        ]);

        expect(wrapper.instance().serializeSearchOptions.mock.calls.length)
            .toBe(1);
    });

    it('handles side effects when search is called', () => {
        const searchObj = {
            query: 'testQuery',
            type: 'testType',
            filterTargets: 'testFilterTargets',
            filterStyle: 'testFilterStyle',
            sortTarget: 'testSortTarget',
            sortStyle: 'testSortStyle',
            sortDirection: 'testSortDirection',
            dateCreatedRange: 'testDateCreatedRange',
            dateModifiedRange: 'testDateModifiedRange',
            versionRange: 'testVersionRange',
            subtype: 'testSubtype',
        };

        const component = (
            <SearchPage
                store={store}
                dispatch={store.dispatch}
                {...searchObj}
                csrfToken="test" />
        );
        const wrapper = shallow(component);
        wrapper.instance().search();

        expect(search.mock.calls.length).toBe(1);
        expect(search.mock.calls[0]).toEqual([ store, searchObj, 'test', ]);
    });

    it('tests getInitialProps when req exists', async () => {
        await getInitialProps({ req: { url: '/foo', }, store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(1);
        expect(setAppSelectedPane.mock.calls[0]).toEqual([ 'foo', ]);
        
        expect(store.dispatch.mock.calls.length).toBe(1);
        expect(store.dispatch.mock.calls[0]).toEqual([
            { type: 'setAppSelectedPane', },
        ]);
    });

    it('tests getInitialProps when req does not exist', async () => {
        await getInitialProps({ store, });

        expect(setAppSelectedPane.mock.calls.length).toBe(0);
        expect(store.dispatch.mock.calls.length).toBe(0);
    });
});