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
                var error = (function () {
                    function error(msg) {
                        this.message = msg;
                    }
                    return error;
                }());
                Controls.error = error;
                var widget = (function () {
                    function widget() {
                    }
                    widget.prototype.attach = function (elm) {
                    };
                    widget.prototype.render = function () {
                    };
                    widget.prototype.parent = function (p) {
                        if (arguments.length == 0) {
                            return this._parent;
                        }
                        this._parent = p;
                    };
                    widget.prototype.width = function (x) {
                        return 0;
                    };
                    widget.prototype.height = function (x) {
                        return 0;
                    };
                    widget.prototype.top = function (x) {
                        return 0;
                    };
                    widget.prototype.left = function (x) {
                        return 0;
                    };
                    widget.prototype.on = function (action, callback) {
                    };
                    widget.prototype.off = function (action, callback) {
                    };
                    return widget;
                }());
                Controls.widget = widget;
                var menu = (function (_super) {
                    __extends(menu, _super);
                    function menu() {
                        _super.call(this);
                        this._items = [];
                    }
                    menu.prototype.add = function (item) {
                        if (this._keys[item.key()])
                            throw new error("Duplicated items!");
                        this._items.push(item);
                    };
                    return menu;
                }(widget));
                Controls.menu = menu;
                var menuItem = (function (_super) {
                    __extends(menuItem, _super);
                    function menuItem(text, key, helpText) {
                        _super.call(this);
                        this._key = key;
                        this._text = text;
                        this._helpText = helpText;
                    }
                    menuItem.prototype.key = function () {
                        return this._key;
                    };
                    menuItem.prototype.text = function (newTxt) {
                        if (arguments.length == 0) {
                            return this._text = newTxt;
                        }
                        this._text = newTxt;
                        if (this._elm != null) {
                            $(this._elm).text(newTxt);
                        }
                    };
                    return menuItem;
                }(widget));
                Controls.menuItem = menuItem;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=control.js.map