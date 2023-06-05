import { useMinMaxRange } from "api/hooks/minMaxRange/useMinMaxRange";
import Layout from "components/Layout";
import Range from "components/Range";

import styles from "./Exercise1.module.scss";

const Exercise1 = () => {
  const { data: minMaxRange, isLoading } = useMinMaxRange();
  const values = minMaxRange ? Object.values(minMaxRange) : [];

  return (
    <Layout>
      <h1 className={styles["title"]}>Normal Range:</h1>
      <p className={styles["text"]}>
        Provide a localhost:8080/exercise1 route with the following:
      </p>
      <ul className={styles["text"]}>
        <li>
          The component CAN`T be a HTML5 input range. It has to be a custom one.
        </li>
        <li>The user can drag two bullets through the range line.</li>
        <li>
          The user can click on both currency number label values (min or max)
          and set a new value.
        </li>
        <li>
          The value will never be less than min or greater than max input
          values.
        </li>
        <li>
          When some bullet is on hover, this bullet has to be bigger and change
          cursor`s type into draggable.
        </li>
        <li>Dragging a bullet turns cursor to dragging</li>
        <li>Min value and max value can`t be crossed in range</li>
      </ul>
      <Range allowedValues={values} isLoading={isLoading} />
    </Layout>
  );
};

export default Exercise1;
