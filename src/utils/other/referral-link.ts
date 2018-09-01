export const urlHasReferralPayload = (url: string): boolean =>
	url.indexOf('pwp_ref=') > -1;

export const getReferralPayload = (queryParams: Map<string, any>) => {
	return queryParams.get('pwp_ref');
};