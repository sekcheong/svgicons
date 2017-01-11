namespace Epic.SystemPulse.UI.Controls {
	export class Menu extends View {
		private _items: MenuItem[];
		private _itemMap: {};
		private _ul;
		private _maxItemWidth = 0;
		private _visible: boolean | any;
		private _index;
		private _menuType;
		

		static ClassName = {
			MENU: "ux-menu",
			INPUT_DROPDOWN: "ux-input-menu",
		}

		static Events = {
			OPEN: "MenuOpen",
			BEFORE_CLOSE: "MenuBeforeClose",
			CLOSED: "MenuClosed",
			SELECTED_ITEM_CHANGED: "MenuSelectedItemChanged",
			ITEM_CLICK: "MenuItemClick"
		}

		static MenuType = {
			DEFAULT: "default",
			INPUT_DROPDOWN: "input-dropdown"
		}

		constructor(text?: string, menuType?: string) {
			super();
			this._items = [];
			this._itemMap = {};
			this._visible = null;
			this._menuType = menuType;
		}


		public add(item: MenuItem) {			
			if (item instanceof MenuItem) {
				if (this._itemMap[item.key()]) {
					console.error("menu.add: Item ", item, " already exist.");
					return;
				}
				this._itemMap[item.key()] = item;
				this._items.push(item);
				item.parent(this);
				if (this._ul) {
					this.renderOneItem(item, this._ul);
				}
			}
		}


		public items(): MenuItem[] {
			return this._items;
		}


		public remove(key: string) {
			var m: MenuItem = this._itemMap[key];
			if (!m) return;
			delete this._itemMap[key];
			this._items = this._items.filter(function (item) {
				return item.key() == key;
			})
			m.unrender();
		}


		public exist(key: string) {
			return this._itemMap[key] != null;
		}


		public clear() {
			for (var i = 0; i < this._items.length; i++) {
				this._items[i].unrender();
			}
			this._itemMap = {};
			this._items = [];
			this._index = null;
		}


		public destroy() {
			this.clear();
			$(this._ul).remove();
			$(this.htmlNode()).remove();
			this.htmlNode(null);
			this._ul = null;
			this.subscribeGlobalEvents(false);
			super.destroy();
		}


		public render(target: any)  {
			var div = $("<div/>")
				.addClass(Menu.ClassName.MENU);
			if (parent) {
				div.appendTo($(target));
			}

			this.htmlNode(div[0]);
			if (this._menuType == Menu.MenuType.INPUT_DROPDOWN) {
				div.addClass(Menu.ClassName.INPUT_DROPDOWN);
			}

			if (!this.visible()) {
				div.hide();
			}

			if (this.width() != null) {
				div.width(this.width());
			}

			if (this.height() != null) {
				div.height(this.height());
			}

			if (this.left() != null) {
				div.css("left", this.left());
			}

			if (this.top() != null) {
				div.css("top", this.top());
			}

			var ul = $("<ul/>")
				.addClass(Menu.ClassName.MENU)
				.appendTo(div);
			this._ul = ul;

			var totalHeight = 0;
			for (var i = 0; i < this._items.length; i++) {
				this.renderOneItem(this._items[i], ul);
				totalHeight = totalHeight + this._items[i].height();
			}

			//console.log("menu.totalHeight:", totalHeight);
			//div.height(totalHeight);

			return this.htmlNode();
		}


		private renderOneItem(item: MenuItem, ul) {
			var li = $("<li/>");
			li.appendTo(ul);
			item.render(li);
			var that = this;
			item
				.on(Events.CLICK, function (e) {
					that.invokeAsync(Menu.Events.ITEM_CLICK, new EventParam(item, that, e));
					that.visible(false);
				})
				.on(Events.MOUSE_ENTER, function () {

				})
				.on(Events.MOUSE_LEAVE, function () {

				});
			return li;
		}


		public visible(value?: boolean): boolean {
			if (arguments.length == 0) { return this._visible; }
			if (!this.htmlNode()) { return false; }

			if (typeof value !== "boolean") return;

			if (value === this._visible) return;

			if (!value) {
				$(this.htmlNode()).fadeOut(250);
				$("body").removeAttr("active-view");
				this.subscribeGlobalEvents(false);
			}
			else {
				var key = $("body").attr("active-view");
				if (key && key.length > 0) {
					$("body").trigger(Events.FORCE_CLOSE);
				}
				//this.readjustHeight();
				$(this.htmlNode()).fadeIn(50);
				$("body").attr("active-view", this.uid());
				this.subscribeGlobalEvents(true);
			}
			this._visible = value;
		}

		private subscribeGlobalEvents(shouldSubscribe: boolean) {
			
			if (!shouldSubscribe) {
				$(document)
					.off(this.makeEventKey(Events.KEY_DOWN))
					.off(this.makeEventKey(Events.BLUR))
					.off(this.makeEventKey(Events.CLICK));
				$(window).off(this.makeEventKey(Events.RESIZE));
				return;
			}

			var that = this;
			$(document)
				.on(this.makeEventKey(Events.KEY_DOWN), function (e) {
					if (that.items().length == 0) return;
					switch (e.keyCode) {
						case KeyCode.DOWN_ARROW:
							e.stopPropagation();
							e.preventDefault();
							that.handleNavDown();
							break;
						case KeyCode.UP_ARROW:
							e.stopPropagation();
							e.preventDefault();
							that.handleNavUp();
							break;
						case KeyCode.TAB:
							e.stopPropagation();
							e.preventDefault();
							if (e.shiftKey) {
								that.handleNavUp();
							}
							else {
								that.handleNavDown();
							}
							break;
						case KeyCode.ESCAPE:
							e.stopPropagation();
							e.preventDefault();
							that.handleClose();
							break;
						case KeyCode.ENTER:
							e.stopPropagation();
							e.preventDefault();
							that.handleEnter();
							break;
					}
				})
				.on(this.makeEventKey(Events.BLUR), function (e) {
					that.handleClose();
				})
				.on(this.makeEventKey(Events.CLICK), function (e) {
					var param = new EventParam(null, that, e);
					that.invoke(Menu.Events.BEFORE_CLOSE, param);
					if (!param.isCanceled()) {
						e.preventDefault();
						e.stopPropagation();
						that.handleClose();
					}
				})
				.on(Events.FORCE_CLOSE, function (e) {
					e.preventDefault();
					e.stopPropagation();
					that.handleClose();
				});

			$(window).on(this.makeEventKey(Events.RESIZE), function (e) {
				that.handleClose();
			});
		}


		private handleNavUp() {
			var index = this._index;
			if (index == null) {
				index = 0;
			}
			else {
				index--;
				if (index < 0) {
					index = 0;
				}
			}
			console.log("menu.handleNavUp():", index);
			this.changeSelectedItem(index);
		}


		private handleNavDown() {
			var index = this._index;
			if (index == null) {
				index = 0;
			}
			else {
				index++;
				if (index >= this._items.length) {
					index = this._items.length - 1;
				}
			}
			console.log("menu.handleNavDown():", index);
			this.changeSelectedItem(index);
		}


		private changeSelectedItem(index: number) {
			if (this._index === index) return;
			if (this._index != null) {
				this._items[this._index].selected(false);
			}
			this._index = index;
			var item = this._items[index];
			item.selected(true);
			Util.scrollIntoView(item.htmlNode(), this.htmlNode());
			this.invokeAsync(Menu.Events.SELECTED_ITEM_CHANGED, new EventParam(item, this));
		}


		private handleEnter() {
			console.log("menu.handleEnter()");
			if (this._index == null) this._index = 0;
			var item = this._items[this._index];
			this.visible(false);
			this.invokeAsync(Menu.Events.ITEM_CLICK, new EventParam(item, this));
		}


		private handleClose() {
			console.log("menu.handleClose()");
			this._index = null;
			this.visible(false);
			this.invokeAsync(Menu.Events.CLOSED, null);
		}



		public adjustWidth() {
			if (!this.htmlNode()) return;
			var maxWidth = 0;
			//find the widest li item
			for (let i = 0; i < this._items.length; i++) {
				let elm = this._items[i].htmlNode();
				let w = Math.max(elm.scrollWidth, $(elm).outerWidth());
				if (w > maxWidth) maxWidth = w;
			}
			//check to see if the scroll bar is visible, if it's visible
			//we need to account for the scroll bar width
			if ($(this._ul).outerHeight() > $(this.htmlNode()).outerHeight()) {
				maxWidth = maxWidth + Util.getScrollBarWidth();
			}

			if (maxWidth > 0) {
				$(this.htmlNode()).width(maxWidth);
			}
		}


		public adjustHeight() {
			if (!this.htmlNode()) return;
			var height = $(this._ul).outerHeight();
			var bb = parseInt($(this.htmlNode()).css("border-bottom-width"));
			var bt = parseInt($(this.htmlNode()).css("border-top-width"));
			if (height > $(this.htmlNode()).outerHeight()) {
				$(this.htmlNode()).css("max-height", height + bb + bt);
			}
		}


		public disabled(value?: boolean): boolean {
			if (arguments.length == 0) return this._disabled;

			if (typeof value !== "boolean") return;

			this._disabled = value;
			if (this._disabled) {
				$(this.htmlNode()).addClass(ClassName.DISABLED);
			}
			else {
				$(this.htmlNode()).removeClass(ClassName.DISABLED);
			}
		}


		public selectedItem(item?: MenuItem | string | number): MenuItem {
			if (arguments.length == 0) {
				if (this._index != null) {
					return this._items[this._index];
				}
				else {
					return null;
				}
			}

			if (item instanceof MenuItem) {
				for (let i = 0; i < this._items.length; i++) {
					if (item.key() === this._items[i].key()) {
						this.changeSelectedItem(i);
						break;
					}
				}
			}
			else if (typeof item == "string") {
				for (let i = 0; i < this._items.length; i++) {
					if (item === this._items[i].text()) {
						this.changeSelectedItem(i);
						break;
					}
				}
			}
			else if (typeof item == "number") {
				if (this._items.length > 0) {
					if (item >= 0 && (item < this._items.length)) {
						this.changeSelectedItem(item as number);
					}
				}
			}
		}


		public onItemClicked(func: Function) {
			this.on(Menu.Events.ITEM_CLICK, func);
		}


		public scrollTop(top) {
			if (!this.htmlNode()) return;
			if (arguments.length == 0) return $(this.htmlNode()).scrollTop();
			else $(this.htmlNode()).scrollTop(top);
		}

	}
}