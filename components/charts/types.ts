export interface ChartProps {
  xAxis: {
    stroke: string;
    fontSize: number;
    tickLine: boolean;
    axisLine: boolean;
    padding: {
      left: number;
      right: number;
    };
  };
  yAxis: {
    stroke: string;
    fontSize: number;
    tickLine: boolean;
    axisLine: boolean;
    width: number;
  };
  line: {
    type: "monotone";
    strokeWidth: number;
    dot: boolean;
    stroke: string;
  };
}