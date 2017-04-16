// modified from http://stackoverflow.com/a/30008115/3258333
export default function makeRequest(options) {
	if (!options.method) {
		throw new Error('Method was not provided.');
	} else if (!options.url) {
		throw new Error('URL was not provided.');
	}

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(options.method, options.url);
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr);
			} else {
				reject(xhr);
			}
		};

		if (options.withCredentials) {
			xhr.withCredentials	= true;
		}

		if (options.headers) {
			Object.getOwnPropertyNames(options.headers).forEach(key => {
				xhr.setRequestHeader(key, options.headers[key]);
			});
		}
		
		xhr.onerror = () => {
			reject(xhr);
		};

		let paramStr;
		if (options.params) {
			paramStr = Object.getOwnPropertyNames(options.params).map(key => {
				return encodeURIComponent(key) +
						'=' +
						encodeURIComponent(options.params[key]);
			}).join('&');
		}

		xhr.send(paramStr);
	});
}