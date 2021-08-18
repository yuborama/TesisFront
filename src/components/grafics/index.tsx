import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { FC, useState } from "react";
//@ts-ignore
import {  Chart,  Ticks,  Layer,  Bars,  Transform,  Dots,  Labels,} from "rumble-charts";

type GraficProps = {
  series: {
    name: string;
    data: number[];
  }[];
};

const series = [
  {
    name: "Top news",
    data: [14, 12,5,19],
  },
  {
    name: "Word news",
    data: [13, 41,34,67],
  }
];

const barWidth = 80;
const barOffset = 20;

const GraficComponent: FC<GraficProps> = (props) => {
  // const { series } = props;
  return (
    <>
      {/* <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
        <Chart width={600} height={250} series={series}>
          <Layer width="95%" height="85%" position="center bottom">
            <Dots />
            <Labels
              label={({ point }:any) => "y=" + point.y}
              dotStyle={{
                textAnchor: "middle",
                dominantBaseline: "text-after-edge",
                fontFamily: "sans-serif",
                fontSize: "0.8em",
              }}
              labelAttributes={{
                y: -4,
              }}
            />
          </Layer>
          <Transform method="stack">
            <Bars combined={true} groupPadding="3%" innerPadding="0.5%" />
          </Transform>
        </Chart>
      </div> */}
      <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
        <Chart width={600} height={300} series={series} minY={0}>
          <Layer width="80%" height="90%" position="top center">
            <Ticks
              axis="y"
              lineLength="100%"
              lineVisible={true}
              lineStyle={{ stroke: "lightgray" }}
              labelStyle={{
                textAnchor: "end",
                dominantBaseline: "middle",
                fill: "lightgray",
              }}
              labelAttributes={{ x: -5 }}
            />
            {/* <Ticks
              axis="x"
              label={({series}) => series.name}
              labelStyle={{
                textAnchor: "middle",
                dominantBaseline: "text-before-edge",
                fill: "lightgray",
              }}
              labelAttributes={{ y: 3 }}
            /> */}
            <Transform method="transpose">
              <Bars
                barAttributes={{
                  onMouseMove: (e:any) => (e.target.style.opacity = 0.5),
                  onMouseLeave: (e:any) => (e.target.style.opacity = 1),
                }}
                barStyle={({ seriesIndex, props }: any) => {
                  const len = props.series.length;
                  const offset = -((1 - len) / 2 + seriesIndex) * 25;
                  return {
                    // opacity: 0.5,
                    transform: `translateX(${offset}px)`,
                  };
                }}
              />
            </Transform>
            {/* <Bars
              seriesIndex={3}
              barWidth={barWidth}
              colors={["yellow"]}
              style={{ transform: `translateX(${barOffset * 2}px)` }}
              barStyle={{
                // hover:,
                fillOpacity: 0.5,
                transition: "all 250ms",
              }}
            />
            <Bars
              seriesIndex={2}
              barWidth={barWidth}
              colors={["red"]}
              style={{ transform: `translateX(${barOffset}px)` }}
            />
            <Bars
              seriesIndex={1}
              barWidth={barWidth}
              colors={["green"]}
              barAttributes={{
                onMouseMove: (e: any) => (e.target.style.fillOpacity = 0.5),
              }}
            />
            <Bars
              seriesIndex={0}
              barWidth={barWidth}
              colors={["blue"]}
              style={{ transform: `translateX(-${barOffset}px)` }}
            /> */}
          </Layer>
        </Chart>
      </div>
      {/* <Chart width={600} height={250} series={series} minY={0}>
        <Layer>
          <Ticks
            axis="x"
            label={({ index, props }: any) => props.series[index].name}
            labelStyle={{
              textAnchor: "middle",
              dominantBaseline: "text-before-edge",
              fill: "lightgray",
            }}
            labelAttributes={{ y: 3 }}
          />
        </Layer>
        <Bars
          seriesIndex={3}
          barWidth={barWidth}
          colors={["yellow"]}
          style={{ transform: `translateX(${barOffset * 2}px)` }}
        />
        <Bars
          seriesIndex={2}
          barWidth={barWidth}
          colors={["red"]}
          style={{ transform: `translateX(${barOffset}px)` }}
        />
        <Bars seriesIndex={1} barWidth={barWidth} colors={["green"]} />
        <Bars
          seriesIndex={0}
          barWidth={barWidth}
          colors={["blue"]}
          style={{ transform: `translateX(-${barOffset}px)` }}
        />
      </Chart> */}
      {/* <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
        <Chart width={600} height={300} series={series} minY={0}>
          <Layer width="80%" height="90%">
            <Ticks
              axis="y"
              lineLength="100%"
              lineVisible={true}
              lineStyle={{ stroke: "lightgray" }}
              labelStyle={{
                textAnchor: "end",
                dominantBaseline: "middle",
                fill: "lightgray",
              }}
              labelAttributes={{ x: -5 }}
            />
            
            <Bars groupPadding="3%" innerPadding="0.5%" />
          </Layer>
        </Chart>
      </div> */}
    </>
  );
};

export default GraficComponent;
