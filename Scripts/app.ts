namespace Test {
	declare var d3;
	export class Application {

		private mouseMove() {
			var coords = d3.mouse(this);
			$("#coords").text("x=" + coords[0] + ", y=" + coords[1]);
			//console.log("mouse:", coords);
		}


		public drawGrid() {
			var c = "#b0b0b050";
			var width = 512;
			var svg = d3
				.select("#canvas")
				.append("svg")
				.attr("width", width)
				.attr("height", width)
				.attr("viewBox", "0 0 1024 1024");

			var g = svg.append("g");			
			
			var keyLineColor = "#00ff00b0";

			var rect = g.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", 1024)
				.attr("height", 1024)
				.attr("fill", "#00000000")  //rect must be filled in order for mouse event to work
				.attr("stroke-width", 1)
				.attr("stroke", "#000000")
				.on("mousemove", this.mouseMove);						
	
			g.append("rect")
				.attr("x", 64)
				.attr("y", 64)
				.attr("width", 1024 - 128)
				.attr("height", 1024 - 128)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			//the outer circle
			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 448)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			//the middle circle
			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 272)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			//the inner circle
			g.append("circle")
				.attr("cx", 512)
				.attr("cy", 512)
				.attr("r", 192)
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			//diagonal top left to bottom right
			g.append("line")
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", 1024)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			//diagonal top right to bottom left
			g.append("line")
				.attr("x1", 0)
				.attr("y1", 1024)
				.attr("x2", 1024)
				.attr("y2", 0)
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			g.append("line")
				.attr("x1", 512)
				.attr("y1", 0)
				.attr("x2", 512)
				.attr("y2", 1024)
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			g.append("line")
				.attr("x1", 0)
				.attr("y1", 512)
				.attr("x2", 1024)
				.attr("y2", 512)
				.attr("stroke-width", 1)
				.attr("stroke", keyLineColor);

			var gridColor = "#00000050";
			for (let i = 0; i < 64; i++) {
				if ((i % 4) == 0) {
					gridColor = "#000000b0";
				}
				else {
					gridColor = "#00000050";
				}
				g.append("line")
					.attr("x1", i*16)
					.attr("y1", 0)
					.attr("x2", i*16)
					.attr("y2", 1024)
					.attr("stroke-width", 0.5)
					.attr("stroke", gridColor);

				g.append("line")
					.attr("x1", 0)
					.attr("y1", i * 16)
					.attr("x2", 1024)
					.attr("y2", i * 16)
					.attr("stroke-width", 0.5)
					.attr("stroke", gridColor);
			}
			return g;
		}


		private drawIcon(id, path, size) {
			var svg = d3
				.select("#" + id)
				.append("svg")
				.attr("width", size + "px")
				.attr("height", size + "px")
				.attr("viewBox", "1 1 1024 1024");
			var g = svg.append("g");
			g
				.append("path")
				.attr("d", path)
				//.attr("stroke", "#ff0000")
				//.attr("stroke-width",1)
				.attr("fill", "rgb(39,131,240)");
			return g;
		}

		public run() {
			//var width = 960,
			//	height = 500;

			//var svg = d3.select("body").append("svg")
			//	.attr("width", 1024)
			//	.attr("height", 1024)
			//	.attr("viewBox", "0 0 1024 1024");

			//svg.append("g")
			//	.append("rect")
			//	.attr("width", 1024)
			//	.attr("height", 1024)
			//	.attr("fill", "#ff000000")
			//	.attr("stroke","#000000")
			//	.on("mouseover", mouseover)
			//	.on("mousemove", mousemove)
			//	.on("mouseout", mouseout);

			//function mouseover() {
				
			//}

			//function mousemove() {
			//	console.log(d3.event.pageX + ", " + d3.event.pageY);
			//}

			//function mouseout() {
				
			//}
			////var svg = d3.select("#canvas")
			////	.append("svg")
			////	.attr("width", "1024")
			////	.attr("height", "1024")
			////	.attr("viewBox", "1 1 1024 1024");

			////var g = d3.select("svg").append("g");
			
			//var path = "A 45 45, 0, 0, 0, 125 125 L 125 80 Z" ;
			////var path = "M 64 64 l 0 896 l 896 0 l 0 -896 z M 192 192 l 639 0 l 0 639 l -639 0 z";			

			var g = this.drawGrid();
			//g.append("rect")
			//	.attr("x", 0)
			//	.attr("y", 0)
			//	.attr("width", 200)
			//	.attr("height", 200)
			//	.attr("stroke-width", 1)
			//	.attr("fill", "none")
			//	.attr("stroke", "#000000");
							
			//<path d="M80 80
			//A 45 45, 0, 0, 0, 125 125
			//L 125 80 Z" fill="green"/>
			//	< path d= "M230 80
			//A 45 45, 0, 1, 0, 275 125
			//L 275 80 Z" fill="red"/>
			//	< path d= "M80 230
			//A 45 45, 0, 0, 1, 125 275
			//L 125 230 Z" fill="purple"/>
			//	< path d= "M230 230
			//A 45 45, 0, 1, 1, 275 275
			//L 275 230 Z" fill="blue"/>
			var path = "M208 1 A 208 208, 0, 0, 0, 1 208 v608 ";
			path = path + "A 208 208, 0, 0, 0, 208 1023 h608 ";
			path = path + "A 208 208, 0, 0, 0, 1023 816 v-608 ";
			path = path + "a 208 208, 0, 0, 0, -208 -207 h-608 ";
			path = path + "M272 65 A 208 208, 0, 0, 1, 65 272";

			g.append("path")
				.attr("d", path) //"M208 1 A 208 208, 0, 0, 0, 1 208 V816 A 208 208, 0, 0, 0, 208 1023")
				.attr("fill", "none")
				.attr("stroke-width", 1)
				.attr("stroke", "black");
			
			this.drawIcon("view1", path, 128);
			this.drawIcon("view2", path, 64);
			this.drawIcon("view3", path, 32);
			this.drawIcon("view4", path, 16);

			var x = new Function("var x=100; console.log(x);");
			x();
			//g
			//	.append("path")
			//	.attr("d", path)
			//	.attr("stroke", "#00ff00")
			//	.attr("fill", "#ff0000");

			//var g =this.drawIcon("canvas", path, 1024);
						
			//this.drawIcon("view16", path, 16);
			//this.drawIcon("view32", path, 32);
			//this.drawIcon("view64", path, 64);
			
			//var z = { a: 100, b: 145, foo: 300 };
			//console.log("is a in z","a" in z); 
		}

	}
}

var app = new Test.Application();
app.run();