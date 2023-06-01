import { useMemo } from "react";

import { useRangeValues } from "api/hooks/rangeValues/useRangeValues";
import Layout from "components/Layout";
import Range from "components/Range";

import styles from "./Exercise2.module.scss";

const Exercise2 = () => {
  const { data: rangeValues } = useRangeValues();
  const values = useMemo(() => (rangeValues ? rangeValues : []), [rangeValues]);

  return (
    <Layout>
      <h1 className={styles["title"]}>Fixed values range:</h1>
      <p className={styles["text"]}>
        Provide a localhost:8080/exercise2 route with the following:
      </p>
      <ul className={styles["text"]}>
        <li>
          The component CAN'T be a HTML5 input range. It has to be a custom one.
        </li>
        <li>
          Given a range of values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] the
          user will only be able to select those values in range
        </li>
        <li>
          For this type of range, currency values are not input changable. They
          have to be only a label
        </li>
        <li>The user can drag two bullets through the range line.</li>
        <li>Min value and max value can't be crossed in range</li>
      </ul>
      <Range values={values} />
    </Layout>
  );
};

export default Exercise2;
