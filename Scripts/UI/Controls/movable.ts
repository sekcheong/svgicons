namespace Epic.SystemPulse.UI.Controls {
	export class Movable extends View {
		private _htmlNode;

		constructor() {
			super();
		}

		public attach(elm) {
			var owner = $(elm);
			this._htmlNode = owner[0];
			var that = this;
			owner
				.on(Events.MOUSE_DOWN, function (e) {
					if (e.which != MouseButton.LEFT) return;

					var startX = e.clientX;
					var startY = e.clientY;
					var left = owner.position().left;
					var top = owner.position().top;
					var firstMove = true;

					$(window).on(that.makeEventKey(Events.MOUSE_MOVE), function (e) {
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

					$(window).on(that.makeEventKey(Events.MOUSE_UP), function (e) {
						if (e.which !== MouseButton.LEFT) return;
						$(window).off(that.makeEventKey(Events.MOUSE_MOVE));
						$(window).off(that.makeEventKey(Events.MOUSE_UP));
						owner.removeClass("ux-dragging");
						firstMove = true;
					});

				})
				.on(Events.MOUSE_MOVE, function (e) {

				})
				.on(Events.MOUSE_UP, function (e) {

				});
		}

	}
}
