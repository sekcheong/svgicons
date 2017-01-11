var Epic;
(function (Epic) {
    var SystemPulse;
    (function (SystemPulse) {
        var UI;
        (function (UI) {
            var Controls;
            (function (Controls) {
                var EventParam = (function () {
                    function EventParam(data, context, event) {
                        var that = this;
                        this._event = event;
                        this._data = data;
                        this._context = context;
                        this._canceled = false;
                    }
                    EventParam.prototype.context = function (value) {
                        if (arguments.length == 0)
                            return this._context;
                        this._context = value;
                    };
                    EventParam.prototype.data = function (value) {
                        if (arguments.length == 0) {
                            return this._data;
                        }
                        this._data = value;
                    };
                    EventParam.prototype.event = function () {
                        return this._event;
                    };
                    EventParam.prototype.done = function () {
                        UI.Util.callAsync(this._doneFunc, this);
                    };
                    EventParam.prototype.cancel = function () {
                        if (this._cancelFunc) {
                            this._cancelFunc.call(this);
                        }
                        this._canceled = true;
                    };
                    EventParam.prototype.fail = function () {
                        if (!this._failFunc)
                            return;
                        this._failFunc.call(this);
                    };
                    EventParam.prototype.onComplete = function (func) {
                        this._doneFunc = func;
                    };
                    EventParam.prototype.onCancel = function (func) {
                        this._cancelFunc = func;
                    };
                    EventParam.prototype.onFail = function (func) {
                        this._failFunc = func;
                    };
                    EventParam.prototype.isCanceled = function () {
                        return this._canceled;
                    };
                    return EventParam;
                }());
                Controls.EventParam = EventParam;
            })(Controls = UI.Controls || (UI.Controls = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=eventparam.js.map