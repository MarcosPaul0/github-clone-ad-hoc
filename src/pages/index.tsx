import Head from "next/head";
import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Header } from "../components/Header";
import { RepositoryList } from "../components/RepositoryList";
import { Sidebar } from "../components/Sidebar";

import styles from "../styles/app.module.css";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<"table" | "dashboard">("table");

  function handleSelect(option: "table" | "dashboard") {
    setSelected(option);
  }

  function handleToggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Head>
        <title>Github Clone | Ad Hoc</title>
      </Head>

      <div className={styles.container}>
        <Header
          handleToggleSidebar={handleToggleSidebar}
          handleSelect={handleSelect}
          selected={selected}
        />
        <main
          className={`bg-gray-800 text-gray-50 flex w-full relative ${styles.content}`}
        >
          <Sidebar isOpen={isOpen} />

          {selected === "table" ? <RepositoryList /> : <Dashboard />}
        </main>
      </div>
    </>
  );
}
