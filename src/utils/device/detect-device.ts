import { waitUntil } from './../other/wait-until';
import { Device } from './../../redux-store/ui/ui.schema';

enum WurflJSFormFactor {
	Smartphone = 'Smartphone',
	FeaturePhone = 'Feature Phone',
	OtherMobile = 'Other Mobile',
	Tablet = 'Tablet',
	Desktop = 'Desktop',
	OtherNonMobile = 'Other non-Mobile'
}

export const detectDevice = (): Promise<Device> => {
	// Wait until global WURFL.js object is available
	return waitUntil(() => typeof WURFL !== 'undefined', 4000)
		.then(() => {
			if ([
				WurflJSFormFactor.Smartphone,
				WurflJSFormFactor.FeaturePhone,
				WurflJSFormFactor.OtherMobile
			].indexOf(WURFL.form_factor) > -1) {
				return Device.Smartphone;
			} else if ([WurflJSFormFactor.Tablet].indexOf(WURFL.form_factor) > -1) {
				return Device.Tablet;
			} else if ([WurflJSFormFactor.Desktop, WurflJSFormFactor.OtherNonMobile].indexOf(WURFL.form_factor) > -1) {
				return Device.Desktop;
			} else {
				return Device.Other;
			}
		})
		.catch((err) => {
			console.error(err);
			console.warn('WURFL.js object could not be found');

			return Device.Other;
		});
};