namespace Epic.SystemPulse.UI.Controls {
	export class MenuItem extends View {
		private _text: string;
		private _helpText: string;
		private _html: string;
		private _key;
		private _data;


		constructor(text: string, helpText?: string, data?: any, key?: any) {
			super();
			this._text = text;
			this._helpText = helpText;
			this._data = data;
			if (key != undefined) {
				this.key(key);
			}
		}


		public text(newTxt?: string): string {
			if (arguments.length == 0) {
				return this._text;
			}
			else {
				this._text = newTxt;
				var node = (this.htmlNode() ? $(this.htmlNode()) : null);
				if (node) node.text(this._text);
			}
		}


		public helpText(newTxt?: string): string {
			if (arguments.length == 0) return this._helpText;
			this._helpText = newTxt;
		}


		public html(newHtml?: string): string {
			if (arguments.length == 0) {
				return this._html;
			}
			else {
				this._html = newHtml;
				var node = (this.htmlNode() ? $(this.htmlNode()) : null);
				if (node) node.html(this._html);
			}
		}


		public unrender() {
			this.parent(null);
			if (!this.htmlNode()) return;
			$(this.htmlNode()).remove();
			this.htmlNode(null);
		}


		public destroy() {
			this.unrender();
		}


		public render(target: any) {			
			var a = $("<a/>");
			if (parent) a.appendTo($(target));
			this.htmlNode(a[0]);
			
			if (this._html) {
				a.html(this._html);
			}
			else {
				a.text(this._text);
			}

			var that: MenuItem = this;
			a.attr("title", this._helpText)
				.on(Events.CLICK, function (e) {
					if (that.disabled()) return;
					e.preventDefault();
					e.stopPropagation();
					that.invokeAsync(Events.CLICK, new EventParam(that, that, e));
				});

			return this.htmlNode();
		}


		public selected(value?: boolean): boolean {
			if (!this.htmlNode()) return false;

			var a = $(this.htmlNode());
			if (arguments.length == 0) {
				return a.hasClass(ClassName.SELECTED);
			}

			if (value) {
				if (!a.hasClass(ClassName.SELECTED)) {
					a.addClass(ClassName.SELECTED);
				}
			}
			else {
				a.removeClass(ClassName.SELECTED);
			}
		}


		public key(value?: any): any {
			if (arguments.length == 0) {
				if (this._key == null) return this.uid();
				return this._key;
			}
			if (value == null) {
				throw new Exception("MenuItem.key(): key value cannot be null or undefined.");
			}
			this._key = value;
		}


		public data(value?: any) {
			if (arguments.length == 0) return this._data;
			this._data = value;
		}


		public height(h?: number): number | any {
			super.height(h);
			if (arguments.length == 0) {
				if (this.htmlNode()) {
					return $(this.htmlNode()).outerHeight();
				}
				else {
					return 0;
				}
			}
			if (this.htmlNode()) {
				$(this.htmlNode()).height(h);
			}			
			return this;
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) {
				return  this._disabled;				
			}
			if (typeof value !== "boolean") return;
			this._disabled = value;
			if (this._disabled) {
				$(this.htmlNode()).addClass(ClassName.DISABLED);
			}
			else {
				$(this.htmlNode()).removeClass(ClassName.DISABLED);
			}
		}

	}
}