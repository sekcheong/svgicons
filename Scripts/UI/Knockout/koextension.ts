namespace Epic.SystemPulse.UI.Knockout {

	import ns = Epic.SystemPulse.UI.Knockout.Components;

	export class KnockoutExtension {		
		public static registerComponents() {		
			//put all the Knockout component registrations here
			ns.KOInputBox.register();
		}
	}

}