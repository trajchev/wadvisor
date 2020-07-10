import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import d3Tip from 'd3-tip';

import { MatchService } from '../../match.service';

@Component({
  selector: 'app-spreads-chart',
  templateUrl: './spreads-chart.component.html',
  styleUrls: ['./spreads-chart.component.scss']
})
export class SpreadsChartComponent implements OnInit {

  @Input() id: number;
  @Input() key: string;

  svg;
  graph;
  duration: number = 500;

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.matchService.getSpreads(this.key, this.id, 'spreads').subscribe(spreads => {
      this.drawGraph(spreads);
    });
  }

  drawGraph(data): void {

    const margin = { left: 20, right: 20, bottom: 40, top: 100 };
    const svgWidth = document.querySelector('.spreads-chart').clientWidth;
    const svgHeight = document.querySelector('.spreads-chart').clientHeight;
    const graphWidth = svgWidth - margin.left;
    const graphHeight = svgHeight - margin.top - margin.bottom;

    const keys = ['odds_home', 'points_home', 'odds_away', 'points_away'];
    const odds_home = _.map(data, keys[0]);
    const points_home = _.map(data, keys[1]);
    const odds_away = _.map(data, keys[2]);
    const points_away = _.map(data, keys[3]);
    const points_odds = _.union(odds_home, points_home, odds_away, points_away);

    const color = d3.scaleOrdinal()
      .range(["#54C479", "#54C479", "#248E38", "#248E38"]);

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
      .domain([Math.ceil(_.max(points_odds)), Math.floor(_.min(points_odds))])
      .range([0, graphHeight]);

    // append the svg element
    this.svg = d3.select('.spreads-chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Handle tooltip
    const tip = d3Tip();

    // Tooltip definitions
    tip
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(d => `<div style="padding: .5rem; background-color: #fff;
      box-shadow: 1px 1px 10px #888888;">${d.key.replace('_', ' ')}: <strong>${d.value}</strong></div>`);

    // Attach tooltip to SVG container
    this.svg.call(tip);

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
      .attr('transform', `translate(${margin.left}, ${graphHeight + margin.top})`);

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

    // Load the graph data
    this.loadGraphData(data, x, xg, y, keys, color, tip);
    this.legend(svgWidth, color, keys);

  }

  loadGraphData(data, x, xg, y, keys, color, tip) {
    this.graph
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('transform', d => `translate(${x(d.site.name)})`)
      .selectAll('rect')
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .join('rect')
      .attr('x', d => d.key === keys[1] || d.key === keys[3] ? xg(d.key) + (xg.bandwidth() / 2) - 10 : xg(d.key))
      .attr('y', d => y(d.value))
      .attr('width', d => d.key === keys[1] || d.key === keys[3] ? 20 : xg.bandwidth())
      .attr('rx', d => d.key === keys[1] || d.key === keys[3] ? 10 : 0)
      .attr('ry', d => d.key === keys[1] || d.key === keys[3] ? 10 : 0)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .transition()
      .duration(this.duration)
      .attr('height', d => d.key === keys[1] || d.key === keys[3] ? 20 : Math.abs(y(0) - y(d.value)))
      .attr('fill', d => color(d.key))
  }

  legend(svgWidth, color, keys) {
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
      .attr('rx', d => d === keys[1] || d === keys[3] ? 10 : 0)
      .attr('ry', d => d === keys[1] || d === keys[3] ? 10 : 0)
      .attr('fill', color);

    legend
      .append('text')
      .attr('x', -24)
      .attr('y', 9.5)
      .attr('dy', '0.35em')
      .text(d => d.replace('_', ' '));
  }

}
