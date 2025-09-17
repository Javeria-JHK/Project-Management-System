import { useEffect, useRef } from "react";
import * as d3 from "d3";

function DonutChart({ data, width = 300 }) {
  const ref = useRef();

  useEffect(() => {
    const height = width;
    const radius = Math.min(width, height) / 2;

    const color = d3
      .scaleOrdinal()
      .domain(["To Do", "In Progress", "Completed", "In Review"])
      .range(["#949494", "#B8A35B", "#538C59", "#2C38A3"]);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.65)
      .outerRadius(radius * 0.9);

    const pie = d3.pie().value((d) => d.value);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const path = svg
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.label}: ${d.data.value}`);
  }, [data, width]);
  return <svg ref={ref} width={width}></svg>;
}

export default DonutChart;
