import 'whatwg-fetch';

/* modules */
import * as post from './post';

describe('database post unit tests', () => {
    beforeEach(() => {
        fetch = jest.fn();
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => {}}));
    });

    it('tests post.accountCreation', async () => {
        await post.accountCreation('tester', 'testpassword', 'test_token1');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/login/' +
            'createAccount.php';
        const formData = new FormData();
        formData.append('name', 'tester');
        formData.append('password', 'testpassword');
        formData.append('csrfToken', 'test_token1');
        const obj = {
            method: 'POST',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.accountUpdate', async () => {
        const profile = {
            dateCreatedVisible: true,
            name: 'testerson',
            nameVisible: false,
            description: 'test description',
            email: 'tester@test.com',
            emailVisible: true,
            homepage: 'test.com',
            dateStyle: 'ddmm',
            timeStyle: '24h',
        };

        await post.accountUpdate(profile, 'test_token16');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/userdata/';
        const formData = new FormData();
        Object.keys(profile).forEach(key => {
            formData.append(key, profile[key]);
        });

        formData.append('csrfToken', 'test_token16');
        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.login', async () => {
        await post.login('tester1', 'testpassword2');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/login/';
        const formData = new FormData();
        formData.append('name', 'tester1');
        formData.append('password', 'testpassword2');
        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.logout', async () => {
        await post.logout('test_token_testing');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/login/logout.php';
        const formData = new FormData();
        formData.append('csrfToken', 'test_token_testing');
        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.packageCreation', async () => {
        const pkg = {
            name: 'tester',
            type: 'scripts',
            version: '12.34.56',
            description: 'test description',
            homepage: 'test.com',
            js: 'test js',
            css: 'test css',
            keywords: 'test keywords',
            tag: 'test tag',
        };

        await post.packageCreation(pkg, 'test_token2');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/package/' +
            'createPackage.php';
        const formData = new FormData();
        Object.keys(pkg).forEach(key => {
            formData.append(key, pkg[key]);
        });

        formData.append('csrfToken', 'test_token_testing');
        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.packageOwnershipTransfer', async () => {
        await post.packageOwnershipTransfer(123, 'new_owner', 'test_token2');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/package/' +
            'ownershipTransfer.php';
        const formData = new FormData();
        formData.append('packageId', 123);
        formData.append('newOwner', 'new_owner');
        formData.append('csrfToken', 'test_token2');

        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.packageUpdate', async () => {
        const pkg = {
            name: 'tester',
            type: 'scripts',
            version: '12.34.56',
            description: 'test description',
            homepage: 'test.com',
            js: 'test js',
            css: 'test css',
            keywords: 'test keywords',
            tag: 'test tag',
        };

        await post.packageUpdate(pkg, 'test_token3');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/package/';
        const formData = new FormData();
        Object.keys(pkg).forEach(key => {
            formData.append(key, pkg[key]);
        });

        formData.append('csrfToken', 'test_token2');

        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });

    it('tests post.packagePublish', async () => {
        await post.packagePublish(123, true, 'test_token4');
        expect(fetch.mock.calls.length).toEqual(1);

        const url = 'https://furkleindustries.com/twinepm/package/';
        const formData = new FormData();
        formData.append('packageId', 123);
        formData.append('published', true);
        formData.append('csrfToken', 'test_token4');

        const obj = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };

        expect(fetch.mock.calls[0]).toEqual([url, obj]);
    });
});