import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ margin: "1% 5%" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
