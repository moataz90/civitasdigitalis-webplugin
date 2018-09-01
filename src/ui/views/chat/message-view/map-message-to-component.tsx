import * as React from 'react';
import {
	IMessage, MessageType, IMessagePayloadText, IMessagePayloadMedia, IMessagePayloadCarousel,
	IMessagePayloadQuickreply, IMessageQuickreplyType, MessageButtonType
} from '../../../../redux-store/messages/messages.schema';
import { determineMessageType } from '../../../../utils/messages/determine-internal-message-type';
import {
	TextMessage, MediaMessage, Button, ButtonCallback, CarouselMessage, CarouselCard, QuickReplyList,
	IMessagePayloadButton
} from '../../../../webchatcomponents';
import { IThemeSchema } from '../../../../theme/ThemeSchema';
import { scrollSmooth } from '../../../../utils/scrolling/smooth-scrolling';
import { easings } from '../../../../utils/scrolling/easing';

export type OnLoadMedia = (success: boolean, width: number, height: number) => void;

const mapButtonToComponent = (btn: IMessagePayloadButton, theme: IThemeSchema, key: number | string, idx: number,
	firstButtonMarginTop: number, buttonCallback: ButtonCallback): React.ReactNode => {

	if (btn.type === MessageButtonType.Share) {
		return null;
	}

	return <Button
		type={btn.type as any}
		title={btn.title}
		onClick={buttonCallback}
		payload={btn.payload}
		backgroundColor={theme.message.button.backgroundColor}
		fontColor={theme.message.button.fontColor}
		fontSize={theme.message.button.fontSize}
		fontFamily={theme.fontFamily}
		key={key}
		idx={idx}
		firstButtonMarginTop={firstButtonMarginTop}
	/>;
};

const mapQuickreplyTypeToButtonType = (quickreplyType: IMessageQuickreplyType): MessageButtonType => {
	switch (quickreplyType) {
		case IMessageQuickreplyType.Postback:
			return MessageButtonType.Postback;

		default:
			return null;
	}
};

const mapQuickreplyToComponent = (qr: IMessagePayloadQuickreply, theme: IThemeSchema, key: number | string, idx: number,
	buttonCallback: ButtonCallback): React.ReactNode => {

	return <Button
		type={mapQuickreplyTypeToButtonType(qr.type)}
		title={qr.title}
		onClick={buttonCallback}
		payload={qr.payload}
		backgroundColor={theme.message.button.backgroundColor}
		fontColor={theme.message.button.fontColor}
		fontSize={theme.message.button.fontSize}
		fontFamily={theme.fontFamily}
		key={key}
		idx={idx}
		firstButtonMarginTop={0}
	/>;
};

export const mapMessageToComponent = (message: IMessage<any>, key: number | string, theme: IThemeSchema,
	buttonCallback: ButtonCallback, onLoadMedia: OnLoadMedia, isLastMessage: boolean): React.ReactNode => {

	const messageType = determineMessageType(message);

	if (messageType === MessageType.Text) {
		const payload = (message as IMessage<IMessagePayloadText>).payload;

		const buttonElements = (payload.buttons || []).map((btn, idx) =>
			mapButtonToComponent(btn, theme, idx, idx, 10, buttonCallback));

		const quickreplyElements = (payload.quickreplies || []).map((qr, idx) =>
			mapQuickreplyToComponent(qr, theme, idx, idx, buttonCallback));

		const quickreplyList = quickreplyElements.length > 0 && isLastMessage
			? [<QuickReplyList key="qr-list">{quickreplyElements}</QuickReplyList>]
			: null;

		return [
			<TextMessage
				text={payload.text}
				fontColor={theme.message.textMessage.fontColor}
				backgroundColor={message.isOwnMessage
					? theme.message.textMessage.backgroundColorOwn
					: theme.message.textMessage.backgroundColorBot}
				maxWidth={theme.message.textMessage.maxWidth}
				isOwnMessage={message.isOwnMessage}
				fontFamily={theme.fontFamily}
				isLastMessage={isLastMessage}
				section={message.section}
				key={key}
			>
				{buttonElements}
			</TextMessage>
		].concat(quickreplyList);
	} else if (messageType === MessageType.Media) {
		const payload = (message as IMessage<IMessagePayloadMedia>).payload;

		const quickreplyElements = (payload.quickreplies || []).map((qr, idx) =>
			mapQuickreplyToComponent(qr, theme, idx, idx, buttonCallback));

		const quickreplyList = quickreplyElements.length > 0 && isLastMessage
			? [<QuickReplyList key="qr-list">{quickreplyElements}</QuickReplyList>]
			: null;

		return [
			<MediaMessage
				mediaType={payload.type}
				mediaUrl={payload.url}
				maxWidth={theme.message.mediaMessage.maxWidth}
				isOwnMessage={message.isOwnMessage}
				isLastMessage={isLastMessage}
				key={key}
				onLoadMedia={onLoadMedia}
			/>
		].concat(quickreplyList);
	} else if (messageType === MessageType.Carousel) {
		const payload = (message as IMessage<IMessagePayloadCarousel>).payload;

		const cardElements = payload.cards.map((card, idx) => (
			<CarouselCard
				title={card.title}
				subtitle={card.subtitle}
				imgUrl={card.imageUrl}
				fontFamily={theme.fontFamily}
				fontColorTitle={theme.message.textMessage.fontColor}
				fontColorSubtitle={theme.message.textMessage.fontColor}
				key={`message-${key}-card-${idx}`}
				isFirst={(idx === 0) ? true : false}
				isLast={(idx === payload.cards.length - 1) ? true : false}
			>
				{
					card.buttons.map((button, bIndex) =>
						mapButtonToComponent(button, theme, `message-${key}-card-${idx}-btn-${bIndex}`, bIndex, 0, buttonCallback))
				}
			</CarouselCard>
		));

		const quickreplyElements = (payload.quickreplies || []).map((qr, idx) =>
			mapQuickreplyToComponent(qr, theme, idx, idx, buttonCallback));

		const quickreplyList = quickreplyElements.length > 0 && isLastMessage
			? [<QuickReplyList key="qr-list">{quickreplyElements}</QuickReplyList>]
			: null;

		return [
			<CarouselMessage
				key={key}
				isLastMessage={isLastMessage}
				isOwnMessage={message.isOwnMessage}
				smoothScrollingFunction={scrollSmooth}
				easing={easings.easeInOutCubic}
			>
				{cardElements}
			</CarouselMessage>
		].concat(quickreplyList);
	}

	return null;
};