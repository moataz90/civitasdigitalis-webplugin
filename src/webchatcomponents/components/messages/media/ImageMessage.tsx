import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import { Message, IMessageBaseProps } from '../Message';
import * as ReactDOM from 'react-dom';

const ImageComponent: React.StatelessComponent<IImageMessageProps> = ({ className, imageUrl }) => (
	<img src={imageUrl} className={className} />
);

const ImageStyled = styled(ImageComponent)`
	&&& {
		width: 100%;
		border-radius: 8px;
	}
`;

export interface IImageMessageProps extends IPropsStyledComponents, IMessageBaseProps {
	imageUrl: string;
	maxWidth: string | number;
	onLoadImage: (success: boolean, width: number, height: number) => void;
}

export class ImageMessageComponent extends React.Component<IImageMessageProps> {
	private checkLoadedInterval: number;
	private imgRef: HTMLImageElement;

	constructor(props: IImageMessageProps) {
		super(props);
	}

	public componentDidMount() {
		this.checkLoadedInterval = window.setInterval(() => {
			this.checkImageLoaded();
		}, 10);
	}

	render() {
		const { imageUrl, maxWidth, isOwnMessage, isLastMessage, onLoadImage } = this.props;

		const customStyle = {
			justifyContent: isOwnMessage ? 'flex-end' : undefined
		};

		const customImageWrapperStyle: React.CSSProperties = {
			width: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
			position: 'relative',
			minHeight: '1px'
		};

		return (
			<Message isOwnMessage={isOwnMessage} css={customStyle} isLastMessage={isLastMessage}>
				<div style={customImageWrapperStyle}>
					<ImageStyled
						imageUrl={imageUrl}
						maxWidth={maxWidth}
						isOwnMessage={isOwnMessage}
						isLastMessage={isLastMessage}
						onLoadImage={onLoadImage}
						ref={(instance: React.ReactInstance) => this.imgRef = ReactDOM.findDOMNode(instance) as HTMLImageElement}
					/>
				</div>
			</Message>
		);
	}

	private checkImageLoaded() {
		/* istanbul ignore else  */
		if (window.isTestingMode === true) {
			setTimeout(() => this.props.onLoadImage(true, 0, 0));
		} else if (this.imgRef.naturalWidth && this.imgRef.naturalHeight) {
			window.clearInterval(this.checkLoadedInterval);

			console.log('Image loaded');
			this.props.onLoadImage(true, this.imgRef.naturalWidth, this.imgRef.naturalHeight);
		}
	}
}

export const ImageMessage = ImageMessageComponent;