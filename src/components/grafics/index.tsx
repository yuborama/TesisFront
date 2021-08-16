import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { FC, useState } from "react";
//@ts-ignore
import { Chart, Ticks, Layer, Bars, Transform,Dots,Labels } from "rumble-charts";

type GraficProps = {
  series: {
    name: string;
    data: number[];
  }[];
};

const GraficComponent: FC<GraficProps> = (props) => {
  const { series } = props;
  return (
    <>
      <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
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
      </div>

      <div style={{ fontFamily: "sans-serif", fontSize: "0.8em" }}>
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
            <Bars groupPadding="3%" innerPadding="0.5%" />
          </Layer>
        </Chart>
      </div>
    </>
  );
};

export default GraficComponent;
