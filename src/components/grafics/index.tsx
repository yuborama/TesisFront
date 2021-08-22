import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
//@ts-ignore
import { Chart, Ticks, Layer, Bars, Transform } from "rumble-charts";
import { cursorTo } from "readline";
import LegendComponent from "../legend";

type GraficProps = {
  series: {
    subcodigo: string;
    data: number[];
  }[];
};

const series = [
  { subcodigo: "123", data: [1, 2, 3] },
  { subcodigo: "234", data: [1, 2, 3] },
  { subcodigo: "345", data: [1, 2, 3] },
  { subcodigo: "456", data: [1, 2, 3] },
  { subcodigo: "567", data: [1, 2, 3] },
  { subcodigo: "678", data: [1, 2, 3] },
  { subcodigo: "789", data: [1, 2, 3] },
  { subcodigo: "890", data: [1, 2, 3] },
  { subcodigo: "901", data: [1, 2, 3] },
  { subcodigo: "1012", data: [1, 2, 3] },
  { subcodigo: "1113", data: [1, 2, 3] },
];

const name = ["base", "pozo adasdasdadasdasdasd", "your news"];
const color = ["red", "blue", "yellow"];

const barWidth = 80;
const barOffset = 20;

const GraficComponent: FC<GraficProps> = (props) => {
  const [title, setTitle] = useState("");
  const [active, setActive] = useState<number[]>([]);
  // const [filter, setFilter] = useState(-1);
  // const { series } = props;
  return (
    <>
      <div title={title}>
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
          <Chart
            width={600}
            height={400}
            series={series.map((e) => ({
              ...e,
              data: e.data.filter((_, index) =>
                active.length === 0 ? true : !active.includes(index)
              ),
            }))}
            minY={0}
          >
            <Layer width="90%" height="80%" position="top center">
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
              <Transform method="transpose">
                <Ticks
                  axis="x"
                  label={({ _, index }: any) => series[index].subcodigo}
                  labelStyle={{
                    textAnchor: "middle",
                    dominantBaseline: "text-before-edge",
                    fill: "lightgray",
                  }}
                  labelAttributes={{ y: 3 }}
                  lineLength={11}
                  ticks={series.length}
                />
              </Transform>
              <Transform method="transpose">
                <Bars
                  colors={color.filter((e, index) => {
                    // console.log('revisando', active.length === 0? e: !active.includes(index));
                    // console.log('index', index);
                    // console.log('element', e);
                    return active.length === 0 ? e : !active.includes(index);
                  })}
                  barAttributes={{
                    onMouseMove: (e: any) => {
                      const poiterData = (e: any, series:any) => {
                        const regex = /\d+\b/;
                        const subcodigo = parseInt(
                          regex.exec(e.target.parentElement.classList[1])![0]
                        );
                        const data = parseInt(
                          regex.exec(
                            e.target.parentElement.parentElement.classList[1]
                          )![0]
                        );
                        return(series[subcodigo].data[data])
                      };
                      setTitle(String(poiterData(e,series)));
                      e.target.style.cursor = "pointer";
                      e.target.style.opacity = 0.5;
                    },
                    onMouseLeave: (e: any) => {
                      e.target.style.opacity = 1;
                      setTitle("");
                    },
                  }}
                  className={"bar"}
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
          {/* <div >
    <Dots />
    <Labels 
      label={({_,index}:any) => ('y=' + name[index])}
      dotStyle={{
        textAnchor: 'middle',
        dominantBaseline: 'text-after-edge',
        fontFamily: 'sans-serif',
        fontSize: '0.8em'
      }}
      labelAttributes={{
        y: -4
      }}
    />
        </div> */}

          <LegendComponent
            color={color}
            name={name}
            active={active}
            setActive={setActive}
          />
          {/* <div><div 
            onClick={()=>setFilter(-1)} 
            style={{
              display: "flex",
              alignItems:"center",
              // justifyContent:"center"
            }}>
                
                <span>todos los datos</span>
              </div>
            {name.map((x,i)=> <div 
            onClick={()=>setFilter(i)} 
            style={{
              display: "flex",
              alignItems:"center",
              // justifyContent:"center"
            }}>
                <div style={{
                height:'10px', 
                width:'10px',
                borderRadius:'50%',
                backgroundColor:color[i]
                }}></div>
                <span>{x}</span>
              </div>
            )}
        </div> */}
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
      </div>
    </>
  );
};

export default GraficComponent;
