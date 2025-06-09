import InsightsDashboard from "@/_Dashboard/components/Insights/InsightsDashboard/InsightsDashboard";
import { getInsightsData } from "@/_Dashboard/lib/Insights";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const data = await getInsightsData(searchParams);
  return <InsightsDashboard data={data} searchParams={searchParams} />;
};

export default page;
