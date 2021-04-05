import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const testData1 = [
  {
    country: "AD",
    "hot dog": 86,
    "hot dogColor": "hsl(170, 70%, 50%)",
    burger: 167,
    burgerColor: "hsl(142, 70%, 50%)",
    sandwich: 177,
    sandwichColor: "hsl(236, 70%, 50%)",
    kebab: 51,
    kebabColor: "hsl(187, 70%, 50%)",
    fries: 183,
    friesColor: "hsl(159, 70%, 50%)",
    donut: 129,
    donutColor: "hsl(101, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 138,
    "hot dogColor": "hsl(158, 70%, 50%)",
    burger: 41,
    burgerColor: "hsl(191, 70%, 50%)",
    sandwich: 120,
    sandwichColor: "hsl(347, 70%, 50%)",
    kebab: 170,
    kebabColor: "hsl(268, 70%, 50%)",
    fries: 184,
    friesColor: "hsl(163, 70%, 50%)",
    donut: 102,
    donutColor: "hsl(325, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 26,
    "hot dogColor": "hsl(11, 70%, 50%)",
    burger: 11,
    burgerColor: "hsl(271, 70%, 50%)",
    sandwich: 41,
    sandwichColor: "hsl(336, 70%, 50%)",
    kebab: 52,
    kebabColor: "hsl(345, 70%, 50%)",
    fries: 158,
    friesColor: "hsl(110, 70%, 50%)",
    donut: 26,
    donutColor: "hsl(259, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 74,
    "hot dogColor": "hsl(189, 70%, 50%)",
    burger: 194,
    burgerColor: "hsl(133, 70%, 50%)",
    sandwich: 189,
    sandwichColor: "hsl(322, 70%, 50%)",
    kebab: 118,
    kebabColor: "hsl(288, 70%, 50%)",
    fries: 17,
    friesColor: "hsl(15, 70%, 50%)",
    donut: 192,
    donutColor: "hsl(114, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 12,
    "hot dogColor": "hsl(39, 70%, 50%)",
    burger: 190,
    burgerColor: "hsl(334, 70%, 50%)",
    sandwich: 2,
    sandwichColor: "hsl(326, 70%, 50%)",
    kebab: 199,
    kebabColor: "hsl(143, 70%, 50%)",
    fries: 161,
    friesColor: "hsl(233, 70%, 50%)",
    donut: 192,
    donutColor: "hsl(253, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 40,
    "hot dogColor": "hsl(171, 70%, 50%)",
    burger: 0,
    burgerColor: "hsl(350, 70%, 50%)",
    sandwich: 187,
    sandwichColor: "hsl(306, 70%, 50%)",
    kebab: 127,
    kebabColor: "hsl(48, 70%, 50%)",
    fries: 128,
    friesColor: "hsl(157, 70%, 50%)",
    donut: 53,
    donutColor: "hsl(344, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 125,
    "hot dogColor": "hsl(141, 70%, 50%)",
    burger: 54,
    burgerColor: "hsl(237, 70%, 50%)",
    sandwich: 152,
    sandwichColor: "hsl(292, 70%, 50%)",
    kebab: 89,
    kebabColor: "hsl(140, 70%, 50%)",
    fries: 144,
    friesColor: "hsl(344, 70%, 50%)",
    donut: 107,
    donutColor: "hsl(187, 70%, 50%)",
  },
];
// hot dog
const BarChart = ({
  data = testData1,
  keys = ["count"],
  indexBy = "country",
  colors={ scheme: "nivo" },
  margin={ top: 50, right: 130, bottom: 50, left: 60 }
}) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy={indexBy}
    margin={margin}
    padding={0.3}
    groupMode="grouped"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={colors}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -25,
      // legend: "date",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      // legend: "count",
      // legendPosition: "middle",
      // legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    legends={[]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    theme={{
        tooltip: {
          container: {
            background: "#eef0f4",
          },
        },
      }}
  />
);

export default BarChart;
