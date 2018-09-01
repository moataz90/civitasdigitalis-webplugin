declare var WURFL: IWurflJS;

declare enum WurflJSFormFactor {
	Smartphone = 'Smarthpone',
	FeaturePhone = 'Feature Phone',
	OtherMobile = 'Other Mobile',
	Tablet = 'Tablet',
	Desktop = 'Desktop',
	OtherNonMobile = 'Other non-Mobile'
}

declare type IWurflJS = {
	form_factor: WurflJSFormFactor;
}