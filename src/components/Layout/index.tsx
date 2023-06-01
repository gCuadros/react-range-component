import { ReactNode } from "react";

import Navbar from "components/Navbar";

import styles from "./Layout.module.scss";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className={styles["main-container"]}>{children}</div>
    </>
  );
};

export default Layout;
