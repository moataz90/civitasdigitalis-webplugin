import { IMessage, MessageType, IMessagePayloadText, IMessagePayloadMedia, IMessagePayloadCarousel }
	from './../../redux-store/messages/messages.schema';

export const determineMessageType = (message: IMessage<any>): MessageType => {
	if ((message as IMessage<IMessagePayloadText>).payload.text) {
		return MessageType.Text;
	} else if ((message as IMessage<IMessagePayloadMedia>).payload.url) {
		return MessageType.Media;
	} else if ((message as IMessage<IMessagePayloadCarousel>).payload.cards) {
		return MessageType.Carousel;
	} else {
		return null;
	}
};