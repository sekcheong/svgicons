var Epic;
(function (Epic) {
    var SystemPulse;
    (function (SystemPulse) {
        var UI;
        (function (UI) {
            var Util = (function () {
                function Util() {
                }
                Util.getUID = function (prefix) {
                    do {
                        prefix += ~~(Math.random() * Util.MAX_UID);
                    } while (document.getElementById(prefix));
                    return prefix;
                };
                Util.scrollIntoView = function (elm, view) {
                    var e = $(elm);
                    var p = $(view);
                    var x = {
                        top: e.offset().top,
                        bottom: e.offset().top + e.outerHeight()
                    };
                    var v = {
                        top: p.offset().top,
                        bottom: p.offset().top + p.innerHeight()
                    };
                    if (x.bottom > v.bottom)
                        p.scrollTop(p.scrollTop() + (x.bottom - v.bottom));
                    if (x.top < v.top)
                        p.scrollTop(p.scrollTop() - (v.top - x.top));
                };
                Util.escapeRegex = function (s) {
                    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                };
                Util.callAsync = function (func, context) {
                    var any = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        any[_i - 2] = arguments[_i];
                    }
                    var args = [];
                    if (!func)
                        return;
                    if (arguments.length > 2) {
                        for (var i = 2; i < arguments.length; i++) {
                            args.push(arguments[i]);
                        }
                    }
                    setTimeout(function () {
                        func.apply(context, args);
                    });
                };
                Util.getScrollBarWidth = function () {
                    var self;
                    self = Util.getScrollBarWidth;
                    if (self.width != null)
                        return self.width;
                    var div;
                    div = document.createElement("div");
                    div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-100px;top:-100px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
                    div = div.firstChild;
                    document.body.appendChild(div);
                    //memorize the width in the function itself
                    self.width = div.offsetWidth - div.clientWidth;
                    document.body.removeChild(div);
                    return self.width;
                };
                Util.MAX_UID = 10000000;
                return Util;
            }());
            UI.Util = Util;
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=util.js.map