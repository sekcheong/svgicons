namespace Test {
	declare var d3;
	export class Application {
		public run() {
			var c = "#000000";

			var svg = d3.select("body")
				.append("svg")
				.attr("width", 2048)
				.attr("height", 2048);

			var g = d3.select("svg").append("g");
			g.attr("transform", "translate(30,30) scale(0.03125)");

			g.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", "1024")
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", c)
				.attr("height", "1024");


			g.append("line")
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", 1024)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("line")
				.attr("x1", 0)
				.attr("y1", 1024)
				.attr("x2", 1024)
				.attr("y2", 0)
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("line")
				.attr("x1", 512)
				.attr("y1", 0)
				.attr("x2", 512)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("line")
				.attr("x1", 0)
				.attr("y1", 512)
				.attr("x2", 1024)
				.attr("y2", 512)
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("rect")
				.attr("x", 64)
				.attr("y", 64)
				.attr("width", 1024-128)
				.attr("height", 1024-128)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", c);



			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 448)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", c);

			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 276.88)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", c);

			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 192)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("line")
				.attr("x1", 0)
				.attr("y1", 316.25)
				.attr("x2", 1024)
				.attr("y2", 316.25)
				.attr("stroke-width", 1)
				.attr("stroke", c);

			g.append("line")
				.attr("x1", 0)
				.attr("y1", 707.75)
				.attr("x2", 1024)
				.attr("y2", 707.75)  
				.attr("stroke-width", 1)
				.attr("stroke", c);


			g.append("line")
				.attr("x1", 316.25)
				.attr("y1", 0)
				.attr("x2", 316.25)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", c);

			g.append("line")
				.attr("x1", 707.75)
				.attr("y1", 0)
				.attr("x2", 707.75)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", c);


			console.log("running");
		}
	}
}

var app = new Test.Application();
app.run();