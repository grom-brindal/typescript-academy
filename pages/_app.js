import "../styles/globals.css";
import "../styles/tailwind.css";
import Image from "next/image";


function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: "#1E1E1E" }}>
      <div className="prose prose-lg lg:max-w-4xl m-auto px-2">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
