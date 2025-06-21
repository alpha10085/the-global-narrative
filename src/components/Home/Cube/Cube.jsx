import styles from "./Cube.module.css";
import Card from "./Card/Card";
import SectionTitle from "@/components/SectionTitle/SectionTitle";

const Cube = ({ data = {} }) => {
  const members = data?.members || [];

  return (
    <section className={styles.container}>
      <SectionTitle title={data?.title} className={styles.title} />
      <div className={`${styles.list} flex column `}>
        {members?.map((val) => (
          <Card key={val?._id} data={val} />
        ))}
      </div>
    </section>
  );
};

export default Cube;
