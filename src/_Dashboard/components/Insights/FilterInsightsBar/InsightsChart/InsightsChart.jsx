import InsightsChartBar from "./Charts/InsightsChartBar/InsightsChartBar";
import InsightsChartLine from "./Charts/InsightsChartLine/InsightsChartLine";
import InsightsChartPie from "./Charts/InsightsChartPie/InsightsChartPie";
import InsightsTable from "./Charts/InsightsTable/InsightsTable";

const InsightsChart = (props) => {
  const { type = "bar" } = props;

  switch (type) {
    case "bar":
      return <InsightsChartBar {...props} />;
    case "line":
      return <InsightsChartLine {...props} />;
    case "pie":
      return <InsightsChartPie {...props} />;  
    case "table":
      return <InsightsTable {...props} />;
    default:
      return <div>Invalid chart type: {type}</div>;
  }
};

export default InsightsChart;
