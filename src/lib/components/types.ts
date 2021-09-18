export type InputEvent = Event & {
	currentTarget: EventTarget & HTMLInputElement;
};
export type SvelteFocusEvent = FocusEvent & {
	currentTarget: EventTarget & HTMLInputElement;
};
