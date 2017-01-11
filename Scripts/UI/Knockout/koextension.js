var Epic;
(function (Epic) {
    var SystemPulse;
    (function (SystemPulse) {
        var UI;
        (function (UI) {
            var Knockout;
            (function (Knockout) {
                var ns = Epic.SystemPulse.UI.Knockout.Components;
                var KnockoutExtension = (function () {
                    function KnockoutExtension() {
                    }
                    KnockoutExtension.registerComponents = function () {
                        //put all the Knockout component registrations here
                        ns.KOInputBox.register();
                    };
                    return KnockoutExtension;
                }());
                Knockout.KnockoutExtension = KnockoutExtension;
            })(Knockout = UI.Knockout || (UI.Knockout = {}));
        })(UI = SystemPulse.UI || (SystemPulse.UI = {}));
    })(SystemPulse = Epic.SystemPulse || (Epic.SystemPulse = {}));
})(Epic || (Epic = {}));
//# sourceMappingURL=koextension.js.map