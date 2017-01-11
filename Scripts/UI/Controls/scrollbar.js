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
                var Scrollbar = (function (_super) {
                    __extends(Scrollbar, _super);
                    function Scrollbar() {
                        _super.call(this);
                    }
                    Scrollbar.prototype.attachTo = function (element) {
                        var p = $(element);
                        this._parentView = p[0];
                        var w = p.innerWidth();
                        var rail = $("<div>");
                        var thumb = $("<div>");
                        rail
                            .addClass(Scrollbar.ClassName.SCROLLBAR)
                            .css("position", "absolute");
                        thumb
                            .addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
                            .css("position", "absolute");
                        rail.appendTo(p);
                        rail.height("100%");
                        rail.css("top", 0);
                        console.log("p.width", p.width(), p.innerWidth());
                        var left = w - rail.outerWidth();
                        console.log("left", left);
                        rail.css("left", left);
                        thumb.height(25);
                        thumb.css("top", 35);
                        thumb.css("left", 0);
                        thumb.appendTo(rail);
                    };
                    Scrollbar.ClassName = {
                        SCROLLBAR: "ux-scrollbar",
                        SCROLLBAR_THUMB: "ux-scrollbar-thumb",
                    };
                    return Scrollbar;
                }(Controls.View));
                Controls.Scrollbar = Scrollbar;
                var ScrollBarRail = (function (_super) {
                    __extends(ScrollBarRail, _super);
                    function ScrollBarRail(options) {
                        _super.call(this);
                    }
                    ScrollBarRail.prototype.render = function (target) {
                        var p = $(target);
                        this._parentView = p[0];
                        var w = p.innerWidth();
                        var rail = $("<div>");
                        this.htmlNode(rail[0]);
                        rail
                            .addClass(Scrollbar.ClassName.SCROLLBAR)
                            .css("position", "absolute");
                        rail.appendTo(p);
                        rail.height("100%");
                        rail.css("top", 0);
                        console.log("ScrollBarRail: p.width", p.width(), p.innerWidth());
                        var left = w - rail.outerWidth();
                        rail.css("left", left);
                        console.log("ScrollBarRail:left", left);
                        return rail[0];
                    };
                    ScrollBarRail.prototype.visible = function (value) {
                        if (arguments.length == 0) {
                            if (this.parent())
                                return this.parent().visible();
                            return this._visible;
                        }
                        if (typeof value === "boolean") {
                            this._visible = value;
                            if (this._visible) {
                                $(this.htmlNode()).show();
                            }
                            else {
                                $(this.htmlNode()).hide();
                            }
                        }
                    };
                    ScrollBarRail.prototype.disabled = function (value) {
                        if (arguments.length == 0) {
                            return this._disabled;
                        }
                        if (typeof value === "boolean") {
                            this._disabled = value;
                        }
                    };
                    return ScrollBarRail;
                }(Controls.View));
                var ScrollBarThumb = (function (_super) {
                    __extends(ScrollBarThumb, _super);
                    function ScrollBarThumb() {
                        _super.call(this);
                    }
                    ScrollBarThumb.prototype.render = function (target) {
                        var p = $(target);
                        this._parentHTML = p[0];
                        var w = p.innerWidth();
                        var thumb = $("<div>");
                        thumb.appendTo(p);
                        this.htmlNode(thumb[0]);
                        thumb
                            .addClass(Scrollbar.ClassName.SCROLLBAR_THUMB)
                            .css("position", "absolute");
                        thumb.height(25);
                        thumb.css("top", 35);
                        thumb.css("left", 0);
                        return this.htmlNode();
                    };
                    ScrollBarThumb.prototype.visible = function (value) {
                        return false;
                    };
                    ScrollBarThumb.prototype.disabled = function (value) {
                        if (arguments.length == 0)
                            return this._disabled;
                        else
                            this._disabled = value;
                    };
                    return ScrollBarThumb;
                }(Controls.View));
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=scrollbar.js.map