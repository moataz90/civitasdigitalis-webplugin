import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { MediaMessage } from './MediaMessage';
import { MessageMediaType } from '../../../types/media-types';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

test('render media message of type image', () => {
	const domTree = renderer.create(
		<MediaMessage
			mediaType={MessageMediaType.Image}
			mediaUrl="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg"
			maxWidth={200}
			onLoadMedia={() => undefined}
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render media message of other type', () => {
	const domTree = renderer.create(
		<MediaMessage
			mediaType={MessageMediaType.Video}
			mediaUrl="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg"
			maxWidth={200}
			onLoadMedia={() => undefined}
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toBe(null);
});