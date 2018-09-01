export const bounceOut = `
	0% {
		transform: translate3d(0, 0px, 0);
	}
	50% {
		transform: translate3d(0, -100px, 0);
	}
	100% {
		transform: translate3d(0, -250px, 0); 
		display: none;
	}
`;

export const bounceIn = `
	0% {
		transform: translate3d(0, -100px, 0);
	}
	50% {
		transform: translate3d(0, 0px, 0);
	}
	70% {
		transform: translate3d(0, -10px, 0);
	}
	100% {
		transform: translate3d(0, 0px, 0);
	}
`;

const slideLeft = `
	0% {
		transform: translate3d(40px, 0, 0);
		opacity: 0.6;
	}
	25% {
		transform: translate3d(30px, 0, 0);
		opacity: 0.7;
	}
	50% {
		transform: translate3d(20px, 0, 0);
		opacity: 0.8;
	}
	75% {
		transform: translate3d(10px, 0, 0);
		opacity: 0.9;
	}
	100% {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
`;

const SlideDown = `
	0% {
		transform: translate3d(0, -100px, 0);
	}
	50% {
		transform: translate3d(0, 0px, 0);
	}
	70% {
		transform: translate3d(0, -10px, 0);
	}
	100% {
		transform: translate3d(0, 0px, 0);
	}
`;

const SlideUp = `
	0% {
		transform: translate3d(0, 0px, 0);
	}
	50% {
		transform: translate3d(0, -100px, 0);
	}
	100% {
		transform: translate3d(0, -250px, 0); 
		display: none;
	}
`;

export const globalCss = `
// Toast Messages part
	.ToastyMessage-enter {
		animation-delay: 1s;
		animation: bounceIn 0.5s;
	}
	@keyframes bounceIn {
		${bounceIn}
	}
	.ToastyMessage-exit {
		animation-delay: 1s;
		animation: bounceOut 0.5s;
	}  
	@keyframes bounceOut {
		${bounceOut}
	}

// Alternative Questions Part
	.AlternativeQuestions-enter {
	
	}
	@keyframes bounceIn {
		${SlideDown}
	}
	.AlternativeQuestions-exit {
		
	}  
	@keyframes bounceOut {
		${SlideUp}
	}

// Channels show delete button

	.channelsShowDeleteButton {
		animation: slideLeft 0.3s
	}

	@keyframes slideLeft {
		${slideLeft}
	}
`;