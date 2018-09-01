import { IConfig } from './config/config-schema';
import { UIWindowMode } from './redux-store/ui/ui.schema';
import { initPlugin } from './init-logic/init-plugin';

(async () => {

	const stadtWerkeLocalConfig: IConfig = {
		'version': 'staging',
		'bot': {
			'id': '1',
			'backendUrl': 'ws://localhost:3000',
			'displayName': 'CivitasDigitalis',
			'disclaimerUrl': 'http://www.google.com'
		},
		'ui': {
			'mode': UIWindowMode.Overlay,
			'targetDOMElement': null,
			'overlay': {
				'width': 320,
				'height': 480
			},
			'header': {
				'iconUrl': '',
				'closeButtonUrl': ''
			},
			'floatingButton': {
				'iconUrl': ''
			}
		},
		'session': {
			'allowSessions': true,
			'expire': 7200000
		},
		'behaviour': {
			'openOnStart': {
				'desktop': 1,
				'smartphone': -1,
				'tablet': -1,
				'other': -1
			},
			'startMessage': {
				'delay': 1000,
				'type': 'postback',
				'payload': {
					'payload': '{"intent":"Begrüßung"}',
					'title': 'Los geht\'s!'
				}

			},
			'toolbar': {
				'enableTextInput': true,
				'enablePersistentMenu': false
			}
		},
		'theme': {
			'fontFamily': 'Helvetica',
			'message': {
				'textMessage': {
					'fontColor': 'black',
					'fontSize': 16,
					'backgroundColorOwn': '#e0eaef',
					'backgroundColorBot': '#ABE2FF',
					'maxWidth': '70%'
				},
				'mediaMessage': {
					'maxWidth': '80%'
				},
				'button': {
					'fontSize': 16,
					'fontColor': '#006E96',
					'backgroundColor': '#d9e8ef'
				}
			},
			'ui': {
				'header': {
					'backgroundColor': '#0190dc',
					'fontColor': 'white',
					'fontSize': 20
				},
				'chat': {
					'backgroundColor': 'white'
				},
				'floatingButton': {
					'backgroundColor': '#f96314',
					'position': {
						'right': 33,
						'bottom': 97
					}
				},
				'transitionText': {
					'fontColor': 'silver',
					'fontSize': 24
				},
				'view': {
					'backgroundColor': 'white'
				}
			}
		}
	};

	initPlugin(stadtWerkeLocalConfig);
})();
