var Test;
(function (Test) {
    var Application = (function () {
        function Application() {
        }
        Application.prototype.drawGrid = function (g, lines) {
            var c = "#b0b0b0";
            g.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", "1024")
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", c)
                .attr("height", "1024");
            if (lines) {
                for (var i = 0; i < 64; i++) {
                    g.append("line")
                        .attr("x1", 0)
                        .attr("y1", i * 16)
                        .attr("x2", 1024)
                        .attr("y2", i * 16)
                        .attr("stroke-width", 1)
                        .attr("stroke", "#008000");
                    g.append("line")
                        .attr("x1", i * 16)
                        .attr("y1", 0)
                        .attr("x2", i * 16)
                        .attr("y2", 1024)
                        .attr("stroke-width", 1)
                        .attr("stroke", "#008000");
                }
            }
            g.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 1024)
                .attr("y2", 1024)
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 0)
                .attr("y1", 1024)
                .attr("x2", 1024)
                .attr("y2", 0)
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 512)
                .attr("y1", 0)
                .attr("x2", 512)
                .attr("y2", 1024)
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 0)
                .attr("y1", 512)
                .attr("x2", 1024)
                .attr("y2", 512)
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("rect")
                .attr("x", 64)
                .attr("y", 64)
                .attr("width", 1024 - 128)
                .attr("height", 1024 - 128)
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("circle")
                .attr("cx", 512)
                .attr("cy", 512)
                .attr("r", 448)
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("circle")
                .attr("cx", 512)
                .attr("cy", 512)
                .attr("r", 272)
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("circle")
                .attr("cx", 512)
                .attr("cy", 512)
                .attr("r", 192)
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 0)
                .attr("y1", 320)
                .attr("x2", 1024)
                .attr("y2", 320)
                .attr("stroke-width", 1)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 0)
                .attr("y1", 704)
                .attr("x2", 1024)
                .attr("y2", 704)
                .attr("stroke-width", 1)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 320)
                .attr("y1", 0)
                .attr("x2", 320)
                .attr("y2", 1024)
                .attr("stroke-width", 1)
                .attr("stroke", c);
            g.append("line")
                .attr("x1", 704)
                .attr("y1", 0)
                .attr("x2", 704)
                .attr("y2", 1024)
                .attr("stroke-width", 1)
                .attr("stroke", c);
        };
        Application.prototype.run = function () {
            var c = "#808080";
            //var img = d3.select("body")
            //	.append("img")
            //	.attr("width", 100)
            //	.attr("height", 100);
            var svg = d3.select("body")
                .append("svg")
                .attr("width", "512")
                .attr("height", "512")
                .attr("viewBox", "0 0 1024 1024");
            //var g = svg;
            var g = d3.select("svg").append("g");
            //g.attr("transform", "translate(128,128) scale(" +(1024/1024) + ")");
            this.drawGrid(g);
            g.append("rect")
                .attr("x", 96)
                .attr("y", 96)
                .attr("width", 832)
                .attr("height", 832)
                .attr("fill", "none")
                .attr("stroke-width", 64)
                .attr("stroke", "#000000");
            g.append("line")
                .attr("x1", 224)
                .attr("y1", 512)
                .attr("x2", 480)
                .attr("y2", 768)
                .attr("stroke-width", 10 * 16)
                .attr("stroke", "#000000");
            g.append("line")
                .attr("x1", 368)
                .attr("y1", 768)
                .attr("x2", 368 + 27 * 16)
                .attr("y2", 768 - 27 * 16)
                .attr("stroke-width", 10 * 16)
                .attr("stroke", "#000000");
            console.log("running");
        };
        return Application;
    }());
    Test.Application = Application;
})(Test || (Test = {}));
var app = new Test.Application();
app.run();
//# sourceMappingURL=app.js.map