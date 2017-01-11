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
                var InputBox = (function (_super) {
                    __extends(InputBox, _super);
                    function InputBox() {
                        _super.call(this);
                        this._items = [];
                        this._visible = true;
                    }
                    InputBox.prototype.render = function (target) {
                        var div = $("<div/>")
                            .addClass(InputBox.ClassName.INPUT);
                        if (parent) {
                            div.appendTo(target);
                        }
                        this.htmlNode(div[0]);
                        var that = this;
                        var inputBox = $("<input/>")
                            .addClass(InputBox.ClassName.INPUT)
                            .addClass(InputBox.ClassName.INPUT_BUTTON)
                            .attr("type", "text")
                            .attr("placeholder", this.placeHolder())
                            .attr("spellcheck", "false")
                            .attr("autocomplete", "off")
                            .on(Controls.Events.PASTE, function (e) {
                            that.handleInputPasteOrCut(e);
                        })
                            .on(Controls.Events.CUT, function (e) {
                            that.handleInputPasteOrCut(e);
                        })
                            .on(Controls.Events.KEY_DOWN, function (e) {
                            that.handleInputKeyDown(e);
                        })
                            .on(Controls.Events.CLICK, function (e) {
                            if (that._isComboBox) {
                                that.handleInputClick(e);
                            }
                        })
                            .on(Controls.Events.FOCUS, function (e) {
                            that._hasFocus = true;
                        })
                            .on(Controls.Events.BLUR, function (e) {
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
                            .attr("tabindex", "-1")
                            .on(Controls.Events.CLICK, function (e) {
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
                    };
                    InputBox.prototype.refresh = function () {
                        this.setButtonSize();
                    };
                    InputBox.prototype.setButtonSize = function () {
                        //the JQuery outerHeight() function will return a rounded off value 
                        //of the width, for example, when the element's actual height is 31.6
                        //outerHeight() returns 32 instead. However, the set width function 
                        //does take fractional pixel values. This might be a bug in the
                        //current version (1.10.2) of the JQuery. 
                        var inputBox = $(this._input);
                        var button = $(this._button);
                        var div = $(this.htmlNode());
                        var inputH = inputBox[0].getBoundingClientRect().height;
                        button.height(inputH);
                        button.width(inputH);
                        div.width(inputBox.outerWidth() + button.outerWidth());
                        div.height(inputH);
                    };
                    InputBox.prototype.destroy = function () {
                        this._menu.destroy();
                        $(this._button).remove();
                        $(this._input).remove();
                    };
                    InputBox.prototype.handleInputPasteOrCut = function (e) {
                        var that = this;
                        //use setTimeout() to wait a few millisecond to 
                        //let browser to have a chance to update the 
                        //text after paste or cut operation
                        setTimeout(function () {
                            var text = $(that._input).val();
                            that.startAutoComplete(text);
                        }, 100);
                    };
                    InputBox.prototype.handleInputClick = function (e) {
                        this.startAutoComplete(null);
                    };
                    InputBox.prototype.handleInputKeyDown = function (e) {
                        clearTimeout(this._timeout);
                        var that = this;
                        switch (e.keyCode) {
                            case 40 /* DOWN_ARROW */:
                                //the down arrow key opens the drop down menu 
                                if (!this.dropDownMenuVisible()) {
                                    this.startAutoComplete(null);
                                }
                                return;
                            case 38 /* UP_ARROW */:
                            case 37 /* LEFT_ARROW */:
                            case 39 /* RIGHT_ARROW */:
                            case 9 /* TAB */:
                            case 27 /* ESCAPE */:
                            case 13 /* ENTER */:
                                return;
                            default:
                                //let the control key bubble up and only care about the character keys
                                this._timeout = setTimeout(function () {
                                    var newText = $(that._input).val();
                                    if (newText !== that._text) {
                                        that.startAutoComplete(newText);
                                    }
                                }, InputBox.AUTOCOMPLETE_DELAY);
                        }
                    };
                    InputBox.prototype.handleWindowResize = function (e) {
                        if (this.dropDownMenuVisible()) {
                            this.dropDownMenuSetPosition();
                        }
                    };
                    InputBox.prototype.handleDropDownButtonClick = function (e) {
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
                    };
                    InputBox.prototype.handleDropDownMenuBeforeClose = function (e) {
                        if (this._hasFocus) {
                            e.cancel();
                        }
                    };
                    InputBox.prototype.handleDropDownMenuClose = function (e) {
                        console.log("InputBox.handleDropDownMenuClose()");
                        if (this._selectedItem != null) {
                            this.text(this._selectedItem.text());
                        }
                        else {
                            $(this._input).val(this._text);
                        }
                        $(this._input).removeAttr("ux-state");
                        $(this._input).focus();
                    };
                    InputBox.prototype.handleDropDownMenuItemClick = function (e) {
                        var item = e.data();
                        this.selectedItem(item);
                        $(this._input).removeAttr("ux-state");
                        $(this._button).removeAttr("ux-state");
                        $(this._input).focus();
                        e.context(this);
                        this.invokeAsync(InputBox.Events.ITEM_CLICK, e);
                    };
                    InputBox.prototype.handleDropDownSelItemChange = function (e) {
                        var item = e.data();
                        $(this._input).val(item.text());
                    };
                    InputBox.prototype.startAutoComplete = function (searchTerm) {
                        console.log("InputBox.startAutoComplete()");
                        var that = this;
                        if (this._beforeFilterFunc) {
                            searchTerm = this._beforeFilterFunc.call(this, searchTerm);
                        }
                        var itemFilter = this._filterFunc || InputBox.makeDefaultFilter(searchTerm);
                        var itemProvider = this._requestFunc || InputBox.defaultItemProvider;
                        var param = new Controls.EventParam(this._items, this);
                        param.data(this._items);
                        param.onComplete(function () {
                            var srcItems = param.data();
                            var items = [];
                            //apply filter to each items
                            if (srcItems) {
                                for (var i = 0; i < srcItems.length; i++) {
                                    var item = itemFilter.call(that, srcItems[i]);
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
                            for (var i = 0; i < items.length; i++) {
                                that._menu.add(items[i]);
                            }
                            that.dropDownMenuShow();
                            if (that._itemPopulatedFunc) {
                                var p = new Controls.EventParam(items, that);
                                UI.Util.callAsync(that._itemPopulatedFunc, that, p);
                            }
                        });
                        UI.Util.callAsync(itemProvider, this, param);
                    };
                    InputBox.prototype.dropDownMenuCreate = function () {
                        console.log("inputbox.dropDownMenuCreate()");
                        var menu = new Controls.Menu(null, Controls.Menu.MenuType.INPUT_DROPDOWN);
                        menu.visible(false);
                        menu.parent(this);
                        var that = this;
                        menu
                            .on(Controls.Menu.Events.CLOSED, function (e) {
                            that.handleDropDownMenuBeforeClose(e);
                        })
                            .on(Controls.Menu.Events.CLOSED, function (e) {
                            that.handleDropDownMenuClose(e);
                        })
                            .on(Controls.Menu.Events.ITEM_CLICK, function (e) {
                            that.handleDropDownMenuItemClick(e);
                        })
                            .on(Controls.Menu.Events.SELECTED_ITEM_CHANGED, function (e) {
                            that.handleDropDownSelItemChange(e);
                        });
                        return menu;
                    };
                    InputBox.prototype.dropDownMenuVisible = function () {
                        if (!this._menu)
                            return false;
                        return this._menu.visible();
                    };
                    InputBox.prototype.dropDownMenuHide = function () {
                        console.log("InputBox.dropDownMenuHide()");
                        if (this.dropDownMenuVisible()) {
                            this._menu.visible(false);
                            $(this._input).focus();
                            $(this._input).removeAttr("ux-state");
                            $(this._button).removeAttr("ux-state");
                        }
                    };
                    InputBox.prototype.dropDownMenuShow = function () {
                        console.log("InputBox.dropDownMenuShow()");
                        if (this._menu.items().length == 0) {
                            return;
                        }
                        if (!this._menu.rendered()) {
                            this._menu.render($("body"));
                        }
                        this.dropDownMenuSetPosition();
                        this._menu.visible(true);
                        this._menu.scrollTop(0);
                        $(this._input).attr("ux-state", "open");
                        $(this._button).attr("ux-state", "open");
                    };
                    InputBox.prototype.dropDownMenuSetPosition = function () {
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
                    };
                    InputBox.prototype.itemsAdd = function (value, helpText, data, key) {
                        var item;
                        if (value instanceof Controls.MenuItem) {
                            item = value;
                        }
                        else if (typeof value == "string") {
                            item = new Controls.MenuItem(value, helpText, data, key);
                        }
                        else {
                            console.error("inputbox.itemsAdd(): Invalid value type ", value);
                            return;
                        }
                        this._items.push(item);
                        return item;
                    };
                    InputBox.prototype.itemsClear = function () {
                        this._selectedItem = null;
                        this._items = [];
                    };
                    InputBox.prototype.items = function () {
                        return this._items;
                    };
                    InputBox.prototype.text = function (value) {
                        if (arguments.length == 0) {
                            return this._text;
                        }
                        this._text = value;
                        if (this._input) {
                            $(this._input).val(value);
                        }
                    };
                    InputBox.prototype.isComboBox = function (value) {
                        if (arguments.length == 0)
                            return this._isComboBox;
                        this._isComboBox = value;
                    };
                    InputBox.prototype.disabled = function (value) {
                        if (arguments.length == 0)
                            return this._disabled;
                        if (typeof value !== "boolean")
                            return;
                        this._disabled = value;
                        if (!this._input || !this._button)
                            return;
                        if (!this._disabled) {
                            $(this._input).removeAttr("disabled");
                            $(this._button).removeAttr("disabled").prop("disabled", false);
                        }
                        else {
                            $(this._input).attr("disabled", "disabled");
                            $(this._button).attr("disabled", "disabled").prop("disabled", true);
                        }
                    };
                    InputBox.prototype.visible = function (value) {
                        if (arguments.length == 0)
                            return this._visible;
                        if (typeof value !== "boolean")
                            return;
                        this._visible = value;
                        if (!this._visible) {
                            $(this.htmlNode()).hide();
                        }
                        else {
                            $(this.htmlNode()).show();
                        }
                    };
                    InputBox.prototype.selectedItem = function (value) {
                        //console.log("inputbox.selectedItem()", "value:", value);
                        if (arguments.length == 0) {
                            return this._selectedItem;
                        }
                        var selItem;
                        if (value instanceof Controls.MenuItem) {
                            selItem = value;
                        }
                        else if (typeof value === "number") {
                            if (value >= 0 && value < this._items.length) {
                                selItem = this._items[value];
                            }
                        }
                        else if (typeof value === "string") {
                            selItem = null;
                            for (var i = 0; i < this._items.length; i++) {
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
                    };
                    InputBox.prototype.setSelectedItem = function (item) {
                        this._selectedItem = item;
                        if (item) {
                            this.text(item.text());
                        }
                        else {
                            this.text(null);
                        }
                    };
                    InputBox.prototype.placeHolder = function (value) {
                        if (arguments.length == 0) {
                            return this._placeHolder;
                        }
                        this._placeHolder = value;
                    };
                    InputBox.prototype.onRequestItems = function (func) {
                        this._requestFunc = func;
                    };
                    InputBox.prototype.onBeforeFilterItems = function (func) {
                        this._beforeFilterFunc = func;
                    };
                    InputBox.prototype.onFilterItem = function (func) {
                        this._filterFunc = func;
                    };
                    InputBox.prototype.onItemsPopulated = function (func) {
                        this._itemPopulatedFunc = func;
                    };
                    InputBox.prototype.onItemClick = function (func) {
                        this.on(InputBox.Events.ITEM_CLICK, func);
                    };
                    InputBox.makeDefaultFilter = function (terms) {
                        //if the search terms are not given, we simply return 
                        //a function that returns every item. 
                        if (terms == null || terms.length == 0) {
                            return function (item) {
                                item.html(null);
                                return item;
                            };
                        }
                        //prepare a partial function that has the search 
                        //regular expression already created
                        var s = new RegExp("\\s\\s+", "g");
                        var searchTerm = terms.replace(s, " ").trim();
                        //matching accented characters
                        var x = UI.Util.escapeRegex(searchTerm).replace("e", "[eé]");
                        //regex for matching selected items
                        var m = new RegExp(x, "i");
                        //for highlighting the matched substrings 
                        var r = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + x + ")(?![^<>]*>)(?![^&;]+;)", "gi");
                        //the closure property of function scope captures the 
                        //calculated regular expression m, r, and s;
                        return function (item) {
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
                        };
                    };
                    InputBox.defaultItemProvider = function (e) {
                        var items = e.data();
                        var copy = [];
                        //the default item provide just make a copy of the items already defined
                        items.forEach(function (item) {
                            copy.push(item);
                        });
                        e.data(copy);
                        e.done();
                    };
                    //display the auto completion box 200ms after the user stop typing
                    InputBox.AUTOCOMPLETE_DELAY = 200;
                    InputBox.ClassName = {
                        INPUT: "ux-input",
                        INPUT_BUTTON: "ux-input-btn",
                        CONTAINER_INLINE: "ux-container-inline",
                    };
                    InputBox.Events = {
                        ITEM_CLICK: "InputItemClick"
                    };
                    return InputBox;
                }(Controls.View));
                Controls.InputBox = InputBox;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=inputbox.js.map