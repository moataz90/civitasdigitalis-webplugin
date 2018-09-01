import * as React from 'react';
import * as renderer from 'react-test-renderer';
import 'jest-styled-components';
import { CarouselMessage } from './CarouselMessage';
import { EasingFunction } from '../../../types/smooth-scrolling';
import { CarouselCard } from './CarouselCard';

// The following test cases are based on jest snapshot testing!
// For more information on how snapshot tests are working, see
// https://jest-bot.github.io/jest/docs/snapshot-testing.html

const smoothScrollingFuncMock = (startValue: number, targetValue: number, interpolation: EasingFunction) => {
	// Do nothing
};

test('render carousel message', () => {
	const cardData = ['Card1', 'Card2', 'Card3'];

	const domTree = renderer.create(
		<CarouselMessage
			smoothScrollingFunction={smoothScrollingFuncMock}
			easing={(t): number => { return 0; }}
			isOwnMessage={true}
			isLastMessage={false}
		>
			{
				cardData.map((cardInfo, idx) => (
					<CarouselCard
						title={cardInfo}
						subtitle={cardInfo}
						imgUrl="someurl"
						fontFamily="Helvetica"
						fontColorTitle="black"
						fontColorSubtitle="white"
						isFirst={idx === 0}
						isLast={idx === cardData.length - 1}
						key={idx}
					>
						<div>Some child</div>
						<div>Another child</div>
					</CarouselCard>

				))
			}
		</CarouselMessage>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});

test('render carousel message canScrollLeft', () => {
	const cardData = ['Card1', 'Card2', 'Card3'];

	const domTree = renderer.create(
		<CarouselMessage
			smoothScrollingFunction={smoothScrollingFuncMock}
			easing={(t): number => { return 0; }}
			isOwnMessage={true}
			isLastMessage={false}
			canScrollLeft={true}
			canScrollRight={true}
		>
			{
				cardData.map((cardInfo, idx) => (
					<CarouselCard
						title={cardInfo}
						subtitle={cardInfo}
						imgUrl="someurl"
						fontFamily="Helvetica"
						fontColorTitle="black"
						fontColorSubtitle="white"
						isFirst={idx === 0}
						isLast={idx === cardData.length - 1}
						key={idx}
					>
						<div>Some child</div>
						<div>Another child</div>
					</CarouselCard>

				))
			}
		</CarouselMessage>
	).toJSON();

	expect(domTree).toMatchSnapshot();
});