import Welcome from "@/_Dashboard/layouts/welcome/Welcome/Welcome";
import styles from "./page.module.css";
const Page = () => {
  return (
    <section className="  w-90 m-auto ">
      <div className="coverHeader" />
      <Welcome />
    </section>
  );
};

export default Page;
