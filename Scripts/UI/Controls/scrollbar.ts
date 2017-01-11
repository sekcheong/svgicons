namespace Epic.SystemPulse.UI.Controls {

	export class Scrollbar extends View {

		private _options: any;
		private _parentView: HTMLElement;
		private _visible: boolean;

		static ClassName = {
			SCROLLBAR: "ux-scrollbar",
			SCROLLBAR_THUMB: "ux-scrollbar-thumb",
		}


		constructor() {
			super();
		}


		public attachTo(element: any) {
			var p = $(element);
			this._parentView = p[0];
			var w = p.innerWidth();
			var rail = $("<div>");
			var thumb = $("<div>");
		
			rail
				.addClass(Scrollbar.ClassName.SCROLLBAR)
				.css("position", "absolute");

			thumb
				.addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
				.css("position", "absolute");

			rail.appendTo(p);
			rail.height("100%");
			rail.css("top", 0);
			console.log("p.width", p.width(),p.innerWidth());
			var left = w - rail.outerWidth();
			console.log("left", left);
			rail.css("left", left);

			thumb.height(25);
			thumb.css("top", 35);
			thumb.css("left", 0);
			thumb.appendTo(rail);			

		}
	}


	class ScrollBarRail extends View {

		private _parentView;
		private _visible: boolean;

		constructor(options) {
			super();
		}

		public render(target: any) {
			var p = $(target);
			this._parentView = p[0];
			var w = p.innerWidth();
			
			var rail = $("<div>");
			this.htmlNode(rail[0]);
			
			rail
				.addClass(Scrollbar.ClassName.SCROLLBAR)
				.css("position", "absolute");

			rail.appendTo(p);
			rail.height("100%");
			rail.css("top", 0);
			console.log("ScrollBarRail: p.width", p.width(), p.innerWidth());

			var left = w - rail.outerWidth();
			rail.css("left", left);
			console.log("ScrollBarRail:left", left);
			
			return rail[0];
		}


		public visible(value?: boolean): boolean {
			if (arguments.length == 0) {
				if (this.parent()) return this.parent().visible();
				return this._visible;
			}
			if (typeof value === "boolean") {
				this._visible = value;
				if (this._visible) {
					$(this.htmlNode()).show();
				}
				else {
					$(this.htmlNode()).hide();
				}
			}
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) {				
				return this._disabled;
			}

			if (typeof value === "boolean") {
				this._disabled = value;
			}
		}

	}


	class ScrollBarThumb extends View {
		private _scrollRail: ScrollBarRail;
		private _parentHTML;

		constructor() {
			super();
		}
		
		public render(target: any) {
			var p = $(target);
			this._parentHTML = p[0];
			var w = p.innerWidth();

			var thumb = $("<div>");
			thumb.appendTo(p);
			this.htmlNode(thumb[0]);

			thumb
				.addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
				.css("position", "absolute");

			thumb.height(25);
			thumb.css("top", 35);
			thumb.css("left", 0);

			return this.htmlNode();
		}


		public visible(value?: boolean): boolean {
			return false;
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) return this._disabled;
			else this._disabled = value;
		}
		
	}

}