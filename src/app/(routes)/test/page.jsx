import Threads from "@/components/Threads/Threads";

const Page = async (props) => {
  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
      }}
      className="flex-c "
    >
      <Threads color={"blue"} amplitude={2} />
    </section>
  );
};
export default Page;
