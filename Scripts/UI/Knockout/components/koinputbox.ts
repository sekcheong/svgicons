namespace Epic.SystemPulse.UI.Knockout.Components {

	import ns = Epic.SystemPulse.UI.Controls;

	export class KOInputBox {
		public static register() {
			ko.components.register('ux-inputbox', {
				viewModel: {
					createViewModel: function (params, componentInfo) {
						//console.log("KOInputBox.createViewModel()", "params:", params);

						var input = new ns.InputBox();

						if (params.hasOwnProperty("width")) {
							//need to call ko.unwrap because the property can be 
							//a plain value or an Knockout observable object
							input.width(ko.unwrap(params.width));
							if (ko.isObservable(params.width)) {
								params.width.subscribe(function (newValue) {
									input.width(newValue);
								});
							}
						}

						if (params.hasOwnProperty("height")) {
							input.height(ko.unwrap(params.height));
							if (ko.isObservable(params.height)) {
								params.height.subscribe(function (newValue) {
									input.height(newValue);
								});
							}
						}

						if (params.hasOwnProperty("placeHolder")) {
							input.placeHolder(ko.unwrap(params.placeHolder));
							if (ko.isObservable(params.placeHolder)) {
								params.placeHolder.subscribe(function (newValue) {
									input.placeHolder(newValue);
								});
							}
						}

						if (params.hasOwnProperty("onRequestItems")) {
							input.onRequestItems(ko.unwrap(params.onRequestItems));
							if (ko.isObservable(params.onRequestItems)) {
								params.onRequestItems.subscribe(function (newValue) {
									input.onRequestItems(newValue);
								});
							}
						}

						if (params.hasOwnProperty("onFilterItem")) {
							input.onFilterItem(ko.unwrap(params.onFilterItem));
							if (ko.isObservable(params.onFilterItem)) {
								params.onFilterItem.subscribe(function (newValue) {
									input.onFilterItem(newValue);
								});
							}
						}

						if (params.hasOwnProperty("onItemsPopulated")) {
							input.onItemsPopulated(ko.unwrap(params.onItemsPopulated));
							if (ko.isObservable(params.onItemsPopulated)) {
								params.onItemsPopulated.subscribe(function (newValue) {
									input.onItemsPopulated(newValue);
								});
							}
						}

						if (params.hasOwnProperty("onItemClick")) {
							input.onItemClick(ko.unwrap(params.onItemClick));
							if (ko.isObservable(params.onItemClick)) {
								params.onItemClick.subscribe(function (newValue) {
									input.onItemClick(newValue);
								});
							}
						}

						if (params.hasOwnProperty("isComboBox")) {
							input.isComboBox(ko.unwrap(params.isComboBox));
							if (ko.isObservable(params.isComboBox)) {
								params.isComboBox.subscribe(function (newValue) {
									input.isComboBox(newValue);
								});
							}
						}

						if (params.hasOwnProperty("disabled")) {
							input.disabled(ko.unwrap(params.disabled));
							if (ko.isObservable(params.disabled)) {
								params.disabled.subscribe(function (newValue) {
									input.disabled(newValue);
								});
							}
						}

						if (params.hasOwnProperty("visible")) {
							input.visible(ko.unwrap(params.visible));
							if (ko.isObservable(params.visible)) {
								params.visible.subscribe(function (newValue) {
									input.visible(newValue);
								});
							}
						}

						if (params.hasOwnProperty("items")) {
							var items = ko.unwrap(params.items);
							if (items && items.length > 0) {
								//an item can be a MenuItem object or plain JavaScript object, in the 
								//latter case we assume the caller populates the necessary properties
								items.forEach(function (item) {
									if (item == null) return;
									if (item instanceof ns.MenuItem) {
										input.itemsAdd(item);
									}
									else if (typeof item === "string" || typeof item === "number" || typeof item === "boolean" || item instanceof Date) {
										let value = item.toString();
										let n = new ns.MenuItem(value);
										input.itemsAdd(n);
									}
									else {
										if (item.hasOwnProperty("text")) {
											let value: any = item;
											let n = new ns.MenuItem(value.text, value.helpText, value.data, value.key);
											input.itemsAdd(n);
										}
									}
								});
							}
						}

						if (params.hasOwnProperty("selectedItem")) {
							input.selectedItem(ko.unwrap(params.selectedItem));
							if (ko.isObservable(params.selectedItem)) {

								input.onItemClick(function (e: ns.EventParam) {
									params.selectedItem(e.data());
								});

								params.selectedItem.subscribe(function (newValue) {
									input.selectedItem(newValue);
								});
							}
						}

						if (params.hasOwnProperty("selectedKey")) {
							//use the key/item mapper to translated selected item to key
							//and selected key to item 
							if (params.selectedKey != undefined) {
								KOInputBox.keyItemMapper(input, params.selectedKey);
							}
						}

						//get the span place holder created by the template
						var span = $(componentInfo.element).children("span");

						//render the input as the first child in the <ux-inputbox> element
						input.render(span.parent());

						//the span no longer needed, it's only used to get the parent 
						//which is the <ux-inputbox> element
						span.remove();

						//return the reference of the control
						if (ko.isObservable(params.instance)) {
							params.instance(input);
						}

						return params;
					}
				},

				template: "<span></span>"
			});
		}


		private static keyItemMapper(input: ns.InputBox, selectedKey) {
			var key = ko.unwrap(selectedKey);
			KOInputBox.selectKey(input, key);
			if (ko.isObservable(selectedKey)) {
				input.onItemClick(function (e) {
					selectedKey(e.data().key());
				});
				selectedKey.subscribe(function (newValue) {
					KOInputBox.selectKey(input, newValue);
				});
			}
		}


		private static selectKey(input: ns.InputBox, key) {
			var item = null;
			for (let i = 0; i < input.items().length; i++) {
				if (input.items()[i].key() == key) {
					item = input.items()[i];
					break;
				}
			}
			input.selectedItem(item);
		}

	}

}