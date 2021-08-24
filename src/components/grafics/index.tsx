import React, { Dispatch, FC, SetStateAction, useState } from "react";
//@ts-ignore
import { Chart, Ticks, Layer, Bars, Transform } from "rumble-charts";
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

const GraficComponent: FC<GraficProps> = (props) => {
  const [title, setTitle] = useState("");
  const [active, setActive] = useState<number[]>([]);
  return (
    <>
      <div title={title}>
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
                      const over = series.map((e) => ({
                        ...e,
                        data: e.data.filter((_, index) =>
                          active.length === 0 ? true : !active.includes(index)
                        ),
                      }))
                      setTitle(String(poiterData(e,over)));
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
                    const offset = -((1 - len) / 2 + (seriesIndex)) * 25;
                    // console.log('seriesIndex props', {series:seriesIndex, props:props,offset:offset,len:len});
                    return {
                      transform: `translateX(${offset}px)`,
                      // zIndex:  `${(0-seriesIndex)}`,
                    };
                  }}
                />
              </Transform>
            </Layer>
          </Chart>
          <LegendComponent
            color={color}
            name={name}
            active={active}
            setActive={setActive}
          />
        </div>
      </div>
    </>
  );
};

export default GraficComponent;
