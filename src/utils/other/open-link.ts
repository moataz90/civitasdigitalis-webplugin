export enum LinkTarget {
	SameWindow,
	NewWindow,
	NewTab,
	PopUp
}

const isReferralLink = (url: string): boolean =>
	url.substr(0, 13) === '<url>?pwp_ref';

const completeReferralLink = (url: string): string => {
	const port = window.location.port.length > 0 ? `:${window.location.port}` : '';

	return url.split('<url>').join(`${window.location.protocol}//${window.location.hostname}${port}${window.location.pathname}`);
};

export const openLink = (url: string, target: LinkTarget) => {
	// tslint:disable-next-line:variable-name
	let _url: string = url;

	if (isReferralLink(url)) {
		_url = completeReferralLink(url);
	}

	if (target === LinkTarget.NewTab) {
		Object.assign(document.createElement('a'), { target: '_blank', href: _url }).click();
	} else if (target === LinkTarget.NewWindow) {
		window.open(_url, '_blank');
	} else if (target === LinkTarget.SameWindow) {
		window.location.href = _url;
	} else if (target === LinkTarget.PopUp) {
		window.open(_url, 'Haftungsausschluss', 'width=600,height=400');
	}
};