import Head from "next/head";
import styles from "../styles/Home.module.css";
import Editor from "../components/editor/Editor";



export default function Home() {
  return (
    <div className="prose">
      <Editor
        id="1"
        modelsInfo={[
          {
            filename: "exportedData.js",
            value:
              'const data = {\n  thing1: "a thing",\n  thing2: "another thing",\n  IMPORTANT_THING: "What you were looking for"\n}\n\nexport default data',
            language: "javascript",
          },
          {
            filename: "importData.js",
            value:
              'import data from "exportedData"\r\n\r\nconsole.log("You can run this file using the green play button")\r\nconsole.log("Or just press ctrl+enter")',
            language: "javascript",
          },
        ]}
      />
      <div className={styles.container}>Some day more things</div>;
    </div>
  );
}
