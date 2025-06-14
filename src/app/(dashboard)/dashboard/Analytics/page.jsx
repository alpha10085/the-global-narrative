import ChartBar from "@/_Dashboard/components/Analytics/Charts/ChartBar/ChartBar";
import ChartLine from "@/_Dashboard/components/Analytics/Charts/ChartLine/ChartLine";
import ChartPie from "@/_Dashboard/components/Analytics/Charts/ChartPie/ChartPie";
import InsightsTable from "@/_Dashboard/components/Analytics/Charts/InsightsTable/InsightsTable";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import styles from "./page.module.css";
import DeviceChart from "@/_Dashboard/components/Analytics/Charts/DeviceChart/DeviceChart";

export const chartConfig = {
  dailyTraffic: { title: "Daily Traffic", type: "line" },
  country: { title: "Country-wise Traffic", type: "bar" },
  pageViews: { title: "Page Views", type: "table" },
  devices: { title: "Devices", type: "pie" },
};
const getCacheKey = () => new Date().toLocaleDateString();
const page = async (props) => {
  const searchParams = await props.searchParams;
  const cacheKey = getCacheKey();
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Web Analytics</h1>
      <div className={`${styles.wrapper} flex column gap15 `}>
        <SSRFetcher
          Component={ChartLine}
          path={`/analytics/daily-traffic?days=${
            searchParams?.["dailyTraffic"] || 1
          }`}
          props={{ type: "dailyTraffic" }}
          options={{
            next: { revalidate: "1y", tags: ["daily-traffic"] },
          }}
        />
        <div className="flex gap15">
          <SSRFetcher
            Component={InsightsTable}
            path={`/analytics/page-views?days=${
              searchParams?.["pageViews"] || 1
            }`}
            props={{ type: "pageViews" }}
            options={{
              next: { revalidate: "1y", tags: ["page-views", cacheKey] },
            }}
          />
          <SSRFetcher
            Component={InsightsTable}
            path={`/analytics/country?days=${searchParams?.["country"] || 1}`}
            props={{
              headerLabels: {
                vistor: "vistors",
                main: "Country wise",
              },
              type: "country",
            }}
            options={{
              next: { revalidate: "1y", tags: ["country", cacheKey] },
            }}
          />
        </div>
        <div className="flex gap15">
          <SSRFetcher
            Component={InsightsTable}
            path={`/analytics/devices?days=${searchParams?.["devices"] || 1}`}
            props={{
              headerLabels: {
                vistor: "vistors",
                main: "devices ",
              },
              type: "devices",
            }}
            options={{
              next: { revalidate: "1y", tags: ["devices", cacheKey] },
            }}
          />
          <SSRFetcher
            Component={InsightsTable}
            path={`/analytics/devices?days=${searchParams?.["devices"] || 1}`}
            props={{
              headerLabels: {
                vistor: "vistors",
                main: "browsers",
              },
              type: "devices",
            }}
            options={{
              next: { revalidate: "1y", tags: ["devices", cacheKey] },
            }}
          />
          <SSRFetcher
            Component={InsightsTable}
            path={`/analytics/devices?days=${searchParams?.["devices"] || 1}`}
            props={{
              headerLabels: {
                vistor: "vistors",
                main: "operating systems",
              },
              type: "devices",
            }}
            options={{
              next: { revalidate: "1y", tags: ["devices", cacheKey] },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
