import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { Message, IMessageBaseProps } from '../Message';
import * as ReactDOM from 'react-dom';
import { CarouselArrowLeft, CarouselArrowRight } from './CarouselArrow';
import { SmoothScrolling, EasingFunction } from '../../../types/smooth-scrolling';

const ScrollWrapperOuter = styled.div`
	&&& {
		width: 100%;
		overflow: hidden;
	}
`;

const ScrollWrapperInner = styled.div`
	&&& {
		height: 100%;
		position: relative;
		padding-bottom: 0px;
		box-sizing: border-box;
		height: calc(100% + 17px);
    	margin-bottom: -17px; /* -17 for IE11*/
	}
`;

const CardWrapper = styled.div`
	&&& {
		overflow-y: hidden;
		overflow-x: scroll;
		display: flex;
		flex-direction: row;
		padding-bottom: 20px;
	}
`;

export interface ICarouselMessageProps extends IMessageBaseProps {
	children: React.ReactNode[];
	smoothScrollingFunction: SmoothScrolling;
	easing: EasingFunction;
	canScrollLeft?: boolean;
	canScrollRight?: boolean;
}

export interface ICarouselMessageState {
	scrollTarget: number;
	isAnimating: boolean;
	canScrollLeft: boolean;
	canScrollRight: boolean;
}

const CAROUSEL_CARD_WIDTH = 280;

export class CarouselMessageComponent extends React.Component<ICarouselMessageProps, ICarouselMessageState> {
	private cardWrapper: HTMLDivElement;
	private oldScrollLeft: number = 0;

	constructor(props: ICarouselMessageProps) {
		super(props);

		this.state = {
			...this.state,
			scrollTarget: 0,
			isAnimating: false,
			canScrollLeft: props.canScrollLeft || false,
			canScrollRight: props.canScrollRight || false
		};

		this.onClickArrow = this.onClickArrow.bind(this);
		this.onScrollCardWrapper = this.onScrollCardWrapper.bind(this);
	}

	/* istanbul ignore next */
	public componentDidMount() {
		if (this.cardWrapper) {
			this.checkArrowVisibility();

			if (this.cardWrapper.addEventListener && window.addEventListener) {
				this.cardWrapper.addEventListener('scroll', this.onScrollCardWrapper);
				window.addEventListener('resize', this.onScrollCardWrapper);
			}
		}
	}

	/* istanbul ignore next */
	public componentWillUnmount() {
		this.cardWrapper.removeEventListener('scroll', this.onScrollCardWrapper);
		window.removeEventListener('resize', this.onScrollCardWrapper);
	}

	public render() {
		const { children, isLastMessage } = this.props;
		const { canScrollLeft, canScrollRight } = this.state;

		return (
			<Message isOwnMessage={false} css={{ padding: 0, paddingBottom: 10 }} isLastMessage={isLastMessage}>
				<ScrollWrapperOuter>
					<ScrollWrapperInner>
						{canScrollLeft
							? <CarouselArrowLeft isLeftArrow={true} onClick={this.onClickArrow} />
							: null
						}
						{canScrollRight
							? <CarouselArrowRight isLeftArrow={false} onClick={this.onClickArrow} />
							: null
						}
						<CardWrapper
							ref={(instance: React.ReactInstance) =>
								this.cardWrapper = ReactDOM.findDOMNode(instance) as HTMLDivElement}
						>
							{children}
						</CardWrapper>
					</ScrollWrapperInner>
				</ScrollWrapperOuter>
			</Message>
		);
	}

	/* istanbul ignore next */
	private onScrollCardWrapper(event: UIEvent) {
		this.checkArrowVisibility();
	}

	/* istanbul ignore next */
	private checkArrowVisibility() {
		if (this.state.isAnimating) {
			return;
		}

		const { children } = this.props;

		const currentScrollLeftPosition = this.cardWrapper.scrollLeft;
		const maxScrollLeftPosition = children.length * CAROUSEL_CARD_WIDTH;

		const canScrollLeft = currentScrollLeftPosition > 0;
		const canScrollRight = children.length > 1 && currentScrollLeftPosition <
			this.cardWrapper.scrollWidth - this.cardWrapper.clientWidth;

		let newCanScrollLeft = this.state.canScrollLeft;
		let newCanScrollRight = this.state.canScrollRight;

		if (canScrollLeft !== this.state.canScrollLeft) {
			newCanScrollLeft = canScrollLeft;
		}

		if (canScrollRight !== this.state.canScrollRight) {
			newCanScrollRight = canScrollRight;
		}

		this.setState({
			...this.state,
			canScrollLeft: newCanScrollLeft,
			canScrollRight: newCanScrollRight,
			scrollTarget: this.cardWrapper.scrollLeft
		});
	}

	/* istanbul ignore next */
	private onClickArrow(arrowLeft: boolean) {
		if (this.state.isAnimating) {
			return;
		}

		let updateState = false;
		const currentScrollIdx = Math.floor(this.cardWrapper.scrollLeft / CAROUSEL_CARD_WIDTH);
		const { children, smoothScrollingFunction, easing } = this.props;

		let newCardScrollIdx = currentScrollIdx;

		if (arrowLeft && currentScrollIdx > 0) {
			// Scroll left is possible
			if (this.cardWrapper.scrollLeft % CAROUSEL_CARD_WIDTH === 0) {
				newCardScrollIdx--;
			}

			updateState = true;
		} else if (!arrowLeft && currentScrollIdx < children.length - 1) {
			// Scroll right is possible
			newCardScrollIdx++;

			updateState = true;
		}

		const newScrollTarget = Math.min(
			newCardScrollIdx * CAROUSEL_CARD_WIDTH,
			this.cardWrapper.scrollWidth - this.cardWrapper.clientWidth
		);

		if (this.cardWrapper.scrollLeft !== newScrollTarget) {
			this.setState({
				...this.state,
				isAnimating: true,
			});

			const scrollingCallback = () => {
				this.setState({
					...this.state,
					isAnimating: false,
					scrollTarget: newScrollTarget
				},
					() => {
						this.checkArrowVisibility();
					});
			};

			smoothScrollingFunction(this.cardWrapper.scrollLeft, newScrollTarget, easing, 500, (newVal) => {
				this.cardWrapper.scrollLeft = newVal;
			}, scrollingCallback);
		}
	}
}

export const CarouselMessage = CarouselMessageComponent;