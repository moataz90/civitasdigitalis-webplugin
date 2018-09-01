export const getQueryParams = (url: string): Map<string, any> => {
	const splittedUrl = url.split('?');
	const result = new Map<string, any>();

	if (splittedUrl.length === 2) {
		const query = splittedUrl[1];

		if (!query) {
			return result;
		}

		return (/^[?#]/.test(query) ? query.slice(1) : query)
			.split('&')
			.reduce((params, param) => {
				const [key, value] = param.split('=');

				params.set(key, value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '');

				return params;
			}, result);
	}

	return result;
};