import styles from "./page.module.css";
import { getHomePage } from "./data.test";
import Hero from "@/Components/Home/Hero/Hero";
import Quote from "@/Components/Home/Quote/Quote";
import AboutUs from "@/Components/Home/AboutUs/AboutUs";
import News from "@/Components/Home/News/News";
import Testimonials from "@/Components/Home/Testimonials/Testimonials";
import GetInTouch from "@/Components/Home/GetInTouch/GetInTouch";
import Intro from "@/Components/Intro/Intro";
import WaveLines from "@/Components/Shared/WaveLines/WaveLines";
import StaticSection, {
  CSRSection,
} from "@/Components/Home/StaticSection/StaticSection";
import { ssrApi } from "@/utils/api";
import AnimatedBorderSection from "@/Components/Shared/AnimatedBorderSection/AnimatedBorderSection";
import FloatedSection from "@/Components/Shared/FloatedSection/FloatedSection";
import Img from "@/Components/Shared/img/Img";
import Link from "next/link";

const Home = async () => {
  const {
    heroSection = [],
    aboutUsSection = {},
    quoteSection = {},
    newsSection = {},
    testimonialSection = {},
    getInTouchSection = {},
  } = getHomePage();

  // return (
  //   <div
  //   style={{
  //     background:"black",
  //     minHeight:"100vh"
  //   }}
  //   className={styles.textpage}>

  //     <Img
  //       disableSkeleton
  //       className={styles.bgPoster}
  //       url="/dashboard/logo-dark.png"
  //     />
  //   </div>
  // )
  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
      }}
      className={styles.textpage}
    >
      {/*       
      <Img
        disableSkeleton
        className={styles.bgPoster}
        url="/dashboard/logo-dark.png"
      /> */}
      <Link href={"/news"}>
        <h1>test scrolling</h1>
      </Link>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum
        quidem quasi aperiam reiciendis, adipisci earum magni dolor nemo,
        tempore necessitatibus sapiente voluptates nobis ea delectus laboriosam
        optio autem voluptatem esse velit itaque libero! Itaque sapiente nam
        consectetur laudantium sit nemo voluptatibus dicta quidem laboriosam rem
        commodi maiores eum ea, aperiam officia corporis saepe tenetur nulla
        repellendus, eaque officiis? Similique sapiente expedita at blanditiis
        voluptate quod adipisci. Mollitia asperiores nesciunt officiis officia
        repudiandae consequuntur labore animi magnam, id reprehenderit aperiam
        atque ipsam cumque maxime reiciendis nostrum quia, provident
        perspiciatis. Sunt ullam nemo incidunt expedita! Officia blanditiis quam
        laudantium laborum maxime odit dignissimos possimus id inventore labore
        dolores, hic, optio molestias! Nostrum aliquam rem, nisi, sunt,
        dignissimos labore natus voluptatem adipisci ea blanditiis ad aliquid
        recusandae quibusdam molestiae. Culpa doloremque voluptatem corrupti
        voluptates nobis quidem in nam. Accusamus quia nihil dolorem
        necessitatibus perferendis harum dicta fuga vel nisi. Placeat
        repellendus dolores, rem quos animi assumenda adipisci totam architecto
        impedit illum exercitationem laudantium, voluptas ipsam perferendis
        itaque soluta, tenetur optio quam qui! Repudiandae nulla tenetur aperiam
        possimus quaerat, ex itaque, pariatur nobis eaque temporibus aut nihil
        sed? Perferendis iusto dolor repudiandae dolorem similique ducimus ab!
        Laudantium laboriosam iure voluptate necessitatibus ad dolor a ab ipsam
        vel unde consequatur repellendus magni ducimus sit harum, eveniet
        dolorem? Minus quas, suscipit dolorem odit possimus vitae tempore alias
        unde dignissimos magni recusandae culpa sapiente, deleniti, perspiciatis
        iste sint hic similique adipisci assumenda consectetur laudantium
        mollitia optio. Quibusdam quisquam cumque dolores dolorum itaque eaque
        tenetur provident. Alias, qui nesciunt magnam eveniet, officiis sequi
        nulla reiciendis nostrum perspiciatis, pariatur illum distinctio a
        mollitia minus sit! Exercitationem, harum debitis. Eos, ullam
        laboriosam. Cupiditate fugit amet non dolorum, saepe similique sequi
        possimus dolore nesciunt ea et quaerat ducimus quae, aliquam laboriosam
        dolores itaque beatae, voluptatem quos? Aspernatur ad ipsa sit porro et,
        exercitationem magnam alias nesciunt architecto dolorem quos, illum
        distinctio dicta temporibus iusto hic tempore quidem laudantium
        similique mollitia minima odio enim iste! Fugiat molestiae nesciunt
        aperiam, laudantium eaque consequatur, nam rem distinctio harum
        asperiores obcaecati dolorem accusantium, repellendus veniam iste. Atque
        mollitia unde a, vero ipsam ducimus, eius praesentium asperiores rerum
        incidunt natus. Aliquam iure expedita laboriosam, maxime ullam itaque
        esse enim quasi labore. Obcaecati beatae saepe autem quod necessitatibus
        modi magni in tempore natus maxime aliquam magnam aut, numquam
        voluptatum sed hic voluptate cum impedit est sequi. In perspiciatis
        deserunt quis fugiat, explicabo nemo est vitae ea omnis eos, cum porro.
        Blanditiis similique cum laboriosam, vero molestias esse libero, sint
        consectetur incidunt inventore voluptates? Distinctio minus facilis
        aliquam. Veniam quod dolor ab, doloremque velit est consequuntur et
        doloribus nam. Tenetur quo reiciendis doloribus, esse fuga libero saepe
        magnam, itaque odit porro eaque voluptatem nisi dicta, et consequuntur?
        Vero fugit accusantium eius, corporis atque dignissimos. Iste veritatis
        tempora blanditiis aliquid hic quam officia beatae ipsa praesentium
        labore esse dolore, officiis cum enim distinctio velit libero rem!
        Repudiandae, aliquam voluptas? Cum sequi facilis, libero eligendi
        molestiae aspernatur, ullam nobis nulla aliquid accusamus illum
        architecto vel, delectus est at iusto. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Vel dolorum quidem quasi aperiam
        reiciendis, adipisci earum magni dolor nemo, tempore necessitatibus
        sapiente voluptates nobis ea delectus laboriosam optio autem voluptatem
        esse velit itaque libero! Itaque sapiente nam consectetur laudantium sit
        nemo voluptatibus dicta quidem laboriosam rem commodi maiores eum ea,
        aperiam officia corporis saepe tenetur nulla repellendus, eaque
        officiis? Similique sapiente expedita at blanditiis voluptate quod
        adipisci. Mollitia asperiores nesciunt officiis officia repudiandae
        consequuntur labore animi magnam, id reprehenderit aperiam atque ipsam
        cumque maxime reiciendis nostrum quia, provident perspiciatis. Sunt
        ullam nemo incidunt expedita! Officia blanditiis quam laudantium laborum
        maxime odit dignissimos possimus id inventore labore dolores, hic, optio
        molestias! Nostrum aliquam rem, nisi, sunt, dignissimos labore natus
        voluptatem adipisci ea blanditiis ad aliquid recusandae quibusdam
        molestiae. Culpa doloremque voluptatem corrupti voluptates nobis quidem
        in nam. Accusamus quia nihil dolorem necessitatibus perferendis harum
        dicta fuga vel nisi. Placeat repellendus dolores, rem quos animi
        assumenda adipisci totam architecto impedit illum exercitationem
        laudantium, voluptas ipsam perferendis itaque soluta, tenetur optio quam
        qui! Repudiandae nulla tenetur aperiam possimus quaerat, ex itaque,
        pariatur nobis eaque temporibus aut nihil sed? Perferendis iusto dolor
        repudiandae dolorem similique ducimus ab! Laudantium laboriosam iure
        voluptate necessitatibus ad dolor a ab ipsam vel unde consequatur
        repellendus magni ducimus sit harum, eveniet dolorem? Minus quas,
        suscipit dolorem odit possimus vitae tempore alias unde dignissimos
        magni recusandae culpa sapiente, deleniti, perspiciatis iste sint hic
        similique adipisci assumenda consectetur laudantium mollitia optio.
        Quibusdam quisquam cumque dolores dolorum itaque eaque tenetur
        provident. Alias, qui nesciunt magnam eveniet, officiis sequi nulla
        reiciendis nostrum perspiciatis, pariatur illum distinctio a mollitia
        minus sit! Exercitationem, harum debitis. Eos, ullam laboriosam.
        Cupiditate fugit amet non dolorum, saepe similique sequi possimus dolore
        nesciunt ea et quaerat ducimus quae, aliquam laboriosam dolores itaque
        beatae, voluptatem quos? Aspernatur ad ipsa sit porro et, exercitationem
        magnam alias nesciunt architecto dolorem quos, illum distinctio dicta
        temporibus iusto hic tempore quidem laudantium similique mollitia minima
        odio enim iste! Fugiat molestiae nesciunt aperiam, laudantium eaque
        consequatur, nam rem distinctio harum asperiores obcaecati dolorem
        accusantium, repellendus veniam iste. Atque mollitia unde a, vero ipsam
        ducimus, eius praesentium asperiores rerum incidunt natus. Aliquam iure
        expedita laboriosam, maxime ullam itaque esse enim quasi labore.
        Obcaecati beatae saepe autem quod necessitatibus modi magni in tempore
        natus maxime aliquam magnam aut, numquam voluptatum sed hic voluptate
        cum impedit est sequi. In perspiciatis deserunt quis fugiat, explicabo
        nemo est vitae ea omnis eos, cum porro. Blanditiis similique cum
        laboriosam, vero molestias esse libero, sint consectetur incidunt
        inventore voluptates? Distinctio minus facilis aliquam. Veniam quod
        dolor ab, doloremque velit est consequuntur et doloribus nam. Tenetur
        quo reiciendis doloribus, esse fuga libero saepe magnam, itaque odit
        porro eaque voluptatem nisi dicta, et consequuntur? Vero fugit
        accusantium eius, corporis atque dignissimos. Iste veritatis tempora
        blanditiis aliquid hic quam officia beatae ipsa praesentium labore esse
        dolore, officiis cum enim distinctio velit libero rem! Repudiandae,
        aliquam voluptas? Cum sequi facilis, libero eligendi molestiae
        aspernatur, ullam nobis nulla aliquid accusamus illum architecto vel,
        delectus est at iusto. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Vel dolorum quidem quasi aperiam reiciendis, adipisci
        earum magni dolor nemo, tempore necessitatibus sapiente voluptates nobis
        ea delectus laboriosam optio autem voluptatem esse velit itaque libero!
        Itaque sapiente nam consectetur laudantium sit nemo voluptatibus dicta
        quidem laboriosam rem commodi maiores eum ea, aperiam officia corporis
        saepe tenetur nulla repellendus, eaque officiis? Similique sapiente
        expedita at blanditiis voluptate quod adipisci. Mollitia asperiores
        nesciunt officiis officia repudiandae consequuntur labore animi magnam,
        id reprehenderit aperiam atque ipsam cumque maxime reiciendis nostrum
        quia, provident perspiciatis. Sunt ullam nemo incidunt expedita! Officia
        blanditiis quam laudantium laborum maxime odit dignissimos possimus id
        inventore labore dolores, hic, optio molestias! Nostrum aliquam rem,
        nisi, sunt, dignissimos labore natus voluptatem adipisci ea blanditiis
        ad aliquid recusandae quibusdam molestiae. Culpa doloremque voluptatem
        corrupti voluptates nobis quidem in nam. Accusamus quia nihil dolorem
        necessitatibus perferendis harum dicta fuga vel nisi. Placeat
        repellendus dolores, rem quos animi assumenda adipisci totam architecto
        impedit illum exercitationem laudantium, voluptas ipsam perferendis
        itaque soluta, tenetur optio quam qui! Repudiandae nulla tenetur aperiam
        possimus quaerat, ex itaque, pariatur nobis eaque temporibus aut nihil
        sed? Perferendis iusto dolor repudiandae dolorem similique ducimus ab!
        Laudantium laboriosam iure voluptate necessitatibus ad dolor a ab ipsam
        vel unde consequatur repellendus magni ducimus sit harum, eveniet
        dolorem? Minus quas, suscipit dolorem odit possimus vitae tempore alias
        unde dignissimos magni recusandae culpa sapiente, deleniti, perspiciatis
        iste sint hic similique adipisci assumenda consectetur laudantium
        mollitia optio. Quibusdam quisquam cumque dolores dolorum itaque eaque
        tenetur provident. Alias, qui nesciunt magnam eveniet, officiis sequi
        nulla reiciendis nostrum perspiciatis, pariatur illum distinctio a
        mollitia minus sit! Exercitationem, harum debitis. Eos, ullam
        laboriosam. Cupiditate fugit amet non dolorum, saepe similique sequi
        possimus dolore nesciunt ea et quaerat ducimus quae, aliquam laboriosam
        dolores itaque beatae, voluptatem quos? Aspernatur ad ipsa sit porro et,
        exercitationem magnam alias nesciunt architecto dolorem quos, illum
        distinctio dicta temporibus iusto hic tempore quidem laudantium
        similique mollitia minima odio enim iste! Fugiat molestiae nesciunt
        aperiam, laudantium eaque consequatur, nam rem distinctio harum
        asperiores obcaecati dolorem accusantium, repellendus veniam iste. Atque
        mollitia unde a, vero ipsam ducimus, eius praesentium asperiores rerum
        incidunt natus. Aliquam iure expedita laboriosam, maxime ullam itaque
        esse enim quasi labore. Obcaecati beatae saepe autem quod necessitatibus
        modi magni in tempore natus maxime aliquam magnam aut, numquam
        voluptatum sed hic voluptate cum impedit est sequi. In perspiciatis
        deserunt quis fugiat, explicabo nemo est vitae ea omnis eos, cum porro.
        Blanditiis similique cum laboriosam, vero molestias esse libero, sint
        consectetur incidunt inventore voluptates? Distinctio minus facilis
        aliquam. Veniam quod dolor ab, doloremque velit est consequuntur et
        doloribus nam. Tenetur quo reiciendis doloribus, esse fuga libero saepe
        magnam, itaque odit porro eaque voluptatem nisi dicta, et consequuntur?
        Vero fugit accusantium eius, corporis atque dignissimos. Iste veritatis
        tempora blanditiis aliquid hic quam officia beatae ipsa praesentium
        labore esse dolore, officiis cum enim distinctio velit libero rem!
        Repudiandae, aliquam voluptas? Cum sequi facilis, libero eligendi
        molestiae aspernatur, ullam nobis nulla aliquid accusamus illum
        architecto vel, delectus est at iusto. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Vel dolorum quidem quasi aperiam
        reiciendis, adipisci earum magni dolor nemo, tempore necessitatibus
        sapiente voluptates nobis ea delectus laboriosam optio autem voluptatem
        esse velit itaque libero! Itaque sapiente nam consectetur laudantium sit
        nemo voluptatibus dicta quidem laboriosam rem commodi maiores eum ea,
        aperiam officia corporis saepe tenetur nulla repellendus, eaque
        officiis? Similique sapiente expedita at blanditiis voluptate quod
        adipisci. Mollitia asperiores nesciunt officiis officia repudiandae
        consequuntur labore animi magnam, id reprehenderit aperiam atque ipsam
        cumque maxime reiciendis nostrum quia, provident perspiciatis. Sunt
        ullam nemo incidunt expedita! Officia blanditiis quam laudantium laborum
        maxime odit dignissimos possimus id inventore labore dolores, hic, optio
        molestias! Nostrum aliquam rem, nisi, sunt, dignissimos labore natus
        voluptatem adipisci ea blanditiis ad aliquid recusandae quibusdam
        molestiae. Culpa doloremque voluptatem corrupti voluptates nobis quidem
        in nam. Accusamus quia nihil dolorem necessitatibus perferendis harum
        dicta fuga vel nisi. Placeat repellendus dolores, rem quos animi
        assumenda adipisci totam architecto impedit illum exercitationem
        laudantium, voluptas ipsam perferendis itaque soluta, tenetur optio quam
        qui! Repudiandae nulla tenetur aperiam possimus quaerat, ex itaque,
        pariatur nobis eaque temporibus aut nihil sed? Perferendis iusto dolor
        repudiandae dolorem similique ducimus ab! Laudantium laboriosam iure
        voluptate necessitatibus ad dolor a ab ipsam vel unde consequatur
        repellendus magni ducimus sit harum, eveniet dolorem? Minus quas,
        suscipit dolorem odit possimus vitae tempore alias unde dignissimos
        magni recusandae culpa sapiente, deleniti, perspiciatis iste sint hic
        similique adipisci assumenda consectetur laudantium mollitia optio.
        Quibusdam quisquam cumque dolores dolorum itaque eaque tenetur
        provident. Alias, qui nesciunt magnam eveniet, officiis sequi nulla
        reiciendis nostrum perspiciatis, pariatur illum distinctio a mollitia
        minus sit! Exercitationem, harum debitis. Eos, ullam laboriosam.
        Cupiditate fugit amet non dolorum, saepe similique sequi possimus dolore
        nesciunt ea et quaerat ducimus quae, aliquam laboriosam dolores itaque
        beatae, voluptatem quos? Aspernatur ad ipsa sit porro et, exercitationem
        magnam alias nesciunt architecto dolorem quos, illum distinctio dicta
        temporibus iusto hic tempore quidem laudantium similique mollitia minima
        odio enim iste! Fugiat molestiae nesciunt aperiam, laudantium eaque
        consequatur, nam rem distinctio harum asperiores obcaecati dolorem
        accusantium, repellendus veniam iste. Atque mollitia unde a, vero ipsam
        ducimus, eius praesentium asperiores rerum incidunt natus. Aliquam iure
        expedita laboriosam, maxime ullam itaque esse enim quasi labore.
        Obcaecati beatae saepe autem quod necessitatibus modi magni in tempore
        natus maxime aliquam magnam aut, numquam voluptatum sed hic voluptate
        cum impedit est sequi. In perspiciatis deserunt quis fugiat, explicabo
        nemo est vitae ea omnis eos, cum porro. Blanditiis similique cum
        laboriosam, vero molestias esse libero, sint consectetur incidunt
        inventore voluptates? Distinctio minus facilis aliquam. Veniam quod
        dolor ab, doloremque velit est consequuntur et doloribus nam. Tenetur
        quo reiciendis doloribus, esse fuga libero saepe magnam, itaque odit
        porro eaque voluptatem nisi dicta, et consequuntur? Vero fugit
        accusantium eius, corporis atque dignissimos. Iste veritatis tempora
        blanditiis aliquid hic quam officia beatae ipsa praesentium labore esse
        dolore, officiis cum enim distinctio velit libero rem! Repudiandae,
        aliquam voluptas? Cum sequi facilis, libero eligendi molestiae
        aspernatur, ullam nobis nulla aliquid accusamus illum architecto vel,
        delectus est at iusto. Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Vel dolorum quidem quasi aperiam reiciendis, adipisci
        earum magni dolor nemo, tempore necessitatibus sapiente voluptates nobis
        ea delectus laboriosam optio autem voluptatem esse velit itaque libero!
        Itaque sapiente nam consectetur laudantium sit nemo voluptatibus dicta
        quidem laboriosam rem commodi maiores eum ea, aperiam officia corporis
        saepe tenetur nulla repellendus, eaque officiis? Similique sapiente
        expedita at blanditiis voluptate quod adipisci. Mollitia asperiores
        nesciunt officiis officia repudiandae consequuntur labore animi magnam,
        id reprehenderit aperiam atque ipsam cumque maxime reiciendis nostrum
        quia, provident perspiciatis. Sunt ullam nemo incidunt expedita! Officia
        blanditiis quam laudantium laborum maxime odit dignissimos possimus id
        inventore labore dolores, hic, optio molestias! Nostrum aliquam rem,
        nisi, sunt, dignissimos labore natus voluptatem adipisci ea blanditiis
        ad aliquid recusandae quibusdam molestiae. Culpa doloremque voluptatem
        corrupti voluptates nobis quidem in nam. Accusamus quia nihil dolorem
        necessitatibus perferendis harum dicta fuga vel nisi. Placeat
        repellendus dolores, rem quos animi assumenda adipisci totam architecto
        impedit illum exercitationem laudantium, voluptas ipsam perferendis
        itaque soluta, tenetur optio quam qui! Repudiandae nulla tenetur aperiam
        possimus quaerat, ex itaque, pariatur nobis eaque temporibus aut nihil
        sed? Perferendis iusto dolor repudiandae dolorem similique ducimus ab!
        Laudantium laboriosam iure voluptate necessitatibus ad dolor a ab ipsam
        vel unde consequatur repellendus magni ducimus sit harum, eveniet
        dolorem? Minus quas, suscipit dolorem odit possimus vitae tempore alias
        unde dignissimos magni recusandae culpa sapiente, deleniti, perspiciatis
        iste sint hic similique adipisci assumenda consectetur laudantium
        mollitia optio. Quibusdam quisquam cumque dolores dolorum itaque eaque
        tenetur provident. Alias, qui nesciunt magnam eveniet, officiis sequi
        nulla reiciendis nostrum perspiciatis, pariatur illum distinctio a
        mollitia minus sit! Exercitationem, harum debitis. Eos, ullam
        laboriosam. Cupiditate fugit amet non dolorum, saepe similique sequi
        possimus dolore nesciunt ea et quaerat ducimus quae, aliquam laboriosam
        dolores itaque beatae, voluptatem quos? Aspernatur ad ipsa sit porro et,
        exercitationem magnam alias nesciunt architecto dolorem quos, illum
        distinctio dicta temporibus iusto hic tempore quidem laudantium
        similique mollitia minima odio enim iste! Fugiat molestiae nesciunt
        aperiam, laudantium eaque consequatur, nam rem distinctio harum
        asperiores obcaecati dolorem accusantium, repellendus veniam iste. Atque
        mollitia unde a, vero ipsam ducimus, eius praesentium asperiores rerum
        incidunt natus. Aliquam iure expedita laboriosam, maxime ullam itaque
        esse enim quasi labore. Obcaecati beatae saepe autem quod necessitatibus
        modi magni in tempore natus maxime aliquam magnam aut, numquam
        voluptatum sed hic voluptate cum impedit est sequi. In perspiciatis
        deserunt quis fugiat, explicabo nemo est vitae ea omnis eos, cum porro.
        Blanditiis similique cum laboriosam, vero molestias esse libero, sint
        consectetur incidunt inventore voluptates? Distinctio minus facilis
        aliquam. Veniam quod dolor ab, doloremque velit est consequuntur et
        doloribus nam. Tenetur quo reiciendis doloribus, esse fuga libero saepe
        magnam, itaque odit porro eaque voluptatem nisi dicta, et consequuntur?
        Vero fugit accusantium eius, corporis atque dignissimos. Iste veritatis
        tempora blanditiis aliquid hic quam officia beatae ipsa praesentium
        labore esse dolore, officiis cum enim distinctio velit libero rem!
        Repudiandae, aliquam voluptas? Cum sequi facilis, libero eligendi
        molestiae aspernatur, ullam nobis nulla aliquid accusamus illum
        architecto vel, delectus est at iusto.
      </p>
    </div>
  );
  return (
    <section className={styles.layout}>
      {/* <Intro />
      <Hero  data={heroSection} />
      <CSRSection>
        <AboutUs data={aboutUsSection} />
        <WaveLines />
        <FloatedSection>
        <Quote data={quoteSection} />
        <WaveLines />
        </FloatedSection>
        <div className={styles.spaceSection}></div>
          <div className={styles.childTwo}>
            <AnimatedBorderSection>
              <StaticSection mode="down" >
              <News data={newsSection} />
              <WaveLines colors={["#8927f2a8", "#00eaff", "#ff00d4"]} />
              <Testimonials data={testimonialSection} />
              </StaticSection>
            </AnimatedBorderSection>
          </div>
      </CSRSection>
      <GetInTouch data={getInTouchSection} /> */}
    </section>
  );
};

export default Home;
