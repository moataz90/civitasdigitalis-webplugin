import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass, keyframes } from 'styled-components';
import { IPropsStyledComponents } from '../../../../types/common-proptypes';
import { ICategory } from 'src/redux-store/idea-summary/idea.schema';
import * as TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

type buttonOnClick = () => void;
type textboxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
type textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
type dropdownOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => void;

const InputTitle = styled.input`
	outline: none;
	border: none;
    border-radius: 8px;
    padding: 10px;
	margin: 10px;
    box-shadow: 0px 3px 0px -2px grey;
`;

const TextArea = styled.textarea`
	outline: none;
	border: none;
	border-radius: 8px;
	padding: 10px;
	margin: 10px;
    box-shadow: 0px 3px 0px -2px grey;
`;

const TitleContainer = styled.div`
    display: flex;
	flex-flow: column;
	margin: 10px;
`;
const TextAreaContainer = styled.div`
	display: flex;
	flex-flow: column;
	margin: 10px;
`;
const DropdownContainer = styled.div`
	display: flex;
	flex-flow: column;
	margin: 10px;
`;
const TagsContainer = styled.div`
	display: flex;
	flex-flow: column;
	margin: 10px;
`;

const Button = styled.button`
	background: ghostwhite;
	cursor: pointer;
	border-radius: 8px;
	border: none;
	box-shadow: 0px 3px 0px -2px grey;
	&:hover {
		background: whitesmoke;
	}
`;

const Label = styled.label`
	margin-bottom: 10px;
`;

export class IdeaSummaryFactory {
	public createIdeaTitle = (
		title: string,
		value: string,
		editable: boolean,
		textOnChange: textboxOnChange,
		editButtonOnClick: buttonOnClick,
		key?: number | string
	): JSX.Element => {
		return (
			<TitleContainer>
				<Label>
					{title}
				</Label>
				{
					<InputTitle
						value={value}
						placeholder={``}
						onChange={textOnChange}
						disabled={!editable}
					/>
				}
			</TitleContainer>
		);
	}

	public createIdeaTextArea = (
		title: string,
		value: string,
		editable: boolean,
		textOnChange: textareaOnChange,
		editButtonOnClick: buttonOnClick,
		key?: number | string
	): JSX.Element => {
		return (
			<TextAreaContainer>
				<Label>
					{title}
				</Label>
				{
					<TextArea
						value={value}
						placeholder={``}
						onChange={textOnChange}
						disabled={!editable}
					/>
				}
			</TextAreaContainer>
		);
	}

	public createDropdown = (
		title: string,
		selectedCategory: string,
		categories: ICategory[],
		editable: boolean,
		editButtonOnClick: buttonOnClick,
		selectedItemOnChange: dropdownOnChange,
		key?: number | string
	): JSX.Element => {
		return (
			<DropdownContainer>
				<Label>
					{title}
				</Label>
				{
					<select
						disabled={!editable}
					>
						{
							categories.map((category: ICategory, idx: number) => {
								return (
									<option
										key={`category-${category.catId}`}
										id={`${category.catId}`}
										selected={selectedCategory === category.name}
									>
										{category.name}
									</option>
								);
							})
						}
					</select>
				}
			</DropdownContainer>
		);
	}

	public createTagsHandler = (
		title: string,
		tags: string,
		currentTag: string,
		editable: boolean,
		editButtonOnClick: buttonOnClick,
		tagsOnChange: (tags: any[], changed: any[], changedIndexes: number[]) => void,
		currentTagOnChange: (value: string) => void,
		key?: number | string
	): JSX.Element => {
		return (
			<TagsContainer>
				<Label>
					{title}
				</Label>
				{
					<TagsInput
						disabled={!editable}
						value={tags.split(`,`)}
						onChange={tagsOnChange}
						inputValue={currentTag}
						onChangeInput={currentTagOnChange}
					/>
				}
			</TagsContainer>
		);
	}

	public createSendButton = (
		onSendClick: buttonOnClick,
		key?: string | number
	): JSX.Element => {
		return (
			<button onClick={onSendClick}>
				Abschicken
			</button>
		);
	}
}