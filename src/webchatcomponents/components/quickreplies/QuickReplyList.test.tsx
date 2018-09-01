import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { QuickReplyList } from './QuickReplyList';

import { BrowserInfo } from 'detect-browser';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

test('quick reply animation test IE', () => {
	
	const browser: BrowserInfo =  {
		name: 'ie',
		version: '1.0',
		os: 'windows'
	};

	const domTree = renderer.create(

		<QuickReplyList detectBrowser={(): BrowserInfo => {return browser; }}>
			<div>Some child</div>
			<div>Another child</div>
			</QuickReplyList>

	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('quick reply animation test safari', () => {

	const browser: BrowserInfo =  {
		name: 'safari',
		version: '1.0',
		os: 'windows'
	};

	const domTree = renderer.create(

		<QuickReplyList detectBrowser={(): BrowserInfo => {return browser; }}>
			<div>Some child</div>
			<div>Another child</div>
			</QuickReplyList>

	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('quick reply animation test other browser', () => {

	const browser: BrowserInfo =  {
		name: 'chrome',
		version: '1.0',
		os: 'windows'
	};

	const domTree = renderer.create(

		<QuickReplyList detectBrowser={(): BrowserInfo => {return browser; }}>
			<div>Some child</div>
			<div>Another child</div>
			</QuickReplyList>

	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('quick reply animation test ios', () => {

	const browser: BrowserInfo =  {
		name: 'ios',
		version: '1.0',
		os: 'windows'
	};

	const domTree = renderer.create(

		<QuickReplyList detectBrowser={(): BrowserInfo => {return browser; }}>
			<div>Some child</div>
			<div>Another child</div>
			</QuickReplyList>

	).toJSON();

	expect(domTree).toMatchSnapshot();
});