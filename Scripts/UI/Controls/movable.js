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
                var Movable = (function (_super) {
                    __extends(Movable, _super);
                    function Movable() {
                        _super.call(this);
                    }
                    Movable.prototype.attach = function (elm) {
                        var owner = $(elm);
                        this._htmlNode = owner[0];
                        var that = this;
                        owner
                            .on(Controls.Events.MOUSE_DOWN, function (e) {
                            if (e.which != 1 /* LEFT */)
                                return;
                            var startX = e.clientX;
                            var startY = e.clientY;
                            var left = owner.position().left;
                            var top = owner.position().top;
                            var firstMove = true;
                            $(window).on(that.makeEventKey(Controls.Events.MOUSE_MOVE), function (e) {
                                var newPos = {
                                    top: top + (e.clientY - startY),
                                    left: left + (e.clientX - startX)
                                };
                                if (firstMove) {
                                    owner.addClass("ux-dragging");
                                    firstMove = false;
                                }
                                owner.css(newPos);
                            });
                            $(window).on(that.makeEventKey(Controls.Events.MOUSE_UP), function (e) {
                                if (e.which !== 1 /* LEFT */)
                                    return;
                                $(window).off(that.makeEventKey(Controls.Events.MOUSE_MOVE));
                                $(window).off(that.makeEventKey(Controls.Events.MOUSE_UP));
                                owner.removeClass("ux-dragging");
                                firstMove = true;
                            });
                        })
                            .on(Controls.Events.MOUSE_MOVE, function (e) {
                        })
                            .on(Controls.Events.MOUSE_UP, function (e) {
                        });
                    };
                    return Movable;
                }(Controls.View));
                Controls.Movable = Movable;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=movable.js.map