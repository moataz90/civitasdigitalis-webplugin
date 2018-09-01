
export { IPersistentMenuJSON } from '../redux-store/toolbar/toolbar.schema';

export const persistentMenuMock: object = {
	persistent_menu:
		[
			{
				'locale': 'default',
				'composer_input_disabled': true,
				'call_to_actions': [
					{
						'title': 'Fisrt level',
						'type': 'nested',
						'call_to_actions': [
							{
								'title': 'Secondlevel',
								'type': 'nested',
								'call_to_actions': [
									{
										'title': 'History',
										'type': 'postback',
										'payload': 'HISTORY_PAYLOAD'
									},
									{
										'title': 'Thirdlevel',
										'type': 'nested',
										'call_to_actions': [
											{
												'title': 'History',
												'type': 'postback',
												'payload': 'HISTORY_PAYLOAD'
											},
											{
												'title': 'Contact Info',
												'type': 'postback',
												'payload': 'CONTACT_INFO_PAYLOAD'
											}
										]
									}
								]
							},
							{
								'title': 'History',
								'type': 'postback',
								'payload': 'HISTORY_PAYLOAD'
							},
							{
								'title': 'Contact Info',
								'type': 'postback',
								'payload': 'CONTACT_INFO_PAYLOAD'
							}
						]
					},
					{
						'type': 'web_url',
						'title': 'Latest News',
						'url': 'http://www.messenger.com/',
						'webview_height_ratio': 'full'
					}
				]
			},
			{
				'locale': 'zh_CN',
				'composer_input_disabled': false,
				'call_to_actions': [
					{
						'title': 'Pay Bill',
						'type': 'postback',
						'payload': 'PAYBILL_PAYLOAD'
					}
				]
			}
		]
};
