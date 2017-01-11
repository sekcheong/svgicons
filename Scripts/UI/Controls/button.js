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
                var Button = (function (_super) {
                    __extends(Button, _super);
                    function Button(text, key, helpText, icon) {
                        _super.call(this);
                        this._text = text;
                        this._helpText = helpText;
                    }
                    Button.prototype.render = function (target) {
                        var button = $("<button/>");
                        button.appendTo($(target));
                        this.htmlNode(button[0]);
                        var that = this;
                        button.addClass(Button.ClassName.BUTTON)
                            .on(this.makeEventKey(Controls.Events.CLICK), function () {
                            that.invokeAsync(Controls.Events.CLICK, null);
                        });
                        button.text(this._text);
                        if (!this.width()) {
                            var fontSize = parseFloat(button.css("font-size"));
                            fontSize = fontSize * 0.6180;
                            var width = button.outerWidth() + 2 * fontSize;
                            button.css("width", width);
                        }
                        else {
                            button.css("width", this.width());
                        }
                    };
                    Button.prototype.onClick = function (callback) {
                        this.on(Controls.Events.CLICK, callback);
                    };
                    Button.ClassName = {
                        BUTTON: "ux-btn",
                        INPUT_BUTTON: "ux-input-btn",
                    };
                    return Button;
                }(Controls.View));
                Controls.Button = Button;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=button.js.map