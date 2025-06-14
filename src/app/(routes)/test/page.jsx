import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import StaticWaveLines from "@/components/StaticWaveLines/StaticWaveLines";
import styles from "./styles.module.css";
const Page = async (props) => {
  return (
    <section
      style={{
        height: "120vh",
        width: "100%",
        marginBottom: "-20vh",
      }}
      className={` flex  `}
    >
      <div className={styles.bg}>
        <AnimatedBackground speed={0.5} color={[0, 1, 1]} mouseReact={false} />
      </div>
    </section>
  );
};
export default Page;

{
  /* <StaticWaveLines
    amplitude={1.5}
    distance={0.2}
    color={"blue"}
    enableMouseInteraction={false}
  /> */
}
