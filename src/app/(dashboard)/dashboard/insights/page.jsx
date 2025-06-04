import { getInsightsData } from "@/_Dashboard/lib/Insights";
import InsightsDashboard from "@/_Dashboard/components/Insights/InsightsDashboard/InsightsDashboard";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const data = await getInsightsData(searchParams);
  return <InsightsDashboard data={data} searchParams={searchParams} />;
};

export default page;
