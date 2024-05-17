import type { FC } from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Layout: FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;