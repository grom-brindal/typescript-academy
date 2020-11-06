import Head from "next/head";
import styles from "../styles/Home.module.css";
import Markdown from "../components/mcq/markdown";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        writing
        <ul>
          <li>
            book
            <ol>
              <Link href="/book/Getting-Started">
                <li>
                  <a>Get started with TypeScript Academy</a>
                </li>
              </Link>
              <Link href="/book/Variables">
                <li>
                  <a>Variables</a>
                </li>
              </Link>
            </ol>
          </li>
          <li>
            misc
            <ol>
              <Link href="/WhyTypeScript">
                <li>
                  <a>Why use TypeScript</a>
                </li>
              </Link>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
}
