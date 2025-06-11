import StaticWaveLines from "@/components/StaticWaveLines/StaticWaveLines";

const Page = async (props) => {
  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
      className={`flex-c m-h-100`}
    >
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <StaticWaveLines
          amplitude={1.5}
          distance={0.2}
          color={"blue"}
          enableMouseInteraction={false}
        />
      </div>
    </section>
  );
};
export default Page;
