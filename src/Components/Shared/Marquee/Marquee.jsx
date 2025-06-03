import styles from "./Marquee.module.css";
const genarteItems = (allItems = []) => {
  const topItems = allItems?.slice(0, 10);
  const bottomItems = allItems?.slice(10, 20);
  return { topItems, bottomItems };
};
const renderItems = (Compoanent, items) => {
  return items.map((val, index) => (
    <Compoanent data={val} key={`${val?._id}-${index}`} />
  ));
};
const Marquee = ({
  duration = 1,
  Compoanent = () => {},
  data = [],
  single = true,
  slideClassName = "",
}) => {
  // Calculate how many logos are needed to make the total at least 16
  const items = Array.isArray(data) ? data : [];
  const requiredItems = 20;
  const ItemsCount = items?.length;
  let allItems = [...items];

  // Repeat Items only if data has content, to avoid infinite loop
  if (ItemsCount > 0) {
    while (allItems?.length < requiredItems) {
      allItems?.push(...items);
    }
  } else {
    return;
  }

  const { topItems, bottomItems } = genarteItems(allItems);
  const renderItemsTop = renderItems(Compoanent, topItems);
  const renderItemsBottom = renderItems(Compoanent, bottomItems);
  const animationDuration = `${duration * 100}s`;
  return (
    <div dir="ltr" className={`flex column ${styles.section}`}>
      <div className={`${styles.Items} flex`}>
        <div
          style={{
            animationDuration,
          }}
          className={`${styles.itemsSlide} flex ${slideClassName}`}
        >
          {renderItemsTop}
        </div>
        <div
          style={{
            animationDuration,
          }}
          className={`${styles.itemsSlide} flex ${slideClassName}`}
        >
          {renderItemsTop}
        </div>
      </div>
      {!single && (
        <div className={`${styles.Items} flex gap20`}>
          <div
            style={{
              animationDuration: `${duration * 120}s`,
            }}
            className={`${styles.itemsSlide2}  flex ${slideClassName}`}
          >
            {renderItemsBottom}
          </div>
          <div
            style={{
              animationDuration: `${duration * 120}s`,
            }}
            className={`${styles.itemsSlide2} flex ${slideClassName}`}
          >
            {renderItemsBottom}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marquee;
