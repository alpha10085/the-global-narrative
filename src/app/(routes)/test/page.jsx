import SsrWrapper from "@/components/Shared/SsrWrapper/SsrWrapper";
const Page = async (props) => {
  return (
    <section className={``}>
      <SSRFetcher
      //  Component={""} // main component (CSR)
      //  path="" // api route
      //  options={""} //  api options (SSR APi)
      //  Fallback={""} // loading fullback - skeletons or spinner
      //  data={""} // context data
      //  props={""} // custom props
      />
    </section>
  );
};
export default Page;
