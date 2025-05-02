import styles from "./styles.module.css";


const Page = async (props) => {
  const { slug = ""  } = await props.params;
  
    return (
     <section className={`${styles.container}`}>

     </section>
    );
  };
    
  export default Page;