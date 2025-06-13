import ChartBar from "@/_Dashboard/components/Analytics/Charts/ChartBar/ChartBar";
import ChartLine from "@/_Dashboard/components/Analytics/Charts/ChartLine/ChartLine";
import ChartPie from "@/_Dashboard/components/Analytics/Charts/ChartPie/ChartPie";
import InsightsTable from "@/_Dashboard/components/Analytics/Charts/InsightsTable/InsightsTable";
import SSRFetcher from "@/components/Shared/SSRFetcher/SSRFetcher";
import styles from "./page.module.css";
import DeviceChart from "@/_Dashboard/components/Analytics/Charts/DeviceChart/DeviceChart";

const page = async (props) => {
  const searchParams = await props.searchParams;
  return (
    <div className={styles.page}>
      <h1>Web Analytics</h1>
      <div className={styles.wrapper}>
        <div className={`${styles.charts} `}>
          <SSRFetcher
            Component={ChartLine}
            path={`/analytics/daily-traffic?days=${
              searchParams?.["dailyTraffic"] || 1
            }`}
            props={{ chartType: "dailyTraffic" }}
            options={{
              next: { revalidate: 60 * 60 * 24 * 7, tags: ["daily-traffic"] },
            }}
          />

          <SSRFetcher
            Component={DeviceChart}
            path={`/analytics/devices?days=${searchParams?.["dailyTraffic"] || 1}`}
            props={{ chartType: "devices" }}
            options={{
              next: { revalidate: 60 * 60 * 24 * 7, tags: ["devices"] },
            }}
          />
        </div>

        <SSRFetcher
          Component={InsightsTable}
          path={`/analytics/page-views?days=${
            searchParams?.["pageViews"] || 1
          }`}
          props={{ chartType: "pageViews" }}
          options={{
            next: { revalidate: 60 * 60 * 24 * 7, tags: ["page-views"] },
          }}
        />

        <div className=" flex al-i-c just-sb wrap">
          <SSRFetcher
            Component={ChartBar}
            path={`/analytics/country?days=${searchParams?.["country"] || 1}`}
            props={{ chartType: "country" }}
            options={{
              next: { revalidate: 60 * 60 * 24 * 7, tags: ["country"] },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
