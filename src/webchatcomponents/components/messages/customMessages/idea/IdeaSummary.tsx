import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass, keyframes } from 'styled-components';
import { IPropsStyledComponents } from '../../../../types/common-proptypes';
import { Message, IMessageBaseProps } from '../../Message';
import { IButtonProps } from '../../../buttons/Button';
import { IIdea } from 'src/redux-store/messages/messages.schema';
import { IdeaSummaryFactory } from './IdeaSummaryFactory';
import { IIdeaSummaryState } from 'src/redux-store/idea-summary/idea.schema';

export enum Section {
	start,
	middle,
	end,
	single
}

export interface IIdeaProps extends IMessageBaseProps, IPropsStyledComponents {
	idea: IIdea;
	data: IIdeaSummaryState;
	fontColor: string;
	backgroundColor: string;
	maxWidth: number | string;
	fontFamily: string;
	isOwnMessage: boolean;
	buttons?: React.ReactElement<IButtonProps>[];
	section?: Section;
}

export interface IIdeaState {
	idea: IIdea;
	isEditabletitle: boolean;
	isEditablebody: boolean;
	isEditablecategory: boolean;
	isEditabletags: boolean;
	currentTag: string;
}

export class IdeaSummaryComponent extends React.Component<IIdeaProps, IIdeaState> {
	private _ideaSummaryFactory: IdeaSummaryFactory;

	constructor(props: IIdeaProps) {
		super(props);

		this._ideaSummaryFactory = new IdeaSummaryFactory();

		this.state = {
			idea: props.idea,
			isEditabletitle: true,
			isEditablebody: true,
			isEditablecategory: true,
			isEditabletags: true,
			currentTag: ``
		};

		this.ideaTitleOnChange = this.ideaTitleOnChange.bind(this);
		this.textareaOnChange = this.textareaOnChange.bind(this);
		this.dropdownOnChange = this.dropdownOnChange.bind(this);
		this.tagsOnChange = this.tagsOnChange.bind(this);
		this.sendButtonClick = this.sendButtonClick.bind(this);
		this.currentTagOnChange = this.currentTagOnChange.bind(this);
	}

	toggleEdit = (stateName: string) => {
		this.setState({
			...this.state,
			[`isEditable${stateName}`]: !this.state[`isEditable${stateName}`]
		});
	}

	ideaTitleOnChange = (e: React.ChangeEvent<any>) => {
		let newState = Object.assign({}, this.state);
		newState.idea.title = e.target.value;
		this.setState(newState);
	}

	textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		let newState = Object.assign({}, this.state);
		newState.idea.body = e.target.value;
		this.setState(newState);
	}

	dropdownOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let newState = Object.assign({}, this.state);
		newState.idea.category = e.target.value;
		this.setState(newState);
	}

	tagsOnChange = (tags: any[], changed: any[], changedIndexes: number[]) => {
		let newState = Object.assign({}, this.state);
		newState.idea.tags = tags.join(`,`);
		this.setState(newState);
	}

	currentTagOnChange = (value: string) => {
		this.setState({
			...this.state,
			currentTag: value
		});
	}

	sendButtonClick = () => {
		//
	}

	render() {

		const { data, className, isOwnMessage, children, isLastMessage, section } = this.props;
		const { idea, isEditabletitle, isEditablecategory, isEditablebody, isEditabletags, currentTag } = this.state;

		const customStyle = {
			justifyContent: isOwnMessage ? 'flex-end' : undefined
		};

		return (
			<Message isOwnMessage={isOwnMessage} css={customStyle} isLastMessage={isLastMessage} section={section}>
				<div className={className}>
					{
						this._ideaSummaryFactory.createIdeaTitle(
							'Titel: ',
							idea.title,
							isEditabletitle,
							this.ideaTitleOnChange,
							this.toggleEdit.bind(this, `title`)
						)
					}
					{
						this._ideaSummaryFactory.createIdeaTextArea(
							'Beitrages: ',
							idea.body,
							isEditablebody,
							this.textareaOnChange,
							this.toggleEdit.bind(this, `body`)
						)
					}
					{
						this._ideaSummaryFactory.createDropdown(
							'Kategorie: ',
							idea.category,
							data.categories,
							isEditablecategory,
							this.toggleEdit.bind(this, `category`),
							this.dropdownOnChange

						)
					}
					{
						this._ideaSummaryFactory.createTagsHandler(
							'Sclangwoerters: ',
							idea.tags,
							currentTag,
							isEditabletags,
							this.toggleEdit.bind(this, `tags`),
							this.tagsOnChange,
							this.currentTagOnChange
						)
					}
					{/* {
						this._ideaSummaryFactory.createSendButton(
							this.sendButtonClick
						)
					} */}
				</div>
				{children}
			</Message>
		);
	}
}

const FadeIn = keyframes`
0%   {opacity:0; transform:  translate(0px,15px); }
100% {opacity:1; transform:  translate(0px,0px);}

0%   {opacity:0; -moz-transform:  translate(0px,15px);}
100% {opacity:1; -moz-transform:  translate(0px,0px);}
0%   {opacity:0; -webkit-transform:  translate(0px,15px);}
100% {opacity:1; -webkit-transform:  translate(0px,0px);}
0%   {opacity:0; -o-transform:  translate(0px,15px)}
100% {opacity:1; -o-transform:  translate(0px,0px);}
0%   {opacity:0; -ms-transform:  translate(0px,15px);}
100% {opacity:1; -ms-transform:  translate(0px,0px);}
`;

const IdeaSummaryStyled = styled(IdeaSummaryComponent)`
	&&&{
		width: 90%;
		max-width: 90%;
		font-size: 16px;
		line-height: normal;
		background-color: ${props => props.backgroundColor};
		color: ${props => props.fontColor};
		border-radius: 20px;
		border-bottom-right-radius: ${props => props.isOwnMessage === true
		&& (props.section === Section.end || props.section === Section.single) ? '0px' : '20px'};
		border-bottom-left-radius: ${ props => props.isOwnMessage === false
		&& (props.section === Section.end || props.section === Section.single) ? '0px' : '20px'};
		padding: 11px 18px 11px 18px;
		font-family: ${ props => props.fontFamily};
		align-self: ${ props => props.isOwnMessage ? 'flex-end' : 'flex-start'};
		word-wrap: break-word;
		display: flex;
    	flex-flow: column;


		animation: ${FadeIn} ease 1s;
		animation-iteration-count: 1;
		transform-origin: 10% 10%;
		animation-fill-mode:backwards; /*when the spec is finished*/
		-webkit-animation: ${FadeIn} ease 1s;
		-webkit-animation-iteration-count: 1;
		-webkit-transform-origin: 10% 10%;
		-webkit-animation-fill-mode:backwards; /*Chrome 16+, Safari 4+*/ 
		-moz-animation: ${FadeIn} ease 1s;
		-moz-animation-iteration-count: 1;
		-moz-transform-origin: 10% 10%;
		-moz-animation-fill-mode:backwards; /*FF 5+*/
		-o-animation: ${FadeIn} ease 1s;
		-o-animation-iteration-count: 1;
		-o-transform-origin: 10% 10%;
		-o-animation-fill-mode:backwards; /*Not implemented yet*/
		-ms-animation: ${FadeIn} ease 1s;
		-ms-animation-iteration-count: 1;
		-ms-transform-origin: 10% 10%;
		-ms-animation-fill-mode:backwards; /*IE 10+*/
	
		opacity:0;
		opacity: 1\9;
	
	}
`;

export const IdeaSummary = IdeaSummaryStyled;