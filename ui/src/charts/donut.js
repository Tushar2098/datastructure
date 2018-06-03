import React, { Component } from "react";

import { scaleOrdinal } from "d3-scale";
import { select } from "d3-selection";
import { format } from "d3-format";
import { pie, arc } from "d3-shape";

class DonutChart extends Component {
    static defaultProps = {
        data: [1, 2, 3, 4, 5, 6, 7],
        width: 700,
        height: 500
    };
    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }
    componentDidMount() {
        this.renderChart();
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps !== prevProps) {
            this.renderChart();
        }
    }

    createChart(selection) {
        const { width, height } = this.props;

        const floatFormat = format(".4r");
        const margin = { top: 10, right: 10, bottom: 10, left: 10 };
        const cornerRadius = 3;
        const padAngle = 0.015; // effectively dictates the gap between slices
        const pointerData = ["front", "rear", "front(-1),rear(-1)"];
        const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;

        selection.each(data => {
            const radius = Math.min(width, height) / 2;

            // creates a new pie generator
            const pied = pie()
                .value(d => 1)
                .sort(null);

            // constructs arc generator. This will be used for the donut. The difference between outer and inner
            // radius will dictate the thickness of the donut
            const arced = arc()
                .outerRadius(radius * 0.8)
                .innerRadius(radius * 0.6)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle);

            // this arc is used for aligning the text labels
            const outerArc = arc()
                .outerRadius(radius * 0.9)
                .innerRadius(radius * 0.9);

            // ===========================================================================================

            // ===========================================================================================
            // append the svg object to the selection

            const svg = selection
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

            // ===========================================================================================

            // ===========================================================================================
            // g elements to keep elements within svg modular

            svg.append("g").attr("class", "slices");
            svg.append("g").attr("class", "labelName");
            svg.append("g").attr("class", "pointers");
            svg.append("g").attr("class", "lines");

            const label = svg
                .select(".labelName")
                .selectAll("text")
                .data(pied)
                .enter()
                .append("text")
                .attr("dy", ".35em")
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return "<tspan>" + d.data + "</tspan>";
                })
                .attr("transform", function(d) {
                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = arced.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    // pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                });

            const pointers = svg
                .select(".pointers")
                .selectAll("text")
                .data(pied)
                .enter()
                .append("text")
                .attr("dy", ".35em")
                .html(function(d) {
                    // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
                    return (
                        "<tspan>" +
                        pointerData[
                            Math.floor(Math.random() * pointerData.length)
                        ] +
                        "</tspan>"
                    );
                })
                .attr("transform", function(d) {
                    // effectively computes the centre of the slice.
                    // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
                    var pos = outerArc.centroid(d);

                    // changes the point to be on left or right depending on where label is.
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                });

            // ===========================================================================================

            // ===========================================================================================
            // add and colour the donut slices
            const path = svg
                .select(".slices")
                .datum(data)
                .selectAll("path")
                .data(pied)
                .enter()
                .append("path")
                .attr("d", arced)
                .attr("fill", "#fff");

            // ===========================================================================================

            // ===========================================================================================
            // add lines connecting labels to slice. A polyline creates straight lines connecting several points
            var polyline = svg
                .select(".lines")
                .selectAll("polyline")
                .data(pied)
                .enter()
                .append("polyline")
                .attr("points", function(d) {
                    // see label transform function for explanations of these three lines.
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                    return [arced.centroid(d), outerArc.centroid(d), pos];
                });
        });
    }

    renderChart() {
        const node = this.node;

        select(node)
            .datum(this.props.data)
            .call(this.createChart);
    }

    render() {
        return <div ref={node => (this.node = node)} />;
    }
}

export default DonutChart;
