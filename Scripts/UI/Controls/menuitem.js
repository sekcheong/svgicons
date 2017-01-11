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
                var MenuItem = (function (_super) {
                    __extends(MenuItem, _super);
                    function MenuItem(text, helpText, data, key) {
                        _super.call(this);
                        this._text = text;
                        this._helpText = helpText;
                        this._data = data;
                        if (key != undefined) {
                            this.key(key);
                        }
                    }
                    MenuItem.prototype.text = function (newTxt) {
                        if (arguments.length == 0) {
                            return this._text;
                        }
                        else {
                            this._text = newTxt;
                            var node = (this.htmlNode() ? $(this.htmlNode()) : null);
                            if (node)
                                node.text(this._text);
                        }
                    };
                    MenuItem.prototype.helpText = function (newTxt) {
                        if (arguments.length == 0)
                            return this._helpText;
                        this._helpText = newTxt;
                    };
                    MenuItem.prototype.html = function (newHtml) {
                        if (arguments.length == 0) {
                            return this._html;
                        }
                        else {
                            this._html = newHtml;
                            var node = (this.htmlNode() ? $(this.htmlNode()) : null);
                            if (node)
                                node.html(this._html);
                        }
                    };
                    MenuItem.prototype.unrender = function () {
                        this.parent(null);
                        if (!this.htmlNode())
                            return;
                        $(this.htmlNode()).remove();
                        this.htmlNode(null);
                    };
                    MenuItem.prototype.destroy = function () {
                        this.unrender();
                    };
                    MenuItem.prototype.render = function (target) {
                        var a = $("<a/>");
                        if (parent)
                            a.appendTo($(target));
                        this.htmlNode(a[0]);
                        if (this._html) {
                            a.html(this._html);
                        }
                        else {
                            a.text(this._text);
                        }
                        var that = this;
                        a.attr("title", this._helpText)
                            .on(Controls.Events.CLICK, function (e) {
                            if (that.disabled())
                                return;
                            e.preventDefault();
                            e.stopPropagation();
                            that.invokeAsync(Controls.Events.CLICK, new Controls.EventParam(that, that, e));
                        });
                        return this.htmlNode();
                    };
                    MenuItem.prototype.selected = function (value) {
                        if (!this.htmlNode())
                            return false;
                        var a = $(this.htmlNode());
                        if (arguments.length == 0) {
                            return a.hasClass(Controls.ClassName.SELECTED);
                        }
                        if (value) {
                            if (!a.hasClass(Controls.ClassName.SELECTED)) {
                                a.addClass(Controls.ClassName.SELECTED);
                            }
                        }
                        else {
                            a.removeClass(Controls.ClassName.SELECTED);
                        }
                    };
                    MenuItem.prototype.key = function (value) {
                        if (arguments.length == 0) {
                            if (this._key == null)
                                return this.uid();
                            return this._key;
                        }
                        if (value == null) {
                            throw new Controls.Exception("MenuItem.key(): key value cannot be null or undefined.");
                        }
                        this._key = value;
                    };
                    MenuItem.prototype.data = function (value) {
                        if (arguments.length == 0)
                            return this._data;
                        this._data = value;
                    };
                    MenuItem.prototype.height = function (h) {
                        _super.prototype.height.call(this, h);
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
                    };
                    MenuItem.prototype.disabled = function (value) {
                        if (arguments.length == 0) {
                            return this._disabled;
                        }
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
                    return MenuItem;
                }(Controls.View));
                Controls.MenuItem = MenuItem;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=menuitem.js.map