namespace Epic.SystemPulse.UI {
	export class Util {
		static MAX_UID = 10000000;

		static getUID(prefix: string): string {
			do {
				prefix += ~~(Math.random() * Util.MAX_UID)
			}
			while (document.getElementById(prefix))
			return prefix
		}

		static scrollIntoView(elm, view) {
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
			if (x.bottom > v.bottom) p.scrollTop(p.scrollTop() + (x.bottom - v.bottom));
			if (x.top < v.top) p.scrollTop(p.scrollTop() - (v.top - x.top));
		}

		static escapeRegex(s: string): string {
			return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
		}

		static callAsync(func, context, ...any) {
			var args = [];
			if (!func) return;
			if (arguments.length > 2) {
				for (var i = 2; i < arguments.length; i++) {
					args.push(arguments[i]);
				}
			}
			setTimeout(function () {
				func.apply(context, args);
			});
		}

		static getScrollBarWidth() {
			var self;
			self = Util.getScrollBarWidth;
			if (self.width != null) return self.width;
			var div;
			div = document.createElement("div");
			div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-100px;top:-100px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
			div = div.firstChild;
			document.body.appendChild(div);
			//memorize the width in the function itself
			self.width = div.offsetWidth - div.clientWidth;
			document.body.removeChild(div);
			return self.width;
		}

	}
}