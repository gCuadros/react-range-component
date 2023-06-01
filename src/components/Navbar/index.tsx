import Link from "next/link";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["navbar-wrapper"]}>
        <Link href="/">Home</Link>
        <Link href="/exercise1">Exercise 1</Link>
        <Link href="/exercise2">Exercise 2</Link>
      </div>
    </div>
  );
};

export default Navbar;
