import Head from "next/head";
import styles from "../styles/Home.module.css";
import Markdown from "../components/mcq/markdown";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose">
      <div className={styles.container}>
        book
        <ol>
          <Link href="/book/getting-started">
            <li>
              <a>Get started with TypeScript Academy</a>
            </li>
          </Link>
        </ol>
        <ol>
          <Link href="/book/variables">
            <li>
              <a>Values and Variables</a>
            </li>
          </Link>
        </ol>
      </div>
      <div className={styles.container}>
        Articles
        <ol>
          <Link href="/WhyTypeScript">
            <li>
              <a>Why use TypeScript</a>
            </li>
          </Link>
        </ol>
      </div>
    </div>
  );
}
