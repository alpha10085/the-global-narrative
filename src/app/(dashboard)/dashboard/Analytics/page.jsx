import AnalyticsDashboard from "@/_Dashboard/components/Analytics/AnalyticsDashboard/AnalyticsDashboard";
import { getAnalyticsData } from "@/_Dashboard/lib/Analytics";

const page = async (props) => {
  const searchParams = await props.searchParams;
  const data = await getAnalyticsData(searchParams);
  const pageview = await getAnalyticsData("/page-view",searchParams?.["page"]);
  return <AnalyticsDashboard data={data} searchParams={searchParams} />;
};

export default page;
