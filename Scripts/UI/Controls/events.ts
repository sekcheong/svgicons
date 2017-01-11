namespace Epic.SystemPulse.UI.Controls {

	export const enum KeyCode  {
		ESCAPE = 27,
		UP_ARROW = 38,
		DOWN_ARROW = 40,
		LEFT_ARROW = 37,
		RIGHT_ARROW = 39,
		SHIFT = 16,
		CONTROL = 17,
		ALT = 18,
		CAPS_LOCK = 20,
		COMMAND = 91,
		SPACE = 32,
		TAB = 9,
		ENTER = 13
	}

	export const enum MouseButton {
		LEFT = 1,
		MIDDLE = 2,
		RIGHT = 3
	}

	//event names shared by all components
	export const Events = {
		CLICK: "click",
		KEY_DOWN: "keydown",
		KEY_UP: "keyup",
		PASTE: "paste",
		CUT:"cut",
		RESIZE: "resize",
		FOCUS: "focus",
		BLUR: "blur",		
		MOUSE_ENTER: "mouseenter",
		MOUSE_LEAVE: "mouseleave",
		MOUSE_DOWN: "mousedown",
		MOUSE_UP: "mouseup",
		MOUSE_MOVE: "mousemove",
		FORCE_CLOSE: "ux-force-close"
	}
}