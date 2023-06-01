import Link from "next/link";
import { useMemo } from "react";

import { useMinMaxRange } from "api/hooks/minMaxRange/useMinMaxRange";
import Layout from "components/Layout";

import styles from "./Home.module.scss";

const Home = () => {
  const { data: minMaxRange } = useMinMaxRange();
  const values = useMemo(
    () => (minMaxRange ? Object.values(minMaxRange) : []),
    [minMaxRange]
  );

  return (
    <Layout>
      <h1 className={styles["title"]}>Exercise:</h1>
      <p className={styles["text"]}>
        You have to create the following component: {`<Range />`}
        You have to use React to create the solution. You do NOT have to use any
        CLI to create structure and architecture of your application. This
        component has two use modes:
      </p>
      <ul className={styles["text"]}>
        <li>Normal range from min to max number</li>
        <li>Fixed number of options range</li>
      </ul>
      <div className={styles["link-wrapper"]}>
        <Link href="/exercise1">Go to Exercise 1</Link>
        <Link href="/exercise2">Go to Exercise 2</Link>
      </div>
    </Layout>
  );
};

export default Home;
