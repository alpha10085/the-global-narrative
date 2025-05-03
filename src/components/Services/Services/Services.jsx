import Aos from "@/components/Shared/Animtions/Aos/Aos";
import styles from "./Services.module.css";

const logos = [
  "https://clay.earth//_next/static/media/address-book.5c516e47.png",
  "https://clay.earth//_next/static/media/affinity.749f685f.png",
  "https://clay.earth//_next/static/media/airtable.dee11e73.png",
  "https://clay.earth//_next/static/media/calendly.96f0a72c.png",
  "https://clay.earth//_next/static/media/carddav.6a80f165.png",
  "https://clay.earth//_next/static/media/contacts.10cd68d3.png",

  "https://clay.earth//_next/static/media/chatgpt.1ced0f5e.png",
  "https://clay.earth//_next/static/media/coda.a1854c0b.png",
  "https://clay.earth//_next/static/media/contacts.10cd68d3.png",
  "https://clay.earth//_next/static/media/contacts.10cd68d3.png",
  "https://clay.earth//_next/static/media/csv.023b0182.png",
  "https://clay.earth//_next/static/media/dropbox.d87cbea2.png",

  "https://clay.earth//_next/static/media/facebook.3c396545.png",
  "https://clay.earth//_next/static/media/gcal.3bfceabb.png",
  "https://clay.earth//_next/static/media/gmail.91410314.png",
  "https://clay.earth//_next/static/media/google-calendar.1160fd35.png",
  "https://clay.earth//_next/static/media/google.3763bf98.png",
  "https://clay.earth//_next/static/media/icloud.d2c8df93.png",

  "https://clay.earth//_next/static/media/imessage.6756e90e.png",
  "https://clay.earth//_next/static/media/instagram.a78c1026.png",
  "https://clay.earth//_next/static/media/make.4f24828d.png",
  "https://clay.earth//_next/static/media/messages.113b2b7c.png",
  "https://clay.earth//_next/static/media/salesforce.1678162b.png",
  "https://clay.earth//_next/static/media/microsoft.572afcff.png",

  "https://clay.earth//_next/static/media/monday.017a6507.png",
  "https://clay.earth//_next/static/media/notion.4563f46d.png",
  "https://clay.earth//_next/static/media/pipedream.3ce5b9b5.png",
  "https://clay.earth//_next/static/media/phone-calls.db4836c0.png",
  "https://clay.earth//_next/static/media/microsoft-outlook.ae781de9.png",

  "https://clay.earth//_next/static/media/chatgpt.1ced0f5e.png",
];

const Services = () => {
  const rows = 5;
  const columns = 6;

  const rowArray = Array.from({ length: rows }, (_, i) => i);

  const getRowClass = (index) => {
    switch (index) {
      case 0:
        return `${styles.logoRow} ${styles.fifthRow}`;
      case 1:
        return `${styles.logoRow} ${styles.fourthRow}`;
      case 2:
        return `${styles.logoRow} ${styles.thirdRow}`;
      case 3:
        return `${styles.logoRow} ${styles.secondRow}`;
      case 4:
        return styles.logoRow;
      default:
        return styles.logoRow;
    }
  };

  return (
    <div className={styles.container}>
      <div className=" mb-30  text-i-c">
        <h1 className=" mb-15">Our services</h1>
        <p className=" mb-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus earum
          molestias doloremque inventore enim odio dignissimos ullam vel
          quisquam modi.
        </p>
      </div>
      {rowArray.map((rowIndex) => {
        const start = rowIndex * columns;
        const end = start + columns;

        return (
          <div key={rowIndex} className={getRowClass(rowIndex)}>
            {logos?.slice(start, end).map((logo, i) => (
              <Aos
                className={styles.logoWrapper}
                activeClassName={styles.active}
                delay={i * 50}
                key={`${rowIndex}-${i}`}
              >
                <div>
                  <img src={logo} className={styles.logo} alt="logo" />
                  <div className={styles.shadow}></div>
                  {(rowIndex === 5 || rowIndex === 4 || rowIndex === 3) && (
                    <div className={styles.reflection}>
                      <img src={logo} alt="reflection" />
                    </div>
                  )}
                </div>
              </Aos>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Services;
