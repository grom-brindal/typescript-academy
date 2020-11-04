import Head from "next/head";
import styles from "../styles/Home.module.css";
import Markdown from "../components/mcq/markdown";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose">
      <div className={styles.container}>
        Completed Articles
        <ol>
          <Link href="/WhyTypeScript">
            <li>
              <a>Why use TypeScript</a>
            </li>
          </Link>
          <Link href="/JSTSbook/getting-started">
            <li>
              <a>Getting started</a>
            </li>
          </Link>
        </ol>
      </div>
    </div>
  );
}
