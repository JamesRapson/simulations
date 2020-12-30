import React, { useRef } from "react";

import d3, { max, select, scaleLinear, histogram, axisBottom } from "d3";
import { getEnergy } from "./elasticCollisionsSimulator";
import { Sprite, Environment } from "./model";

let lastUpdate: number;

export const Histogram = ({
  sprites,
  environment,
}: {
  sprites: Sprite[];
  environment: Environment;
}) => {
  const ref = useRef(null);
  const svg = select(ref.current);

  var margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  let diff = 0;
  if (lastUpdate) diff = Date.now() - lastUpdate;

  if (diff > 1000 || !lastUpdate) {
    lastUpdate = Date.now();

    const data = getEnergy(sprites, environment);

    //const maxVal = (max(data) || 100) + 50;
    const maxVal = 20000;
    const minVal = 0;
    //const minVal = min(data) || 0;
    //const minVal = 0;
    //const maxVal = 100;
    const xScale = scaleLinear<number>()
      .domain([minVal, maxVal])
      .range([0, 600]);

    svg.select("g").remove();

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(xScale));

    var getHist = histogram()
      .domain([minVal, maxVal]) // then the domain of the graphic
      .thresholds(xScale.ticks(70)); // then the numbers of bins

    var bins = getHist(data);

    const numBins = bins.length;
    const yScale = scaleLinear<number>()
      .domain([0, max(bins, (d: any) => d.length)])
      .range([height, 0]);

    //svg.append("g").attr("transform", "translate(0,0)").call(axisLeft(yScale));

    const getHeight = (d: d3.Bin<number, number>) => {
      const tempLength = yScale(d.length);
      return height - (tempLength || 0);
    };

    const getWidth = (d: d3.Bin<number, number>) => {
      return width / numBins - 2;
    };

    svg.selectAll("rect").remove();

    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", (d) => {
        return "translate(" + xScale(d.x0 || 0) + "," + yScale(d.length) + ")";
      })
      .attr("width", width / numBins)
      .attr("height", (d) => getHeight(d))
      .style("fill", "#69b3a2");
  }

  return (
    <div className="App">
      <svg width={700} height={400}>
        <g ref={ref} transform="translate(30,30)" />
      </svg>
    </div>
  );
};
