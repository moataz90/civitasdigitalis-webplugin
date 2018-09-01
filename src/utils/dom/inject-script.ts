export const injectScript = (scriptURL: string): HTMLScriptElement => {
	const scriptTag = document.createElement('script');
	scriptTag.setAttribute('type', 'text/javascript');
	scriptTag.setAttribute('src', scriptURL);
	document.head.appendChild(scriptTag);

	return scriptTag;
};