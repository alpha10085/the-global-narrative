import ChartBar from "./Charts/ChartBar/ChartBar";
import ChartLine from "./Charts/ChartLine/ChartLine";
import ChartPie from "./Charts/ChartPie/ChartPie";
import InsightsTable from "./Charts/Table/Table";

const ChartControl = (props) => {
  const { type = "bar" } = props;

  switch (type) {
    case "bar":
      return <ChartBar {...props} />;
    case "line":
      return <ChartLine {...props} />;
    case "pie":
      return <ChartPie {...props} />;
    case "table":
      return <InsightsTable {...props} />;
    default:
      return <div>Invalid chart type: {type}</div>;
  }
};

export default ChartControl;
