var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Epic;
(function (Epic) {
    var SystemPulse;
    (function (SystemPulse) {
        var UI;
        (function (UI) {
            var Controls;
            (function (Controls) {
                var Menu = (function (_super) {
                    __extends(Menu, _super);
                    function Menu(text, menuType) {
                        _super.call(this);
                        this._maxItemWidth = 0;
                        this._items = [];
                        this._itemMap = {};
                        this._visible = null;
                        this._menuType = menuType;
                    }
                    Menu.prototype.add = function (item) {
                        if (item instanceof Controls.MenuItem) {
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
                    };
                    Menu.prototype.items = function () {
                        return this._items;
                    };
                    Menu.prototype.remove = function (key) {
                        var m = this._itemMap[key];
                        if (!m)
                            return;
                        delete this._itemMap[key];
                        this._items = this._items.filter(function (item) {
                            return item.key() == key;
                        });
                        m.unrender();
                    };
                    Menu.prototype.exist = function (key) {
                        return this._itemMap[key] != null;
                    };
                    Menu.prototype.clear = function () {
                        for (var i = 0; i < this._items.length; i++) {
                            this._items[i].unrender();
                        }
                        this._itemMap = {};
                        this._items = [];
                        this._index = null;
                    };
                    Menu.prototype.destroy = function () {
                        this.clear();
                        $(this._ul).remove();
                        $(this.htmlNode()).remove();
                        this.htmlNode(null);
                        this._ul = null;
                        this.subscribeGlobalEvents(false);
                        _super.prototype.destroy.call(this);
                    };
                    Menu.prototype.render = function (target) {
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
                    };
                    Menu.prototype.renderOneItem = function (item, ul) {
                        var li = $("<li/>");
                        li.appendTo(ul);
                        item.render(li);
                        var that = this;
                        item
                            .on(Controls.Events.CLICK, function (e) {
                            that.invokeAsync(Menu.Events.ITEM_CLICK, new Controls.EventParam(item, that, e));
                            that.visible(false);
                        })
                            .on(Controls.Events.MOUSE_ENTER, function () {
                        })
                            .on(Controls.Events.MOUSE_LEAVE, function () {
                        });
                        return li;
                    };
                    Menu.prototype.visible = function (value) {
                        if (arguments.length == 0) {
                            return this._visible;
                        }
                        if (!this.htmlNode()) {
                            return false;
                        }
                        if (typeof value !== "boolean")
                            return;
                        if (value === this._visible)
                            return;
                        if (!value) {
                            $(this.htmlNode()).fadeOut(250);
                            $("body").removeAttr("active-view");
                            this.subscribeGlobalEvents(false);
                        }
                        else {
                            var key = $("body").attr("active-view");
                            if (key && key.length > 0) {
                                $("body").trigger(Controls.Events.FORCE_CLOSE);
                            }
                            //this.readjustHeight();
                            $(this.htmlNode()).fadeIn(50);
                            $("body").attr("active-view", this.uid());
                            this.subscribeGlobalEvents(true);
                        }
                        this._visible = value;
                    };
                    Menu.prototype.subscribeGlobalEvents = function (shouldSubscribe) {
                        if (!shouldSubscribe) {
                            $(document)
                                .off(this.makeEventKey(Controls.Events.KEY_DOWN))
                                .off(this.makeEventKey(Controls.Events.BLUR))
                                .off(this.makeEventKey(Controls.Events.CLICK));
                            $(window).off(this.makeEventKey(Controls.Events.RESIZE));
                            return;
                        }
                        var that = this;
                        $(document)
                            .on(this.makeEventKey(Controls.Events.KEY_DOWN), function (e) {
                            if (that.items().length == 0)
                                return;
                            switch (e.keyCode) {
                                case 40 /* DOWN_ARROW */:
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleNavDown();
                                    break;
                                case 38 /* UP_ARROW */:
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleNavUp();
                                    break;
                                case 9 /* TAB */:
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (e.shiftKey) {
                                        that.handleNavUp();
                                    }
                                    else {
                                        that.handleNavDown();
                                    }
                                    break;
                                case 27 /* ESCAPE */:
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleClose();
                                    break;
                                case 13 /* ENTER */:
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleEnter();
                                    break;
                            }
                        })
                            .on(this.makeEventKey(Controls.Events.BLUR), function (e) {
                            that.handleClose();
                        })
                            .on(this.makeEventKey(Controls.Events.CLICK), function (e) {
                            var param = new Controls.EventParam(null, that, e);
                            that.invoke(Menu.Events.BEFORE_CLOSE, param);
                            if (!param.isCanceled()) {
                                e.preventDefault();
                                e.stopPropagation();
                                that.handleClose();
                            }
                        })
                            .on(Controls.Events.FORCE_CLOSE, function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            that.handleClose();
                        });
                        $(window).on(this.makeEventKey(Controls.Events.RESIZE), function (e) {
                            that.handleClose();
                        });
                    };
                    Menu.prototype.handleNavUp = function () {
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
                    };
                    Menu.prototype.handleNavDown = function () {
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
                    };
                    Menu.prototype.changeSelectedItem = function (index) {
                        if (this._index === index)
                            return;
                        if (this._index != null) {
                            this._items[this._index].selected(false);
                        }
                        this._index = index;
                        var item = this._items[index];
                        item.selected(true);
                        UI.Util.scrollIntoView(item.htmlNode(), this.htmlNode());
                        this.invokeAsync(Menu.Events.SELECTED_ITEM_CHANGED, new Controls.EventParam(item, this));
                    };
                    Menu.prototype.handleEnter = function () {
                        console.log("menu.handleEnter()");
                        if (this._index == null)
                            this._index = 0;
                        var item = this._items[this._index];
                        this.visible(false);
                        this.invokeAsync(Menu.Events.ITEM_CLICK, new Controls.EventParam(item, this));
                    };
                    Menu.prototype.handleClose = function () {
                        console.log("menu.handleClose()");
                        this._index = null;
                        this.visible(false);
                        this.invokeAsync(Menu.Events.CLOSED, null);
                    };
                    Menu.prototype.adjustWidth = function () {
                        if (!this.htmlNode())
                            return;
                        var maxWidth = 0;
                        //find the widest li item
                        for (var i = 0; i < this._items.length; i++) {
                            var elm = this._items[i].htmlNode();
                            var w = Math.max(elm.scrollWidth, $(elm).outerWidth());
                            if (w > maxWidth)
                                maxWidth = w;
                        }
                        //check to see if the scroll bar is visible, if it's visible
                        //we need to account for the scroll bar width
                        if ($(this._ul).outerHeight() > $(this.htmlNode()).outerHeight()) {
                            maxWidth = maxWidth + UI.Util.getScrollBarWidth();
                        }
                        if (maxWidth > 0) {
                            $(this.htmlNode()).width(maxWidth);
                        }
                    };
                    Menu.prototype.adjustHeight = function () {
                        if (!this.htmlNode())
                            return;
                        var height = $(this._ul).outerHeight();
                        var bb = parseInt($(this.htmlNode()).css("border-bottom-width"));
                        var bt = parseInt($(this.htmlNode()).css("border-top-width"));
                        if (height > $(this.htmlNode()).outerHeight()) {
                            $(this.htmlNode()).css("max-height", height + bb + bt);
                        }
                    };
                    Menu.prototype.disabled = function (value) {
                        if (arguments.length == 0)
                            return this._disabled;
                        if (typeof value !== "boolean")
                            return;
                        this._disabled = value;
                        if (this._disabled) {
                            $(this.htmlNode()).addClass(Controls.ClassName.DISABLED);
                        }
                        else {
                            $(this.htmlNode()).removeClass(Controls.ClassName.DISABLED);
                        }
                    };
                    Menu.prototype.selectedItem = function (item) {
                        if (arguments.length == 0) {
                            if (this._index != null) {
                                return this._items[this._index];
                            }
                            else {
                                return null;
                            }
                        }
                        if (item instanceof Controls.MenuItem) {
                            for (var i = 0; i < this._items.length; i++) {
                                if (item.key() === this._items[i].key()) {
                                    this.changeSelectedItem(i);
                                    break;
                                }
                            }
                        }
                        else if (typeof item == "string") {
                            for (var i = 0; i < this._items.length; i++) {
                                if (item === this._items[i].text()) {
                                    this.changeSelectedItem(i);
                                    break;
                                }
                            }
                        }
                        else if (typeof item == "number") {
                            if (this._items.length > 0) {
                                if (item >= 0 && (item < this._items.length)) {
                                    this.changeSelectedItem(item);
                                }
                            }
                        }
                    };
                    Menu.prototype.onItemClicked = function (func) {
                        this.on(Menu.Events.ITEM_CLICK, func);
                    };
                    Menu.prototype.scrollTop = function (top) {
                        if (!this.htmlNode())
                            return;
                        if (arguments.length == 0)
                            return $(this.htmlNode()).scrollTop();
                        else
                            $(this.htmlNode()).scrollTop(top);
                    };
                    Menu.ClassName = {
                        MENU: "ux-menu",
                        INPUT_DROPDOWN: "ux-input-menu",
                    };
                    Menu.Events = {
                        OPEN: "MenuOpen",
                        BEFORE_CLOSE: "MenuBeforeClose",
                        CLOSED: "MenuClosed",
                        SELECTED_ITEM_CHANGED: "MenuSelectedItemChanged",
                        ITEM_CLICK: "MenuItemClick"
                    };
                    Menu.MenuType = {
                        DEFAULT: "default",
                        INPUT_DROPDOWN: "input-dropdown"
                    };
                    return Menu;
                }(Controls.View));
                Controls.Menu = Menu;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=menu.js.map