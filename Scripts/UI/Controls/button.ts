namespace Epic.SystemPulse.UI.Controls {
	export class Button extends View {

		static ClassName = { 
			BUTTON: "ux-btn",
			INPUT_BUTTON: "ux-input-btn",
		}

		private _text: string;
		private _helpText: string;

		constructor(text: string, key: string, helpText?: string, icon?: Image) {
			super();
			this._text = text;
			this._helpText = helpText;
		}
		
		public render(target: any) {
			var button = $("<button/>");
			button.appendTo($(target));
			this.htmlNode(button[0]);			
			var that = this;

			button.addClass(Button.ClassName.BUTTON)
				.on(this.makeEventKey(Events.CLICK), function () {
					that.invokeAsync(Events.CLICK, null);
				});

			button.text(this._text);
			if (!this.width()) {
				var fontSize = parseFloat(button.css("font-size"));
				fontSize = fontSize * 0.6180;
				var width = button.outerWidth() + 2 * fontSize;
				button.css("width", width);
			}
			else {
				button.css("width", this.width());
			}
		}


		public onClick(callback) {
			this.on(Events.CLICK, callback);
		}
	}
}