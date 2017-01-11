var Epic;
(function (Epic) {
    var SystemPulse;
    (function (SystemPulse) {
        var UI;
        (function (UI) {
            var Controls;
            (function (Controls) {
                var View = (function () {
                    function View(parent) {
                        this._parent = parent;
                        this._extent = {};
                        this._callbacks = {};
                        this._children = [];
                    }
                    View.prototype.render = function (target) {
                    };
                    View.prototype.unrender = function () {
                    };
                    View.prototype.rendered = function () {
                        return this.htmlNode() != null;
                    };
                    View.prototype.destroy = function () {
                    };
                    View.prototype.htmlNode = function (elm) {
                        if (arguments.length == 0) {
                            return this._htmlElm;
                        }
                        if (elm && !(elm instanceof HTMLElement)) {
                            throw new Controls.Exception("Item is not an instance of HTMLElement!", elm);
                        }
                        this._htmlElm = elm;
                    };
                    View.prototype.parent = function (p) {
                        if (arguments.length == 0) {
                            return this._parent;
                        }
                        else {
                            this._parent = p;
                        }
                    };
                    View.prototype.width = function (w) {
                        if (arguments.length == 0) {
                            return this._extent.width;
                        }
                        this._extent.width = w;
                        if (this.htmlNode()) {
                            $(this.htmlNode()).width(w);
                        }
                        return this;
                    };
                    View.prototype.height = function (h) {
                        if (arguments.length == 0) {
                            return this._extent.height;
                        }
                        this._extent.height = h;
                        if (this.htmlNode()) {
                            $(this.htmlNode()).height(h);
                        }
                        return this;
                    };
                    View.prototype.top = function (y) {
                        if (arguments.length == 0) {
                            return this._extent.top;
                        }
                        this._extent.top = y;
                        if (this.htmlNode()) {
                            $(this.htmlNode()).css("top", y);
                        }
                        return this;
                    };
                    View.prototype.left = function (x) {
                        if (arguments.length == 0) {
                            return this._extent.left;
                        }
                        this._extent.left = x;
                        if (this.htmlNode()) {
                            $(this.htmlNode()).css("left", x);
                        }
                        return this;
                    };
                    View.prototype.visible = function (value) {
                        return false;
                    };
                    View.prototype.disabled = function (value) {
                        if (arguments.length == 0) {
                            return this._disabled;
                        }
                        else {
                            this._disabled = value;
                        }
                    };
                    View.prototype.focus = function () {
                        if (this.htmlNode()) {
                            $(this.htmlNode()).focus();
                        }
                    };
                    View.prototype.uid = function () {
                        if (!this._uid) {
                            this._uid = UI.Util.getUID("K");
                        }
                        return this._uid;
                    };
                    View.prototype.on = function (event, callback) {
                        this._callbacks[event] = callback;
                        return this;
                    };
                    View.prototype.off = function (event) {
                        if (!this._callbacks)
                            return;
                        this._callbacks[event] = null;
                        return this;
                    };
                    View.prototype.invoke = function (event, param) {
                        var func = this._callbacks[event];
                        if (!func)
                            return;
                        //default is to use caller's this
                        var context = this;
                        if (param && param.context()) {
                            context = param.context();
                        }
                        func.call(context, param);
                        return this;
                    };
                    View.prototype.invokeAsync = function (event, param) {
                        if (!this._callbacks[event])
                            return;
                        var that = this;
                        setTimeout(function () {
                            that.invoke(event, param);
                        });
                        return this;
                    };
                    View.prototype.prop = function (name, value) {
                        if (!this._props)
                            this._props = {};
                        if (arguments.length == 1) {
                            return this._props[name];
                        }
                        else if (arguments.length == 2) {
                            if (value === undefined)
                                delete this._props[name];
                            this._props[name] = value;
                            return this;
                        }
                    };
                    View.prototype.refresh = function () {
                        this._children.forEach(function (child) {
                            child.refresh();
                        });
                    };
                    View.prototype.makeEventKey = function (event) {
                        var name = this.constructor.name;
                        return event + ".ux." + name + "." + this.uid();
                    };
                    View.prototype.insertChild = function (child, index) {
                        this._children.push(child);
                    };
                    View.prototype.removeChild = function (child) {
                        this._children = this._children.filter(function (value) {
                            if (child === value) {
                                value._parent = null;
                                return true;
                            }
                        });
                        return this;
                    };
                    return View;
                }());
                Controls.View = View;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=view.js.map