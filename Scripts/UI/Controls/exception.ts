namespace Epic.SystemPulse.UI.Controls {
	export class Exception {
		private _errorMsg: string;
		private _data: any;

		constructor(message: string, data?:any) {
			this._errorMsg = message;
		}
		 
		public message(): string {
			return this._errorMsg;
		}

		public data(): any {
			return this._data;
		}
	}
}