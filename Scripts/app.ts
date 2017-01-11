namespace Test {
	declare var d3;
	export class Application {
		public run() {
			var l = 1024;
			var rect = d3.select("body")
				.append("svg")
				.attr("width", l)
				.attr("height", l)
				.append("rect")
				.attr("id", "main")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", l)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke","#606060")
				.attr("height", l);

			var r = d3.select("svg");
			r.append("line")
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", l)
				.attr("y2", l)
				.attr("stroke-width", 1)
				.attr("stroke", "#606060");

			var s = d3.select("svg");
			s.append("line")
				.attr("x1", l)
				.attr("y1", 0)
				.attr("x2", 0)
				.attr("y2", l)
				.attr("stroke-width", 1)
				.attr("stroke", "#606060");

			var u = d3.select("svg");
			u.append("line")
				.attr("x1", l/2)
				.attr("y1", 0)
				.attr("x2", l/2)
				.attr("y2", l)
				.attr("stroke-width", 1)
				.attr("stroke", "#606060");

			var v = d3.select("svg");
			v.append("line")
				.attr("x1", 0)
				.attr("y1", l/2)
				.attr("x2", l)
				.attr("y2", l/2)
				.attr("stroke-width", 1)
				.attr("stroke", "#606060");

			//var v = d3.select("svg");
			//r.append("line")
			//	.attr("x1", 1024)
			//	.attr("y1", 0)
			//	.attr("x2", 0)
			//	.attr("y2", 1024)
			//	.attr("stroke-width", 1)
			//	.attr("stroke", "#606060");

			r.append("circle")
				.attr("cx", l/2)
				.attr("cy", l/2)
				.attr("r", (l/2)-(l/16))
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#606060");
			
			console.log("running");
		}
	}
}

var app = new Test.Application();
app.run();