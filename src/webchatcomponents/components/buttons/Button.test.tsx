import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Button } from './Button';
import { shallow } from 'enzyme';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

test('render button as first element', (done) => {
	const onButtonClicked = (type: number, title: string, payload: any) => {
		done();
	};

	const buttonComp = (
		<Button
			title="A button"
			payload="payload"
			type={1}
			onClick={onButtonClicked}
			backgroundColor="blue"
			fontColor="white"
			fontSize={18}
			fontFamily="Helvetica"
			idx={0}
			firstButtonMarginTop={0}
		/>
	);

	const domTree = renderer.create(
		buttonComp
	);

	expect(domTree.toJSON()).toMatchSnapshot();

	const wrapper = shallow(buttonComp);
	wrapper.simulate('click');
});

test('render button not as first element', () => {
	const buttonComp = (
		<Button
			title="A button"
			payload="payload"
			type={1}
			onClick={() => undefined}
			backgroundColor="blue"
			fontColor="white"
			fontSize={18}
			fontFamily="Helvetica"
			idx={5}
			firstButtonMarginTop={0}
		/>
	);

	const domTree = renderer.create(
		buttonComp
	);

	expect(domTree.toJSON()).toMatchSnapshot();
});