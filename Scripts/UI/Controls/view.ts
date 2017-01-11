namespace Epic.SystemPulse.UI.Controls {

	export interface Rect {
		left?: number;
		top?: number;
		width?: number;
		height?: number;
	}

	export class View {
		private _htmlElm: HTMLElement;
		private _parent: View;
		private _children: View[];		
		private _uid: string;
		private _extent: Rect;
		private _callbacks;
		private _props;
		protected _disabled;


		constructor(parent?: View) {
			this._parent = parent;
			this._extent = {};
			this._callbacks = {};
			this._children = [];
		}


		public render(target: any) {

		}


		public unrender() {

		}


		public rendered(): boolean {
			return this.htmlNode() != null;
		}


		public destroy() {

		}


		public htmlNode(elm?: HTMLElement): HTMLElement {
			if (arguments.length == 0) {
				return this._htmlElm;
			}
			if (elm && !(elm instanceof HTMLElement)) {
				throw new Exception("Item is not an instance of HTMLElement!", elm);
			}
			this._htmlElm = elm;
		}


		public parent(p?: View): View {
			if (arguments.length == 0) {
				return this._parent;
			}
			else {
				this._parent = p;
			}
		}


		public width(w?: number): any {
			if (arguments.length == 0) {
				return this._extent.width;
			}
			this._extent.width = w;
			if (this.htmlNode()) {
				$(this.htmlNode()).width(w);
			}
			return this;
		}


		public height(h?: number): any {
			if (arguments.length == 0) {
				return this._extent.height;
			}
			this._extent.height = h;
			if (this.htmlNode()) {
				$(this.htmlNode()).height(h);
			}
			return this;
		}


		public top(y?: number): any {
			if (arguments.length == 0) {
				return this._extent.top;
			}
			this._extent.top = y;
			if (this.htmlNode()) {
				$(this.htmlNode()).css("top", y);
			}
			return this;
		}


		public left(x?: number): any {
			if (arguments.length == 0) {
				return this._extent.left;
			}
			this._extent.left = x;
			if (this.htmlNode()) {
				$(this.htmlNode()).css("left", x);
			}
			return this;
		}


		public visible(value?: boolean): boolean {
			return false;
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) {
				return this._disabled;
			}
			else {
				this._disabled = value;
			}
		}


		public focus() {
			if (this.htmlNode()) {
				$(this.htmlNode()).focus();
			}
		}


		public uid(): string {
			if (!this._uid) {
				this._uid = Util.getUID("K");
			}
			return this._uid;
		}


		public on(event: string, callback: Function): View {
			this._callbacks[event] = callback;
			return this;
		}


		public off(event: string): View {
			if (!this._callbacks) return;
			this._callbacks[event] = null;
			return this;
		}


		public invoke(event: string, param?: EventParam): View {
			var func: Function = this._callbacks[event];
			if (!func) return;
			//default is to use caller's this
			var context = this;
			if (param && param.context()) {
				context = param.context();
			}
			func.call(context, param);
			return this;
		}


		public invokeAsync(event: string, param: EventParam): View {
			if (!this._callbacks[event]) return;
			var that = this;
			setTimeout(function () {
				that.invoke(event, param);
			});
			return this;
		}


		public prop(name: string, value: any) {
			if (!this._props) this._props = {};
			if (arguments.length == 1) {
				return this._props[name];
			}
			else if (arguments.length == 2) {
				if (value === undefined) delete this._props[name];
				this._props[name] = value;
				return this;
			}
		}


		public refresh() {
			this._children.forEach(function (child) {
				child.refresh();
			});
		}


		protected makeEventKey(event: string): string {
			var name = (<any>this).constructor.name;
			return event + ".ux." + name + "." + this.uid();
		}


		protected insertChild(child: View, index?: number) {
			this._children.push(child);
		}


		protected removeChild(child: View): View {
			this._children = this._children.filter(function (value) {
				if (child === value) {
					value._parent = null;
					return true;
				}
			});
			return this;
		}

		protected

	}
}