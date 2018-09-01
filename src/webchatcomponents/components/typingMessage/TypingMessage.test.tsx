import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { TypingMessage } from './TypingMessage';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

test('render typing animation is typing', () => {
	const domTree = renderer.create(
		<TypingMessage isTyping={true} />
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render typing animation is not typing', () => {
	const domTree = renderer.create(
		<TypingMessage isTyping={false} />
	).toJSON();

	expect(domTree).toMatchSnapshot();
});