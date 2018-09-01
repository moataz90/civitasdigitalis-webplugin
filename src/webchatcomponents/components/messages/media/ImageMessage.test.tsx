import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ImageMessage } from './ImageMessage';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

beforeAll(() => {
	window.isTestingMode = true;
});

test('render own image message is not last', (done) => {
	const onImageLoaded = () => {
		done();
	};

	const domTree = renderer.create(
		<ImageMessage
			imageUrl="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg"
			maxWidth={200}
			onLoadImage={onImageLoaded}
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render bot image message is not last', (done) => {
	const onImageLoaded = () => {
		done();
	};

	const domTree = renderer.create(
		<ImageMessage
			imageUrl="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg"
			maxWidth={200}
			onLoadImage={onImageLoaded}
			isOwnMessage={false}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render image message max-width percentage', (done) => {
	const onImageLoaded = () => {
		done();
	};

	const domTree = renderer.create(
		<ImageMessage
			imageUrl="http://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg"
			maxWidth="50%"
			onLoadImage={onImageLoaded}
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});