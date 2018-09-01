import * as React from 'react';
import { TextMessage, Section } from './TextMessage';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

test('render own text message is not last', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth={200}
			fontFamily="Helvetica"
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render own text message is last', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth={200}
			fontFamily="Helvetica"
			isOwnMessage={true}
			isLastMessage={true}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render bot text message is not last', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth={200}
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render bot text message is last', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth={200}
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={true}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('max-width percentage', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={true}
			isLastMessage={false}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('own message and section is end', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={true}
			isLastMessage={false}
			section={Section.end}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('own message and section is single', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={true}
			isLastMessage={false}
			section={Section.end}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('bot message and section is end', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={false}
			section={Section.end}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('bot message and section is single', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={false}
			section={Section.single}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('bot message and section is start', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={false}
			section={Section.start}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('bot message and section is middle', () => {
	const domTree = renderer.create(
		<TextMessage
			text="Hello"
			fontColor="black"
			backgroundColor="white"
			maxWidth="50%"
			fontFamily="Helvetica"
			isOwnMessage={false}
			isLastMessage={false}
			section={Section.middle}
		/>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});