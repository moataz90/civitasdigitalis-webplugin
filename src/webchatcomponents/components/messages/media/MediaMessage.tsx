import * as React from 'react';
import { MessageMediaType } from '../../../types/media-types';
import { ImageMessage } from './ImageMessage';
import { IMessageBaseProps } from '../Message';

export interface IMediaMessageProps extends IMessageBaseProps {
	mediaUrl: string;
	mediaType: MessageMediaType;
	maxWidth: string | number;
	onLoadMedia: (success: boolean, width: number, height: number) => void;
}

export const MediaMessage: React.StatelessComponent<IMediaMessageProps> =
	({ mediaUrl, mediaType, maxWidth, isOwnMessage, isLastMessage, onLoadMedia }) => {
		switch (mediaType) {
			case MessageMediaType.Image:
				return (
					<ImageMessage
						imageUrl={mediaUrl}
						maxWidth={maxWidth}
						isOwnMessage={isOwnMessage}
						isLastMessage={isLastMessage}
						onLoadImage={onLoadMedia}
					/>
				);

			default:
				return null;

		}
	};