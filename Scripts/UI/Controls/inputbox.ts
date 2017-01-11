namespace Epic.SystemPulse.UI.Controls {

	export class InputBox extends View {
		private _menu: Menu;
		private _items: MenuItem[];
		private _input: HTMLElement;
		private _button: HTMLElement;
		private _selectedItem: MenuItem;
		private _filterFunc: Function;
		private _requestFunc: Function;
		private _beforeFilterFunc: Function;
		private _itemClickFunc: Function;
		private _itemPopulatedFunc: Function;		
		private _hasFocus: boolean;
		private _placeHolder: string;
		private _isComboBox: boolean;
		private _text: string;
		private _timeout;
		protected _visible: boolean;


		//display the auto completion box 200ms after the user stop typing
		static AUTOCOMPLETE_DELAY = 200;  
		

		static ClassName = {
			INPUT: "ux-input",
			INPUT_BUTTON: "ux-input-btn",
			CONTAINER_INLINE: "ux-container-inline",
		}


		static Events = {
			ITEM_CLICK: "InputItemClick"
		}


		constructor() {
			super();
			this._items = [];
			this._visible = true;			
		}


		public render(target: any) {
			var div = $("<div/>")
				.addClass(InputBox.ClassName.INPUT);

			if (parent) {
				div.appendTo(target);
			}

			this.htmlNode(div[0]);

			var that = this;
			var inputBox = $("<input/>")
				.addClass(InputBox.ClassName.INPUT)
				//class for input box with drop down button
				.addClass(InputBox.ClassName.INPUT_BUTTON)  
				.attr("type", "text")
				.attr("placeholder", this.placeHolder())
				//disable the spell checker for safari and chrome
				.attr("spellcheck", "false")
				//disable autocomplete
				.attr("autocomplete", "off")
				.on(Events.PASTE, function (e) {
					that.handleInputPasteOrCut(e);
				})
				.on(Events.CUT, function (e) {
					that.handleInputPasteOrCut(e);
				})
				.on(Events.KEY_DOWN, function (e) {
					that.handleInputKeyDown(e);
				})
				.on(Events.CLICK, function (e) {
					if (that._isComboBox) {
						that.handleInputClick(e);
					}

				})
				.on(Events.FOCUS, function (e) {
					that._hasFocus = true;
				})
				.on(Events.BLUR, function (e) {
					that._hasFocus = false;
				})
				.appendTo(div);

			this._input = inputBox[0];

			//if it's a combo box the text field should be read only
			if (this._isComboBox) {
				inputBox.prop("readonly", true);				
			}

			var button = $("<button/>")
				.addClass(InputBox.ClassName.INPUT_BUTTON)
				//disable the tab stop for the drop down button
				.attr("tabindex", "-1") 
				.on(Events.CLICK, function (e) {
					that.handleDropDownButtonClick(e);
				})
				.insertAfter(inputBox);
			this._button = button[0];


			inputBox.height(this.height());
			
			if (this.width()) {
				var w = this.width() - button.width();
				inputBox.width(w);
			}

			this.setButtonSize();
			
			if (this._selectedItem) {
				inputBox.val(this._selectedItem.text());
			}

			//make sure we are in the correct enable/disable state
			this.disabled(this._disabled);

			if (!this._visible) {
				div.hide();
			}
			return this.htmlNode();
		}


		public refresh() {
			this.setButtonSize();
		}


		private setButtonSize() {
			//the JQuery outerHeight() function will return a rounded off value 
			//of the width, for example, when the element's actual height is 31.6
			//outerHeight() returns 32 instead. However, the set width function 
			//does take fractional pixel values. This might be a bug in the
			//current version (1.10.2) of the JQuery. 
			var inputBox = $(this._input);
			var button = $(this._button);
			var div = $(this.htmlNode());
			var inputH: number = inputBox[0].getBoundingClientRect().height;
			button.height(inputH);
			button.width(inputH);
			div.width(inputBox.outerWidth() + button.outerWidth());
			div.height(inputH);
		}


		public destroy() {
			this._menu.destroy();
			$(this._button).remove();
			$(this._input).remove();
		}


		private handleInputPasteOrCut(e: JQueryEventObject) {
			var that = this;
			//use setTimeout() to wait a few millisecond to 
			//let browser to have a chance to update the 
			//text after paste or cut operation
			setTimeout(function () {
				var text = $(that._input).val();
				that.startAutoComplete(text);
			}, 100);
		}


		private handleInputClick(e: BaseJQueryEventObject) {
			this.startAutoComplete(null);
		}


		private handleInputKeyDown(e: JQueryEventObject) {
			clearTimeout(this._timeout);
			var that = this;
			switch (e.keyCode) {
				case KeyCode.DOWN_ARROW:
					//the down arrow key opens the drop down menu 
					if (!this.dropDownMenuVisible()) {
						this.startAutoComplete(null);
					}
					return;
				case KeyCode.UP_ARROW:
				case KeyCode.LEFT_ARROW:
				case KeyCode.RIGHT_ARROW:
				case KeyCode.TAB:
				case KeyCode.ESCAPE:
				case KeyCode.ENTER:
					return;
				default:
					//let the control key bubble up and only care about the character keys
					this._timeout = setTimeout(function () {
						var newText = $(that._input).val();
						if (newText !== that._text) {
							that.startAutoComplete(newText);
						}
					}, InputBox.AUTOCOMPLETE_DELAY)
			}
		}


		private handleWindowResize(e: JQueryEventObject) {
			if (this.dropDownMenuVisible()) {
				this.dropDownMenuSetPosition();
			}
		}


		private handleDropDownButtonClick(e: JQueryEventObject) {
			e.preventDefault();
			e.stopPropagation();

			//we need to return the focus back to the input box so user can keep typing
			$(this._input).focus();

			if (!this.dropDownMenuVisible()) {
				this.startAutoComplete(null);
			}
			else {
				this.dropDownMenuHide();
			}
		}


		private handleDropDownMenuBeforeClose(e: EventParam) {
			if (this._hasFocus) {
				e.cancel();
			}
		}


		private handleDropDownMenuClose(e: EventParam) {
			console.log("InputBox.handleDropDownMenuClose()");
			if (this._selectedItem != null) {
				this.text(this._selectedItem.text());
			}
			else {
				$(this._input).val(this._text);
			}
			$(this._input).removeAttr("ux-state");
			$(this._input).focus();
		}


		private handleDropDownMenuItemClick(e: EventParam) {
			var item: MenuItem = e.data();
			this.selectedItem(item);
			$(this._input).removeAttr("ux-state");
			$(this._button).removeAttr("ux-state");
			$(this._input).focus();
			e.context(this);
			this.invokeAsync(InputBox.Events.ITEM_CLICK, e);
		}


		private handleDropDownSelItemChange(e: EventParam) {
			var item: MenuItem = e.data();
			$(this._input).val(item.text());
		}


		private startAutoComplete(searchTerm: string) {
			console.log("InputBox.startAutoComplete()");
			var that = this;

			if (this._beforeFilterFunc) {
				searchTerm = this._beforeFilterFunc.call(this, searchTerm);
			}

			var itemFilter = this._filterFunc || InputBox.makeDefaultFilter(searchTerm);

			var itemProvider = this._requestFunc || InputBox.defaultItemProvider;

			var param = new EventParam(this._items, this);
			param.data(this._items);
			param.onComplete(function () {
				var srcItems: MenuItem[] = param.data();
				var items = [];

				//apply filter to each items
				if (srcItems) {
					for (let i = 0; i < srcItems.length; i++) {
						let item = itemFilter.call(that, srcItems[i]);
						if (item) {
							items.push(item);
						}
					}
				}

				if (!that._menu) {
					that._menu = that.dropDownMenuCreate();
				}
				else {
					that._menu.clear();
				}

				if (items.length == 0) {
					that.dropDownMenuHide();
					return;
				}

				//populate and show the drop down menu
				for (let i = 0; i < items.length; i++) {
					that._menu.add(items[i]);
				}

				that.dropDownMenuShow();

				if (that._itemPopulatedFunc) {
					let p = new EventParam(items, that);
					Util.callAsync(that._itemPopulatedFunc, that, p);
				}

			});

			Util.callAsync(itemProvider, this, param);
		}


		private dropDownMenuCreate(): Menu {
			console.log("inputbox.dropDownMenuCreate()");
			var menu = new Menu(null, Menu.MenuType.INPUT_DROPDOWN);
			menu.visible(false);
			menu.parent(this);

			var that = this;
			menu
				.on(Menu.Events.CLOSED, function (e: EventParam) {
					that.handleDropDownMenuBeforeClose(e);
				})
				.on(Menu.Events.CLOSED, function (e: EventParam) {
					that.handleDropDownMenuClose(e);
				})
				.on(Menu.Events.ITEM_CLICK, function (e: EventParam) {
					that.handleDropDownMenuItemClick(e);
				})
				.on(Menu.Events.SELECTED_ITEM_CHANGED, function (e: EventParam) {
					that.handleDropDownSelItemChange(e);
				});

			return menu;
		}


		private dropDownMenuVisible(): boolean {
			if (!this._menu) return false;
			return this._menu.visible();
		}


		private dropDownMenuHide() {
			console.log("InputBox.dropDownMenuHide()");
			if (this.dropDownMenuVisible()) {
				this._menu.visible(false);
				$(this._input).focus();
				$(this._input).removeAttr("ux-state");
				$(this._button).removeAttr("ux-state");
			}
		}


		private dropDownMenuShow() {
			console.log("InputBox.dropDownMenuShow()");
			if (this._menu.items().length == 0) { return; }
			if (!this._menu.rendered()) {
				this._menu.render($("body"));
			}
			this.dropDownMenuSetPosition();
			this._menu.visible(true);
			this._menu.scrollTop(0);
			$(this._input).attr("ux-state", "open");
			$(this._button).attr("ux-state", "open");
		}


		private dropDownMenuSetPosition() {
			var input = $(this._input);
			var bb = parseFloat($(this._input).css("border-bottom-width"));
			//console.log("dropDownMenuSetPosition():", input[0].getBoundingClientRect().height, bb, $(this._input).css("border-bottom-width"));
			var top = input[0].getBoundingClientRect().height + input.offset().top - bb;
			var left = input.offset().left;

			var bl = parseFloat($(this._menu.htmlNode()).css("border-left-width"));
			var br = parseFloat($(this._menu.htmlNode()).css("border-right-width"));
			this._menu.top(top);
			this._menu.left(left);
			this._menu.width($(this.htmlNode()).outerWidth() - (bl + br));
		}


		public itemsAdd(value: string | MenuItem, helpText?: string, data?: any, key?: any): MenuItem {
			var item;
			if (value instanceof MenuItem) {
				item = value;
			}
			else if (typeof value == "string") {
				item = new MenuItem(value, helpText, data, key);
			}
			else {
				console.error("inputbox.itemsAdd(): Invalid value type ", value);
				return;
			}
			this._items.push(item);
			return item;
		}


		public itemsClear() {
			this._selectedItem = null;
			this._items = [];
		}


		public items(): MenuItem[] {
			return this._items;
		}


		public text(value: string): string {
			if (arguments.length == 0) {
				return this._text;
			}
			this._text = value;
			if (this._input) {
				$(this._input).val(value);
			}
		}


		public isComboBox(value?: boolean): boolean {
			if (arguments.length == 0) return this._isComboBox;			
			this._isComboBox = value;
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) return this._disabled;

			if (typeof value !== "boolean") return;

			this._disabled = value;
			if (!this._input || !this._button) return;

			if (!this._disabled) {
				$(this._input).removeAttr("disabled");
				$(this._button).removeAttr("disabled").prop("disabled", false);
			}
			else {
				$(this._input).attr("disabled", "disabled");
				$(this._button).attr("disabled", "disabled").prop("disabled", true);
			}
		}


		public visible(value?: boolean): boolean {
			
			if (arguments.length == 0) return this._visible;
			
			if (typeof value !== "boolean") return;

			this._visible = value;

			if (!this._visible) {
				$(this.htmlNode()).hide();
			}
			else {
				$(this.htmlNode()).show();
			}			
		}


		public selectedItem(value?: MenuItem | number | string): MenuItem {
			//console.log("inputbox.selectedItem()", "value:", value);
			if (arguments.length == 0) {
				return this._selectedItem;
			}

			var selItem: MenuItem;

			if (value instanceof MenuItem) {
				selItem = value;
			}
			else if (typeof value === "number") {
				if (value >= 0 && value < this._items.length) {
					selItem = this._items[value];
				}
			}
			else if (typeof value === "string") {
				selItem = null;
				for (let i = 0; i < this._items.length; i++) {
					if (this._items[i].text() === value) {
						selItem = this._items[i];
						break;
					}
				}
			}
			else {
				selItem = null;
			}

			this.setSelectedItem(selItem);			
		}


		private setSelectedItem(item: MenuItem) {
			this._selectedItem = item;
			if (item) {
				this.text(item.text());
			}
			else {
				this.text(null);
			}
		}


		public placeHolder(value?: string) {
			if (arguments.length == 0) {
				return this._placeHolder;
			}
			this._placeHolder = value;
		}


		public onRequestItems(func: Function) {
			this._requestFunc = func;
		}


		public onBeforeFilterItems(func: Function) {
			this._beforeFilterFunc = func;
		}


		public onFilterItem(func: Function) {
			this._filterFunc = func;
		}


		public onItemsPopulated(func: Function) {
			this._itemPopulatedFunc = func;
		}


		public onItemClick(func: Function) {
			this.on(InputBox.Events.ITEM_CLICK, func);
		}


		private static makeDefaultFilter(terms: string): Function {
			//if the search terms are not given, we simply return 
			//a function that returns every item. 
			if (terms == null || terms.length == 0) {
				return function (item: MenuItem): MenuItem {
					item.html(null);
					return item;
				}
			}

			//prepare a partial function that has the search 
			//regular expression already created
			var s = new RegExp("\\s\\s+", "g");
			var searchTerm = terms.replace(s, " ").trim();
			//matching accented characters
			var x = Util.escapeRegex(searchTerm).replace("e", "[eé]");
			//regex for matching selected items
			var m = new RegExp(x, "i");
			//for highlighting the matched substrings 
			var r = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + x + ")(?![^<>]*>)(?![^&;]+;)", "gi");

			//the closure property of function scope captures the 
			//calculated regular expression m, r, and s;
			return function (item: MenuItem): MenuItem {
				var text = item.text();
				item.html(null);
				if (m.test(text.replace(s, " "))) {
					//highlight the matched parts for item text
					text = text.replace(r, "<strong>$1</strong>");
					item.html(text);
					return item;
				}
				else if (item.helpText() && m.test(item.helpText().replace(s, " "))) {
					return item;
				}
			}

		}


		private static defaultItemProvider(e: EventParam) {
			var items: MenuItem[] = e.data();
			var copy = [];
			//the default item provide just make a copy of the items already defined
			items.forEach(function (item) {
				copy.push(item);
			});
			e.data(copy);
			e.done();
		}

	}
}