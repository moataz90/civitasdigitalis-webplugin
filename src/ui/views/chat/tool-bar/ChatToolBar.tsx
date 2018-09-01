import * as React from 'react';
import { Textbox } from './Textbox';
import { SendButton } from './SendButton';
import { sendTextMessage } from '../../../../socket-handler/socket-handler';
import styled, { keyframes } from 'styled-components';
import { connect, Dispatch } from 'react-redux';
import { IStoreSchema } from '../../../../redux-store/store-schema';
import { IPersistentMenu, ITextbox } from '../../../../redux-store/toolbar/toolbar.schema';
import { ItoolbarConfig } from '../../../../config/config-schema';

export interface IChatToolBarProps  /*  extends IPropsChildable  */ {
	className?: string;
	persistentMenu: IPersistentMenu;
	textbox: ITextbox;
	dispatch: Dispatch<any>;
	// theme: IThemeSchema;
	fontFamily: string;
	userID: string;
	toolbarConfig: ItoolbarConfig;

}

export interface IChatToolBarState {
	TextboxValue: string;
	showMenu: boolean;
	onlyFirstItem: boolean;
	currentMenuLevel: string;
}

const SingleItemContainer = styled.div`
	width: 100%;
	height: 90%;
    top: 0%;
	z-index: 999;
	font-family: Helvetica;
	/*font-size: 14px;*/
	color: #006E96;

}`;
const MenuContainer = styled.div`
	width: 100%;
	height: 90%;
    background-color: #00000059;
    position: absolute;
    top: 0%;
	z-index: 999;

	font-family: Helvetica;
	/*font-size: 14px;*/
	color: #006E96;

}`;

const FadeIn = keyframes`
0%   {opacity:0; transform:  translate(0px,150px); }
100% {opacity:1; transform:  translate(0px,0px);}

0%   {opacity:0; -moz-transform:  translate(0px,150px);}
100% {opacity:1; -moz-transform:  translate(0px,0px);}
0%   {opacity:0; -webkit-transform:  translate(0px,150px);}
100% {opacity:1; -webkit-transform:  translate(0px,0px);}
0%   {opacity:0; -o-transform:  translate(0px,150px)}
100% {opacity:1; -o-transform:  translate(0px,0px);}
0%   {opacity:0; -ms-transform:  translate(0px,150px);}
100% {opacity:1; -ms-transform:  translate(0px,0px);}
`;

const SingleItemMenu = styled.div`
	width: 100%;
    background-color: white;
    border-bottom: 0px;
    position: absolute;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: absolute;
    bottom: 0;
	left: 0;
	`;

const Menu = styled.div`
	width: 100%;
	padding-bottom: 2%;
    background-color: white;
    /* border-color: #bcbdc1; */
    /* border: 3px double #bcbdc1; */
    border-bottom: 0px;
    position: absolute;
    z-index: 10000;
    border-top-left-radius: 10px;
    /* border-style: double; */
    border-top-right-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 0;

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
`;

class ChatToolBarComponent extends React.Component<IChatToolBarProps, IChatToolBarState> {
	constructor(props: IChatToolBarProps) {
		super(props);

		// props.dispatch(getPersistentMenu());

		this.state = {
			TextboxValue: '',
			showMenu: false,
			onlyFirstItem: (props.toolbarConfig.enableTextInput === false) ? true : false,
			currentMenuLevel: ''
		};

		this.TextboxOnChange = this.TextboxOnChange.bind(this);
		this.SendButtonOnClick = this.SendButtonOnClick.bind(this);

		this.toggleMenu = this.toggleMenu.bind(this);
		this.ButtonClick = this.ButtonClick.bind(this);

		this.ButtonHomeClick = this.ButtonHomeClick.bind(this);
	}

	public TextboxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ TextboxValue: event.target.value });
	}

	public SendButtonOnClick = () => {
		if (this.state.TextboxValue.trim() !== '') {
			sendTextMessage(this.state.TextboxValue, this.props.userID);
			this.setState({ TextboxValue: '' });
			this.setState({ showMenu: false });
		}
	}
	public SendButtonOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

		if (e.key === 'Enter') {
			if (this.state.TextboxValue.trim() !== '') {
				sendTextMessage(this.state.TextboxValue, this.props.userID);
				this.setState({ TextboxValue: '' });
				this.setState({ showMenu: false });
			}
		}
	}

	public ButtonHomeClick = () => {
		alert('do somthing');
	}

	public toggleMenu = () => {
		this.setState({ showMenu: !this.state.showMenu });

		if (this.props.toolbarConfig.enableTextInput === false
			&& this.props.toolbarConfig.enablePersistentMenu === true
			&& this.state.showMenu === false) {
			this.setState({ onlyFirstItem: true });
		} else {
			this.setState({ onlyFirstItem: false });
		}
	}

	public toggleSingleItemMenu = () => {
		this.setState({ onlyFirstItem: !this.state.onlyFirstItem });
	}

	public ButtonClick = (ButtonIndex: number) => {
		alert(ButtonIndex);
	}

	public hidePersistentMenu = () => {
		this.toggleMenu();
	}

	public render() {
		const { className } = this.props;
		return (

			(this.props.toolbarConfig.enablePersistentMenu === true || this.props.toolbarConfig.enableTextInput === true) &&
			<React.Fragment>

				<div className={className}>
					{(this.props.toolbarConfig.enableTextInput === true) &&
						<React.Fragment>
							<Textbox
								value={this.state.TextboxValue}
								onChange={this.TextboxOnChange}
								onKeyUp={this.SendButtonOnKeyPress}
								placeholder="Nachricht schreiben …"
							/>
							<SendButton onClick={this.SendButtonOnClick} />

						</React.Fragment>

					}
				</div>
			</React.Fragment>

		);
	}
}

const ChatToolBarComponentStyled = styled(ChatToolBarComponent)`
&&&{
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    /* border: 1px solid #EBEBEB; */
    /* border-bottom-left-radius: 7px; */
    border-bottom-right-radius: 7px;
    padding: 10px;
    position: absolute;
    top: calc(100% - 41px);
    width: 100%;
    z-index: 1000;
    box-shadow: 0px -4px 20px 0px #ebebeb;
    font-family: ${props => props.fontFamily};
	font-size: 16px;
	color: #006E96;
	box-sizing: border-box;
}
`;

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		persistentMenu: storeState.toolbar.persistantMenu,
		textbox: storeState.toolbar.textbox,
		userID: storeState.user.sessionID,
	};
};

export const ChatToolBar = connect(mapStateToProps)(ChatToolBarComponentStyled);
