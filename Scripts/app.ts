﻿namespace Test {
	declare var d3;
	export class Application {
		public run() {
			var l = 1024;
			
			var svg = d3.select("body")
				.append("svg")
				.attr("width", 1024)
				.attr("height", 1024);

			var g = d3.select("svg").append("g");
			g.attr("transform", "scale(0.5)");
			g.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", l)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0")
				.attr("height", l);
			
			
			g.append("line")
			  .attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", l)
				.attr("y2", l)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			
			g.append("line")
				.attr("x1", l)
				.attr("y1", 0)
				.attr("x2", 0)
				.attr("y2", l)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			
			g.append("line")
				.attr("x1", 512)
				.attr("y1", 0)
				.attr("x2", 512)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			
			g.append("line")
				.attr("x1", 0)
				.attr("y1", 512)
				.attr("x2", 1024)
				.attr("y2", 512)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");


			g.append("rect")
				.attr("x", l / 16)
				.attr("y", l / 16)
				.attr("width", l - 2*l/16)
				.attr("height", l - 2*l/16)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");
				


			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 448)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 276.88)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 195.78)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			
			g.append("line")
				.attr("x1", 0)
				.attr("y1", 316.25)
				.attr("x2", 1024)
				.attr("y2", 316.25)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			g.append("line")
				.attr("x1", 0)
				.attr("y1", 707.75)
				.attr("x2", 1024)
				.attr("y2", 707.75)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");


			g.append("line")
				.attr("x1", 316.25)
				.attr("y1", 0)
				.attr("x2", 316.25)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			g.append("line")
				.attr("x1", 707.75)
				.attr("y1", 0)
				.attr("x2", 707.75)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", "#A0A0A0");

			
			console.log("running");
		}
	}
}

var app = new Test.Application();
app.run();