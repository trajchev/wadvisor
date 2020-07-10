import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import d3Tip from 'd3-tip';

import { H2HModel } from '../../../../models/h2h.model';

@Component({
  selector: 'app-h2h-chart',
  templateUrl: './h2h-chart.component.html',
  styleUrls: ['./h2h-chart.component.scss']
})
export class H2hChartComponent implements OnInit {

  @Input() data: H2HModel[];

  svg;
  graph;
  duration: number = 500;

  constructor() {}

  ngOnInit(): void {
    this.drawChart(this.data);
  }

  drawChart(data) {
    const margin = { left: 20, right: 20, bottom: 40, top: 100};
    const svgWidth = document.querySelector('.h2h-chart').clientWidth;
    const svgHeight = document.querySelector('.h2h-chart').clientHeight;
    const graphWidth = svgWidth - margin.left;
    const graphHeight = svgHeight - margin.top - margin.bottom;

    const keys = ['odds_home', 'odds_away', 'odds_draw'];
    const home = _.map(data, keys[0]);
    const away = _.map(data, keys[1]);
    const draw = _.map(data, keys[2]);
    const maxOdds = _.union(home, away, draw);

    const color = d3.scaleOrdinal()
      .range(["#54C479", "#248E38", "#444"])

    // Define x and y axis
    const x = d3.scaleBand()
      .domain(data.map(d => d.site.name))
      .rangeRound([0, graphWidth])
      .paddingInner(0.5);

    const xg = d3.scaleBand()
      .domain(keys)
      .range([0, x.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([Math.ceil(_.max(maxOdds)), 0])
      .range([0, graphHeight]);

    // append the svg element
    this.svg = d3.select('.h2h-chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Handle tooltip
    const tip = d3Tip();

    // Tooltip definitions
    tip
      .attr('class', 'd3-tip')
      .offset([-20, 0])
      .html(d => `<div style="padding: .5rem; background: #fff;
      box-shadow: 1px 1px 10px #888888;">${d.key.replace('_', ' ')}: <strong>${d.value}</strong></div>`);

    // append the graph element
    this.graph = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('width', graphWidth)
      .attr('height', graphHeight);

    // Axis group
    const xAxisGroup = this.svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left}, ${graphHeight + margin.top + 10})`);

    const yAxisGroup = this.svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Create axis
    const xAxis = d3.axisBottom(x).tickSize(0).ticks(data.length);
    const yAxis = d3.axisLeft(y).tickSize(5).ticks(4);

    // Call axis
    xAxisGroup.call(xAxis).call(g => g.select('.domain').remove());
    yAxisGroup.call(yAxis).call(g => g.select('.domain').remove());

    xAxisGroup.selectAll('text')
    .attr('text-anchor', 'center')
    .attr('transform', 'rotate(20)')

    // Load the data bars
    this.loadBars(data, x, xg, y, keys, color, tip);

    // Attach tooltip to SVG container
    this.svg.call(tip);

    // Load legend
    this.legend(svgWidth, color);

  }

  loadBars(data, x, xg, y, keys, color, tip) {
    this.graph
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', d => `translate(${x(d.site.name)})`)
      .selectAll('rect')
      .data(d => keys.map(key => ({key, value: d[key]})))
      .join('rect')
      .attr('x', d => xg(d.key))
      .attr('y', d => y(d.value))
      .attr('width', xg.bandwidth())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .transition()
      .duration(this.duration)
      .attr('height', d => y(0) - y(d.value))
      .attr('fill', d => color(d.key))
  }

  legend(svgWidth, color) {
    const legend = this.svg
      .append('g')
      .attr('transform', `translate(${svgWidth}, 0)`)
      .attr('text-anchor', 'end')
      .attr('font-size', 10)
      .selectAll('g')
      .data(color.domain().slice())
      .join('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend
      .append('rect')
      .attr('x', -18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', color);

    legend
      .append('text')
      .attr('x', -24)
      .attr('y', 9.5)
      .attr('dy', '0.35em')
      .text(d => d.replace('_', ' '));
  }

}
