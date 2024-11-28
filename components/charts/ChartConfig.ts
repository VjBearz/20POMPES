export const defaultChartConfig = {
  xAxis: {
    stroke: "#888888",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    padding: { left: 10, right: 10 }
  },
  yAxis: {
    stroke: "#888888",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    width: 40
  },
  line: {
    type: "monotone" as const,
    strokeWidth: 2,
    dot: false,
    stroke: "#FFD700"
  },
  bar: {
    fill: "#FFD700",
    radius: [4, 4, 0, 0]
  },
  grid: {
    stroke: "#333",
    strokeDasharray: "3 3"
  }
};