import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = (props) => (
  <ResponsiveLine
    data={props.data}
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    theme={{
      tooltip: {
        container: {
          background: "#eef0f4",
        },
      },
    }}
    yFormat=" >-.2f"
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "date",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    enableGridX={false}
    colors={{ scheme: "nivo" }}
    pointSize={7}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableSlices="x"
    useMesh={true}
    legends={[
      {
        anchor: "top",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: -30,
        itemWidth: 100,
        itemHeight: 10,
        itemsSpacing: 5,
        symbolSize: 20,
        symbolShape: "circle",
        itemDirection: "left-to-right",
        itemTextColor: "#777",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default LineChart;
