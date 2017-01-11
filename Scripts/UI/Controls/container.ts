namespace Epic.SystemPulse.UI.Controls {
	export class Container extends View {
		private _childViews: View[];

		constructor() {
			super();
			this._childViews = [];
		}

		public children(): View[] {
			return this._childViews;
		}

		public add(child: View) {
			//child.parent(this);
			this._childViews.push(child);
		}

		public remove(child: View) {
			var l = this._childViews.filter(function (item) {
				return (item.uid() != child.uid());
			});
			this._childViews = l;
		}

		public insertBefore(child: View) {
			
		}

		public insertAfter(child: View) {

		}
	}
}

////const NAME = 'dropdown'
////const VERSION = '4.0.0-alpha.5'
////const DATA_KEY = 'bs.dropdown'
////const EVENT_KEY = `.${DATA_KEY}`
////const DATA_API_KEY = '.data-api'
////const JQUERY_NO_CONFLICT = $.fn[NAME]
////const ESCAPE_KEYCODE = 27 // KeyboardEvent.which value for Escape (Esc) key
////const ARROW_UP_KEYCODE = 38 // KeyboardEvent.which value for up arrow key
////const ARROW_DOWN_KEYCODE = 40 // KeyboardEvent.which value for down arrow key
////const RIGHT_MOUSE_BUTTON_WHICH = 3 // MouseEvent.which value for the right button (assuming a right-handed mouse)

////const Event = {
////	HIDE: `hide${EVENT_KEY}`,
////	HIDDEN: `hidden${EVENT_KEY}`,
////	SHOW: `show${EVENT_KEY}`,
////	SHOWN: `shown${EVENT_KEY}`, 
////	CLICK: `click${EVENT_KEY}`,
////	CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
////	KEYDOWN_DATA_API: `keydown${EVENT_KEY}${DATA_API_KEY}`
////}

////const ClassName = {
////	BACKDROP: 'dropdown-backdrop',
////	DISABLED: 'disabled',
////	ACTIVE: 'active'
////}

////const Selector = {
////	BACKDROP: '.dropdown-backdrop',
////	DATA_TOGGLE: '[data-toggle="dropdown"]',
////	FORM_CHILD: '.dropdown form',
////	ROLE_MENU: '[role="menu"]',
////	ROLE_LISTBOX: '[role="listbox"]',
////	NAVBAR_NAV: '.navbar-nav',
////	VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, '
////	+ '[role="listbox"] li:not(.disabled) a'
////}


//export class Container extends View {
//	private _mainWnd: any;
//	private _header: any;
//	private _client: any;
//	private _mouseDown: boolean = false;
//	private _x: number;
//	private _y: number;
//	private _elmX: number;
//	private _elmY: number;
//	private _headerHeight: number;

//	constructor() {
//		super();
//		//this._width = 400;
//		//this._height = 250;
//		//this._headerHeight = 30;
//	}

//	public render(parent?: any): HTMLElement {
//		//var _this = this;
//		//this._mainWnd = $("<div></div>")
//		//	.addClass("view")				
//		//	.css("position", "absolute")
//		//	.css("left",50)
//		//	.width(this._width)
//		//	.height(this._height);

//		//this._header = $("<div></div>")
//		//	.addClass("header")
//		//	.width(this._width)
//		//	.height(this._headerHeight)
//		//	.on("mousedown", function (e) {
//		//		_this._x = e.pageX;
//		//		_this._y = e.pageY;
//		//		_this._elmX = +$(_this._mainWnd).css("left").replace("px", "");
//		//		_this._elmY = +$(_this._mainWnd).css("top").replace("px", "");
//		//		_this._mouseDown = true;					
//		//		//console.log("l:", $(_this._mainWnd).css("left"));
//		//		//console.log("t:", $(_this._mainWnd).css("top"));
//		//		//console.log("p:", $(_this._mainWnd).css("position"));					
//		//		//console.log("mousedown");
//		//		//console.log("E:"+Event.KEYDOWN_DATA_API);
//		//		e.stopPropagation();
//		//	})
//		//	.on("mouseup", function (e) {
//		//		if (_this._mouseDown) {
//		//			_this._mouseDown = false;						
//		//		}
//		//		console.log("mouseup");
//		//	})
//		//	.on("mouseout", function (e) {
//		//		_this._mouseDown = false;
//		//	})
//		//	.on("hover", function (e) {
//		//		console.log("hover");
//		//	})
//		//	.on("mousemove", function (e) {
//		//		if (_this._mouseDown) {
//		//			let dx = e.pageX - _this._x;
//		//			let dy = e.pageY - _this._y;
//		//			let w = $(_this._mainWnd);
//		//			let h = $(_this._header);
//		//			let c = $(_this._client);						
//		//			var left = _this._elmX + dx;
//		//			var top = _this._elmY + dy;
//		//			w.css({ left: left + "px", top: top + "px" });								
//		//			//console.log("d:" + dx + "," + dy);
//		//			//console.log("w:" + w.css("left") + "," + w.css("top") + " ,L:" + left);
//		//		}
//		//		//console.log("mousemove: " + e.pageX + "," + e.pageY);					
//		//	})
//		//	.appendTo($(this._mainWnd));

//		//this._headerHeight = $(this._header).height();

//		//this._client = $("<div></div>")
//		//	.addClass("clientArea")
//		//	.width(_this._width)
//		//	.height(_this._height - _this._headerHeight)
//		//	.text("Hello!")
//		//	.appendTo($(this._mainWnd));

//		//$(this._mainWnd).appendTo($("body"));	
//		return null;
//	}

//	public add(w: View) {
//		this._client
//		//w.attach(this._client);
//	}
//}